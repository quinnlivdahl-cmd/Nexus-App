export default function AsteroidMine({ width = 900, height = 600 }: { width?: number; height?: number }) {
  return (
    <svg width={width} height={height} viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="am-depth" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#12100d" />
          <stop offset="100%" stopColor="#060503" />
        </radialGradient>
        <filter id="am-glow"><feGaussianBlur stdDeviation="3" result="b"/><feComposite in="SourceGraphic" in2="b" operator="over"/></filter>
      </defs>
      <rect width={width} height={height} fill="#060503" />

      {/* Cave walls - rough rock silhouettes */}
      {/* Left rock mass */}
      <polygon points={`0,0 ${width*0.35},0 ${width*0.28},${height*0.15} ${width*0.22},${height*0.25} ${width*0.18},${height*0.4} ${width*0.2},${height*0.55} ${width*0.15},${height*0.65} 0,${height*0.7}`} fill="#1a1510" />
      <polygon points={`0,0 ${width*0.3},0 ${width*0.22},${height*0.12} ${width*0.16},${height*0.3} ${width*0.1},${height*0.5} 0,${height*0.6}`} fill="#130f0c" />

      {/* Right rock mass */}
      <polygon points={`${width},0 ${width*0.65},0 ${width*0.72},${height*0.15} ${width*0.78},${height*0.28} ${width*0.82},${height*0.42} ${width*0.8},${height*0.56} ${width*0.85},${height*0.65} ${width},${height*0.7}`} fill="#1a1510" />
      <polygon points={`${width},0 ${width*0.7},0 ${width*0.78},${height*0.12} ${width*0.84},${height*0.3} ${width*0.9},${height*0.5} ${width},${height*0.6}`} fill="#130f0c" />

      {/* Ceiling rock */}
      <polygon points={`0,0 ${width},0 ${width},${height*0.25} ${width*0.82},${height*0.18} ${width*0.7},${height*0.22} ${width*0.55},${height*0.15} ${width*0.5},${height*0.2} ${width*0.45},${height*0.12} ${width*0.3},${height*0.2} ${width*0.18},${height*0.18} 0,${height*0.25}`} fill="#1a1510" />

      {/* Floor rock */}
      <polygon points={`0,${height} ${width},${height} ${width},${height*0.72} ${width*0.82},${height*0.68} ${width*0.65},${height*0.72} ${width*0.5},${height*0.68} ${width*0.35},${height*0.72} ${width*0.2},${height*0.68} 0,${height*0.72}`} fill="#151109" />

      {/* Rock texture - cracks */}
      <line x1={width*0.1} y1={height*0.08} x2={width*0.15} y2={height*0.25} stroke="#0d0b08" strokeWidth="2" />
      <line x1={width*0.25} y1={0} x2={width*0.2} y2={height*0.18} stroke="#0d0b08" strokeWidth="1.5" />
      <line x1={width*0.78} y1={height*0.05} x2={width*0.73} y2={height*0.2} stroke="#0d0b08" strokeWidth="2" />

      {/* Mining tunnel opening - central void */}
      <ellipse cx={width*0.5} cy={height*0.5} rx={width*0.25} ry={height*0.28} fill="url(#am-depth)" />

      {/* Tunnel support beams */}
      <rect x={width*0.3} y={height*0.22} width={width*0.02} height={height*0.56} fill="#2a2018" stroke="#3a2e20" strokeWidth="1" />
      <rect x={width*0.68} y={height*0.22} width={width*0.02} height={height*0.56} fill="#2a2018" stroke="#3a2e20" strokeWidth="1" />
      <rect x={width*0.3} y={height*0.22} width={width*0.4} height={height*0.03} fill="#2a2018" />
      <rect x={width*0.3} y={height*0.75} width={width*0.4} height={height*0.03} fill="#2a2018" />

      {/* Mining equipment - drill arm left */}
      <rect x={width*0.14} y={height*0.48} width={width*0.18} height={height*0.04} fill="#241c12" stroke="#3a2e20" strokeWidth="1" />
      <circle cx={width*0.14} cy={height*0.5} r={8} fill="#3a2e20" />
      <line x1={width*0.14} y1={height*0.5} x2={width*0.08} y2={height*0.52} stroke="#4a3e28" strokeWidth="4" />

      {/* Work lights on beams */}
      <circle cx={width*0.31} cy={height*0.24} r={5} fill="#E87722" opacity="0.9" filter="url(#am-glow)" />
      <circle cx={width*0.69} cy={height*0.24} r={5} fill="#E87722" opacity="0.9" filter="url(#am-glow)" />

      {/* Light cones from work lights */}
      <polygon points={`${width*0.31},${height*0.25} ${width*0.2},${height*0.68} ${width*0.42},${height*0.68}`} fill="#E87722" opacity="0.03" />
      <polygon points={`${width*0.69},${height*0.25} ${width*0.58},${height*0.68} ${width*0.8},${height*0.68}`} fill="#E87722" opacity="0.03" />

      {/* Emergency light strip - left beam */}
      {[0.3, 0.38, 0.46, 0.54, 0.62, 0.7].map((t, i) => (
        <rect key={i} x={width*0.28} y={height*t} width={width*0.02} height={height*0.02}
          fill={i % 3 === 0 ? '#ff4444' : '#1a1510'} opacity="0.8" />
      ))}

      {/* Ore cart track */}
      <line x1={0} y1={height*0.77} x2={width} y2={height*0.77} stroke="#3a2e20" strokeWidth="3" />
      <line x1={0} y1={height*0.79} x2={width} y2={height*0.79} stroke="#3a2e20" strokeWidth="3" />
      {[0.05, 0.15, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 0.85, 0.95].map((t, i) => (
        <line key={i} x1={t*width} y1={height*0.77} x2={t*width} y2={height*0.79} stroke="#2a2018" strokeWidth="4" />
      ))}

      {/* Ore cart */}
      <rect x={width*0.44} y={height*0.72} width={width*0.12} height={height*0.05} fill="#241c12" stroke="#3a2e20" strokeWidth="1" rx="2" />
      <circle cx={width*0.47} cy={height*0.78} r={4} fill="#2a2018" />
      <circle cx={width*0.53} cy={height*0.78} r={4} fill="#2a2018" />

      {/* Dust particles */}
      {[...Array(20)].map((_, i) => (
        <circle key={i}
          cx={Math.sin(i*41.7)*width*0.4 + width*0.5}
          cy={Math.cos(i*31.3)*height*0.3 + height*0.5}
          r={0.8} fill="#8B6914" opacity={0.2 + (i%5)*0.05} />
      ))}

      {/* Mineral vein glow in rock - teal */}
      <path d={`M ${width*0.05} ${height*0.3} Q ${width*0.12} ${height*0.35} ${width*0.08} ${height*0.45}`}
        stroke="#00b4aa" strokeWidth="2" fill="none" opacity="0.2" filter="url(#am-glow)" />
    </svg>
  );
}
