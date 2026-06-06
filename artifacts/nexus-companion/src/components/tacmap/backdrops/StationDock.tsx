export default function StationDock({ width = 900, height = 600 }: { width?: number; height?: number }) {
  return (
    <svg width={width} height={height} viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sd-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#050d12" />
          <stop offset="100%" stopColor="#0a1a22" />
        </linearGradient>
        <filter id="sd-glow"><feGaussianBlur stdDeviation="4" result="b"/><feComposite in="SourceGraphic" in2="b" operator="over"/></filter>
      </defs>
      <rect width={width} height={height} fill="url(#sd-sky)" />

      {/* Far space backdrop */}
      {[...Array(40)].map((_, i) => (
        <circle key={i} cx={Math.sin(i * 137.5) * width * 0.5 + width * 0.5}
          cy={Math.cos(i * 97.3) * height * 0.4 + height * 0.3}
          r={i % 5 === 0 ? 1.5 : 0.8} fill="#ccc" opacity={0.2 + (i % 4) * 0.1} />
      ))}

      {/* Jupiter/gas giant in background */}
      <ellipse cx={width*0.15} cy={height*0.18} rx={60} ry={50} fill="#8B6914" opacity="0.25" />
      <ellipse cx={width*0.15} cy={height*0.18} rx={60} ry={12} fill="none" stroke="#a07820" strokeWidth="2" opacity="0.15" />

      {/* Station superstructure - far left tower */}
      <rect x={0} y={height*0.05} width={width*0.12} height={height*0.7} fill="#111418" />
      <rect x={width*0.01} y={height*0.1} width={width*0.1} height={height*0.6} fill="#131820" />
      {[0.15, 0.3, 0.45, 0.6].map((t, i) => (
        <rect key={i} x={width*0.02} y={height*t} width={width*0.08} height={height*0.04} fill="#1a2028" />
      ))}

      {/* Station superstructure - far right tower */}
      <rect x={width*0.88} y={height*0.05} width={width*0.12} height={height*0.7} fill="#111418" />
      <rect x={width*0.89} y={height*0.1} width={width*0.1} height={height*0.6} fill="#131820" />

      {/* Dock floor */}
      <polygon points={`0,${height} ${width},${height} ${width},${height*0.65} 0,${height*0.65}`} fill="#141920" />
      <polygon points={`0,${height} ${width},${height} ${width},${height*0.7} 0,${height*0.7}`} fill="#1a2028" />

      {/* Floor grid lines */}
      {[0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9].map((t, i) => (
        <line key={i} x1={t*width} y1={height*0.7} x2={t*width} y2={height} stroke="#1e2530" strokeWidth="1" opacity="0.7" />
      ))}
      {[0.75, 0.82, 0.9].map((t, i) => (
        <line key={i} x1={0} y1={t*height} x2={width} y2={t*height} stroke="#1e2530" strokeWidth="1" opacity="0.5" />
      ))}

      {/* Dock bay opening - center void */}
      <rect x={width*0.25} y={0} width={width*0.5} height={height*0.65} fill="#060d10" />

      {/* Bay interior ceiling track */}
      <rect x={width*0.25} y={height*0.05} width={width*0.5} height={height*0.03} fill="#1a2028" />
      <rect x={width*0.26} y={height*0.05} width={width*0.48} height={height*0.01} fill="#E87722" opacity="0.4" />

      {/* Docking clamps left */}
      <rect x={width*0.22} y={height*0.25} width={width*0.06} height={height*0.35} fill="#141a20" />
      <rect x={width*0.24} y={height*0.3} width={width*0.04} height={height*0.25} fill="#1a2028" />
      <polygon points={`${width*0.28},${height*0.4} ${width*0.32},${height*0.42} ${width*0.32},${height*0.48} ${width*0.28},${height*0.5}`} fill="#1a2028" stroke="#252e38" strokeWidth="1" />

      {/* Docking clamps right */}
      <rect x={width*0.72} y={height*0.25} width={width*0.06} height={height*0.35} fill="#141a20" />
      <rect x={width*0.72} y={height*0.3} width={width*0.04} height={height*0.25} fill="#1a2028" />
      <polygon points={`${width*0.72},${height*0.4} ${width*0.68},${height*0.42} ${width*0.68},${height*0.48} ${width*0.72},${height*0.5}`} fill="#1a2028" stroke="#252e38" strokeWidth="1" />

      {/* Ship hull silhouette */}
      <ellipse cx={width*0.5} cy={height*0.38} rx={width*0.15} ry={height*0.12} fill="#0d1318" stroke="#1a2028" strokeWidth="2" />
      <polygon points={`${width*0.35},${height*0.32} ${width*0.65},${height*0.32} ${width*0.7},${height*0.42} ${width*0.3},${height*0.42}`} fill="#0f1520" stroke="#1a2028" strokeWidth="1" />
      <ellipse cx={width*0.5} cy={height*0.42} rx={width*0.08} ry={height*0.06} fill="#0a1015" />

      {/* Warning lights on dock edge */}
      {[0.28, 0.4, 0.5, 0.6, 0.72].map((t, i) => (
        <circle key={i} cx={t*width} cy={height*0.67} r={4}
          fill={i % 2 === 0 ? '#E87722' : '#ff4444'} opacity="0.9" filter="url(#sd-glow)" />
      ))}

      {/* Control booth - right side */}
      <rect x={width*0.76} y={height*0.5} width={width*0.1} height={height*0.15} fill="#141a20" stroke="#1e2830" strokeWidth="2" />
      <rect x={width*0.77} y={height*0.52} width={width*0.08} height={height*0.08} fill="#0a1420" />
      <rect x={width*0.78} y={height*0.53} width={width*0.06} height={height*0.06} fill="#00b4aa" opacity="0.15" />

      {/* Cargo containers stacked left */}
      <rect x={width*0.02} y={height*0.55} width={width*0.09} height={height*0.1} fill="#141a20" stroke="#1e2830" strokeWidth="1" />
      <rect x={width*0.02} y={height*0.45} width={width*0.09} height={height*0.1} fill="#131820" stroke="#1e2830" strokeWidth="1" />
      <line x1={width*0.02} y1={height*0.55} x2={width*0.11} y2={height*0.55} stroke="#252e38" strokeWidth="1" />

      {/* Teal display panels on walls */}
      {[0.14, 0.17].map((t, i) => (
        <rect key={i} x={width*0.88} y={height*t} width={width*0.06} height={height*0.06}
          fill="#00b4aa" opacity="0.08" stroke="#00b4aa" strokeWidth="1" strokeOpacity="0.3" />
      ))}

      {/* Atmospheric depth haze at bay opening */}
      <radialGradient id="sd-haze" cx="50%" cy="60%" r="40%">
        <stop offset="0%" stopColor="#0a1520" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#060d10" stopOpacity="0" />
      </radialGradient>
      <ellipse cx={width*0.5} cy={height*0.6} rx={width*0.3} ry={height*0.3} fill="url(#sd-haze)" />
    </svg>
  );
}
