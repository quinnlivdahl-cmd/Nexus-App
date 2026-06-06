export default function ServerRoom({ width = 900, height = 600 }: { width?: number; height?: number }) {
  return (
    <svg width={width} height={height} viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="sr-glow"><feGaussianBlur stdDeviation="3" result="b"/><feComposite in="SourceGraphic" in2="b" operator="over"/></filter>
        <linearGradient id="sr-rack" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0d1420" />
          <stop offset="50%" stopColor="#131c2a" />
          <stop offset="100%" stopColor="#0d1420" />
        </linearGradient>
      </defs>
      <rect width={width} height={height} fill="#080c14" />

      {/* Ceiling cable runs */}
      <rect x={0} y={0} width={width} height={height*0.08} fill="#0d1420" />
      {[0.15, 0.3, 0.45, 0.6, 0.75].map((t, i) => (
        <line key={i} x1={t*width} y1={0} x2={t*width} y2={height*0.08} stroke="#131c2a" strokeWidth={i%2===0?6:3} />
      ))}
      {/* Cold air vent strips */}
      {[0.1, 0.35, 0.6, 0.85].map((t, i) => (
        <rect key={i} x={t*width} y={height*0.06} width={width*0.12} height={height*0.025} rx="2" fill="#0a1018" stroke="#131c2a" strokeWidth="1" />
      ))}

      {/* Floor raised grating */}
      <rect x={0} y={height*0.85} width={width} height={height*0.15} fill="#0d1420" />
      {[...Array(18)].map((_, i) => (
        <line key={i} x1={i*width/17} y1={height*0.85} x2={i*width/17} y2={height} stroke="#131c2a" strokeWidth="1" />
      ))}
      {[0.88, 0.93].map((t, i) => (
        <line key={i} x1={0} y1={t*height} x2={width} y2={t*height} stroke="#131c2a" strokeWidth="1" />
      ))}

      {/* Server rack columns */}
      {[0.04, 0.22, 0.4, 0.58, 0.76].map((cx, ci) => (
        <g key={ci}>
          <rect x={cx*width} y={height*0.08} width={width*0.14} height={height*0.77} fill="url(#sr-rack)" stroke="#1a2535" strokeWidth="2" />
          {/* Server units in rack */}
          {[...Array(8)].map((_, ri) => (
            <g key={ri}>
              <rect x={cx*width+4} y={height*0.1+ri*height*0.088} width={width*0.13} height={height*0.075}
                fill="#0a1018" stroke="#131c2a" strokeWidth="1" rx="1" />
              {/* Drive activity lights */}
              {[0, 1, 2, 3].map((li) => (
                <circle key={li}
                  cx={cx*width + width*0.02 + li*width*0.025}
                  cy={height*0.1+ri*height*0.088+height*0.035}
                  r={2}
                  fill={ri*4+li === 15 ? '#ff4444' : ri*4+li === 6 ? '#E87722' : '#00b4aa'}
                  opacity={Math.random()>0.4?0.9:0.2}
                  filter={ri*4+li === 6 ? "url(#sr-glow)" : undefined}
                />
              ))}
              {/* Unit label bar */}
              <rect x={cx*width+4} y={height*0.1+ri*height*0.088} width={width*0.13} height={height*0.012} fill="#0d1420" />
            </g>
          ))}
        </g>
      ))}

      {/* Walkway between racks */}
      {[0.18, 0.36, 0.54, 0.72].map((t, i) => (
        <rect key={i} x={t*width} y={height*0.08} width={width*0.04} height={height*0.77} fill="#080c14" />
      ))}

      {/* Overhead status display */}
      <rect x={width*0.35} y={height*0.08} width={width*0.3} height={height*0.12} fill="#0a0f1a" stroke="#00b4aa" strokeWidth="1" strokeOpacity="0.4" />
      <text x={width*0.365} y={height*0.13} fill="#00b4aa" fontSize="8" fontFamily="monospace" opacity="0.8">LATTICE NODE :: CACHE-E43</text>
      <text x={width*0.365} y={height*0.155} fill="#E87722" fontSize="8" fontFamily="monospace" opacity="0.7">UPTIME: 4721d  TEMP: 18°C</text>
      <text x={width*0.365} y={height*0.18} fill="#ff4444" fontSize="7" fontFamily="monospace" opacity="0.6">ALERT: UNAUTHORIZED ACCESS ATTEMPT</text>

      {/* Teal ambient glow from racks */}
      <radialGradient id="sr-amb" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#00b4aa" stopOpacity="0.03" />
        <stop offset="100%" stopColor="#080c14" stopOpacity="0" />
      </radialGradient>
      <rect x={0} y={0} width={width} height={height} fill="url(#sr-amb)" />

      {/* Condensation drip marks */}
      {[0.2, 0.5, 0.78].map((t, i) => (
        <line key={i} x1={t*width} y1={height*0.08} x2={t*width+5} y2={height*0.2}
          stroke="#1a2535" strokeWidth="1" opacity="0.3" />
      ))}
    </svg>
  );
}
