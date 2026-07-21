param(
  [Parameter(Mandatory = $true)]
  [string]$Expression,
  [string]$ScreenshotPath
)

$targets = Invoke-RestMethod "http://127.0.0.1:9333/json/list"
$target = $targets |
  Where-Object { $_.type -eq "page" -and $_.url -like "*127.0.0.1:5193*" } |
  Select-Object -First 1

if (-not $target) {
  throw "The Issue 110 Chrome target is not available."
}

$socket = [System.Net.WebSockets.ClientWebSocket]::new()
$null = $socket.ConnectAsync([Uri]($target.webSocketDebuggerUrl), [Threading.CancellationToken]::None).GetAwaiter().GetResult()
$nextId = 1

function Invoke-Cdp {
  param(
    [Parameter(Mandatory = $true)]
    [string]$Method,
    [hashtable]$Params = @{}
  )

  $id = $script:nextId
  $script:nextId += 1
  $request = @{ id = $id; method = $Method; params = $Params } | ConvertTo-Json -Depth 20 -Compress
  $bytes = [Text.Encoding]::UTF8.GetBytes($request)
  $null = $socket.SendAsync(
    [ArraySegment[byte]]::new($bytes),
    [System.Net.WebSockets.WebSocketMessageType]::Text,
    $true,
    [Threading.CancellationToken]::None
  ).GetAwaiter().GetResult()

  do {
    $stream = [IO.MemoryStream]::new()
    do {
      $buffer = [byte[]]::new(65536)
      $result = $socket.ReceiveAsync(
        [ArraySegment[byte]]::new($buffer),
        [Threading.CancellationToken]::None
      ).GetAwaiter().GetResult()
      $stream.Write($buffer, 0, $result.Count)
    } until ($result.EndOfMessage)

    $message = [Text.Encoding]::UTF8.GetString($stream.ToArray()) | ConvertFrom-Json -Depth 50
  } until ($message.id -eq $id)

  if ($message.error) {
    throw ($message.error | ConvertTo-Json -Depth 10)
  }

  return $message.result
}

try {
  $evaluation = Invoke-Cdp -Method "Runtime.evaluate" -Params @{
    expression = $Expression
    awaitPromise = $true
    returnByValue = $true
  }

  if ($evaluation.exceptionDetails) {
    throw ($evaluation.exceptionDetails | ConvertTo-Json -Depth 20)
  }

  if ($ScreenshotPath) {
    $capture = Invoke-Cdp -Method "Page.captureScreenshot" -Params @{
      format = "png"
      captureBeyondViewport = $false
      fromSurface = $true
    }
    [IO.File]::WriteAllBytes($ScreenshotPath, [Convert]::FromBase64String($capture.data))
  }

  $evaluation.result.value | ConvertTo-Json -Depth 20
}
finally {
  if ($socket.State -eq [System.Net.WebSockets.WebSocketState]::Open) {
    $null = $socket.CloseAsync(
      [System.Net.WebSockets.WebSocketCloseStatus]::NormalClosure,
      "complete",
      [Threading.CancellationToken]::None
    ).GetAwaiter().GetResult()
  }
  $socket.Dispose()
}
