export default function SurfaceExterior({ width = 900, height = 600 }: { width?: number; height?: number }) {
  return (
    <svg width={width} height={height} viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="se-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#020408" />
          <stop offset="60%" stopColor="#040810" />
          <stop offset="100%" stopColor="#060c18" />
        </linearGradient>
        <linearGradient id="se-ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a1510" />
          <stop offset="100%" stopColor="#0d0c0a" />
        </linearGradient>
        <filter id="se-glow"><feGaussianBlur stdDeviation="5" result="b"/><feComposite in="SourceGraphic" in2="b" operator="over"/></filter>
      </defs>
      <rect width={width} height={height} fill="url(#se-sky)" />

      {/* Stars */}
      {[...Array(60)].map((_, i) => (
        <circle key={i} cx={(i*173+30)%width} cy={(i*97)%(height*0.65)} r={i%8===0?1.5:0.7} fill="#ddd" opacity={0.1+(i%7)*0.04} />
      ))}

      {/* Jupiter - large in sky */}
      <ellipse cx={width*0.2} cy={height*0.2} rx={70} ry={58} fill="#5C3D0A" opacity="0.7" />
      <ellipse cx={width*0.2} cy={height*0.2} rx={70} ry={58} fill="none" stroke="#6B4E14" strokeWidth="1" opacity="0.5" />
      <ellipse cx={width*0.2} cy={height*0.22} rx={70} ry={10} fill="#7a5a1a" opacity="0.3" />
      <ellipse cx={width*0.2} cy={height*0.17} rx={65} ry={8} fill="#4a3008" opacity="0.4" />
      {/* Jupiter moon shadow */}
      <circle cx={width*0.28} cy={height*0.15} r={8} fill="#020408" opacity="0.8" />

      {/* Horizon glow from Jupiter */}
      <radialGradient id="se-jup-glow" cx="20%" cy="55%" r="35%">
        <stop offset="0%" stopColor="#5C3D0A" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#020408" stopOpacity="0" />
      </radialGradient>
      <rect x={0} y={0} width={width} height={height} fill="url(#se-jup-glow)" />

      {/* Europa icy surface - horizon line */}
      <rect x={0} y={height*0.62} width={width} height={height*0.38} fill="url(#se-ground)" />

      {/* Ice ridge silhouettes - far distance */}
      <polygon points={`0,${height*0.62} ${width*0.1},${height*0.55} ${width*0.18},${height*0.6} ${width*0.28},${height*0.53} ${width*0.4},${height*0.6} ${width*0.55},${height*0.54} ${width*0.65},${height*0.6} ${width*0.78},${height*0.56} ${width*0.9},${height*0.62} ${width},${height*0.6} ${width},${height*0.62}`}
        fill="#131008" />
      {/* Mid-distance ridges */}
      <polygon points={`0,${height*0.68} ${width*0.08},${height*0.64} ${width*0.15},${height*0.67} ${width*0.25},${height*0.63} ${width*0.35},${height*0.68} ${width*0.5},${height*0.65} ${width*0.6},${height*0.7} ${width*0.72},${height*0.64} ${width*0.85},${height*0.68} ${width},${height*0.66} ${width},${height*0.68}`}
        fill="#171410" />

      {/* Industrial installation - left */}
      <rect x={width*0.02} y={height*0.42} width={width*0.08} height={height*0.2} fill="#1a1510" stroke="#252018" strokeWidth="1" />
      <rect x={width*0.03} y={height*0.38} width={width*0.06} height={height*0.06} fill="#1a1510" />
      {/* Antenna */}
      <line x1={width*0.06} y1={height*0.35} x2={width*0.06} y2={height*0.42} stroke="#252018" strokeWidth="2" />
      <circle cx={width*0.06} cy={height*0.35} r={3} fill="#E87722" opacity="0.7" filter="url(#se-glow)" />

      {/* Industrial installation - right */}
      <rect x={width*0.85} y={height*0.44} width={width*0.12} height={height*0.18} fill="#1a1510" stroke="#252018" strokeWidth="1" />
      <rect x={width*0.87} y={height*0.36} width={width*0.04} height={height*0.1} fill="#252018" />
      <rect x={width*0.86} y={height*0.4} width={width*0.07} height={height*0.04} fill="#1e1a14" />
      {/* Warning lights */}
      <circle cx={width*0.89} cy={height*0.36} r={4} fill="#E87722" opacity="0.8" filter="url(#se-glow)" />
      <circle cx={width*0.93} cy={height*0.44} r={3} fill="#ff4444" opacity="0.6" filter="url(#se-glow)" />

      {/* Surface cracks / ice fractures */}
      <line x1={width*0.3} y1={height*0.62} x2={width*0.4} y2={height*0.75} stroke="#0d0c0a" strokeWidth="2" opacity="0.8" />
      <line x1={width*0.4} y1={height*0.75} x2={width*0.35} y2={height*0.85} stroke="#0d0c0a" strokeWidth="1.5" opacity="0.6" />
      <line x1={width*0.6} y1={height*0.62} x2={width*0.55} y2={height*0.8} stroke="#0d0c0a" strokeWidth="2" opacity="0.7" />

      {/* Crew footprints / boot marks in foreground */}
      {[0.35, 0.4, 0.45, 0.5].map((t, i) => (
        <ellipse key={i} cx={t*width} cy={height*0.88+i*height*0.03} rx={width*0.01} ry={height*0.008} fill="#0d0c0a" opacity="0.5" />
      ))}

      {/* Habitat dome - center far */}
      <ellipse cx={width*0.5} cy={height*0.58} rx={width*0.06} ry={height*0.04} fill="#14120e" stroke="#1e1a14" strokeWidth="1" />
      <ellipse cx={width*0.5} cy={height*0.56} rx={width*0.04} ry={height*0.025} fill="#00b4aa" opacity="0.06" filter="url(#se-glow)" />

      {/* Tether cables - overhead */}
      <path d={`M 0 ${height*0.15} Q ${width*0.3} ${height*0.12} ${width*0.5} ${height*0.18} Q ${width*0.7} ${height*0.24} ${width} ${height*0.2}`}
        stroke="#252018" strokeWidth="1.5" fill="none" opacity="0.6" />
    </svg>
  );
}
