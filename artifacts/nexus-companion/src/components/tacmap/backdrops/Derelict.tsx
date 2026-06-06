export default function Derelict({ width = 900, height = 600 }: { width?: number; height?: number }) {
  return (
    <svg width={width} height={height} viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="drl-glow"><feGaussianBlur stdDeviation="4" result="b"/><feComposite in="SourceGraphic" in2="b" operator="over"/></filter>
      </defs>
      <rect width={width} height={height} fill="#050508" />

      {/* Stars visible through hull breach */}
      {[...Array(30)].map((_, i) => (
        <circle key={i} cx={(i*173)%width} cy={(i*97)%height} r={0.8} fill="#aaa" opacity={0.15+(i%5)*0.05} />
      ))}

      {/* Collapsed ceiling section left */}
      <polygon points={`0,0 ${width*0.45},0 ${width*0.4},${height*0.35} ${width*0.3},${height*0.3} ${width*0.15},${height*0.45} 0,${height*0.4}`}
        fill="#161418" />
      <polygon points={`0,0 ${width*0.38},0 ${width*0.32},${height*0.28} ${width*0.12},${height*0.38} 0,${height*0.35}`}
        fill="#1a1820" />

      {/* Collapsed ceiling section right */}
      <polygon points={`${width},0 ${width*0.6},0 ${width*0.65},${height*0.32} ${width*0.75},${height*0.28} ${width*0.88},${height*0.42} ${width},${height*0.38}`}
        fill="#161418" />

      {/* Broken floor */}
      <polygon points={`0,${height} ${width},${height} ${width},${height*0.72} ${width*0.8},${height*0.68} ${width*0.6},${height*0.75} ${width*0.4},${height*0.7} ${width*0.2},${height*0.76} 0,${height*0.71}`}
        fill="#161218" />

      {/* Twisted structural beams */}
      <line x1={width*0.25} y1={0} x2={width*0.35} y2={height*0.6} stroke="#2a2028" strokeWidth="12" strokeLinecap="round" />
      <line x1={width*0.25} y1={0} x2={width*0.35} y2={height*0.6} stroke="#1a1820" strokeWidth="8" />
      <line x1={width*0.7} y1={0} x2={width*0.6} y2={height*0.55} stroke="#2a2028" strokeWidth="10" strokeLinecap="round" />

      {/* Hull breach - star exposure */}
      <polygon points={`${width*0.38},${height*0.08} ${width*0.62},${height*0.08} ${width*0.65},${height*0.28} ${width*0.58},${height*0.32} ${width*0.5},${height*0.3} ${width*0.42},${height*0.32} ${width*0.35},${height*0.28}`}
        fill="#050508" />

      {/* Debris scattered */}
      <rect x={width*0.12} y={height*0.52} width={width*0.08} height={height*0.05} fill="#1a1820" transform="rotate(-15, 150, 330)" />
      <rect x={width*0.55} y={height*0.48} width={width*0.06} height={height*0.04} fill="#161418" transform="rotate(8, 520, 300)" />
      <rect x={width*0.78} y={height*0.56} width={width*0.07} height={height*0.03} fill="#1a1820" transform="rotate(-22, 720, 350)" />
      <polygon points={`${width*0.44},${height*0.55} ${width*0.5},${height*0.52} ${width*0.52},${height*0.6} ${width*0.46},${height*0.62}`} fill="#1a1618" />

      {/* Emergency lighting - flickering amber, barely working */}
      <rect x={width*0.15} y={height*0.42} width={width*0.06} height={height*0.02} rx="2" fill="#1a1a1a" />
      <rect x={width*0.16} y={height*0.42} width={width*0.04} height={height*0.01} fill="#E87722" opacity="0.25" filter="url(#drl-glow)" />

      {/* Emergency sign broken */}
      <rect x={width*0.85} y={height*0.44} width={width*0.08} height={height*0.04} fill="#1a0000" stroke="#ff2200" strokeWidth="1" strokeOpacity="0.4" />
      <text x={width*0.86} y={height*0.47} fill="#ff2200" fontSize="7" fontFamily="monospace" opacity="0.3">EMRG</text>

      {/* Cracked viewport */}
      <circle cx={width*0.82} cy={height*0.2} r={30} fill="#050508" stroke="#2a2028" strokeWidth="4" />
      <circle cx={width*0.82} cy={height*0.2} r={26} fill="#030305" stroke="#1a1820" strokeWidth="1" />
      {/* crack lines */}
      <line x1={width*0.82} y1={height*0.12} x2={width*0.78} y2={height*0.25} stroke="#2a2028" strokeWidth="1.5" />
      <line x1={width*0.82} y1={height*0.12} x2={width*0.86} y2={height*0.18} stroke="#2a2028" strokeWidth="1" />

      {/* Sparking electrical conduit */}
      <line x1={width*0.3} y1={height*0.35} x2={width*0.4} y2={height*0.42} stroke="#333" strokeWidth="3" />
      <circle cx={width*0.38} cy={height*0.41} r={3} fill="#00b4aa" opacity="0.6" filter="url(#drl-glow)" />

      {/* Low emergency glow from far section */}
      <radialGradient id="drl-emrg" cx="70%" cy="55%" r="30%">
        <stop offset="0%" stopColor="#ff2200" stopOpacity="0.06" />
        <stop offset="100%" stopColor="#050508" stopOpacity="0" />
      </radialGradient>
      <rect x={0} y={0} width={width} height={height} fill="url(#drl-emrg)" />

      {/* Dust motes */}
      {[...Array(15)].map((_, i) => (
        <circle key={i} cx={(i*233+50)%width} cy={(i*157+100)%height}
          r={1} fill="#8B8080" opacity={0.1+(i%4)*0.05} />
      ))}
    </svg>
  );
}
