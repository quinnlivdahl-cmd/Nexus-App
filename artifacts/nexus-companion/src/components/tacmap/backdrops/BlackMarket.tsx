export default function BlackMarket({ width = 900, height = 600 }: { width?: number; height?: number }) {
  return (
    <svg width={width} height={height} viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="bm-glow"><feGaussianBlur stdDeviation="4" result="b"/><feComposite in="SourceGraphic" in2="b" operator="over"/></filter>
        <filter id="bm-glow2"><feGaussianBlur stdDeviation="2" result="b"/><feComposite in="SourceGraphic" in2="b" operator="over"/></filter>
      </defs>
      <rect width={width} height={height} fill="#080608" />

      {/* Vaulted ceiling - repurposed cargo space */}
      <rect x={0} y={0} width={width} height={height*0.15} fill="#100c10" />
      {/* Exposed pipes and cables overhead */}
      {[0.1, 0.2, 0.35, 0.5, 0.65, 0.8, 0.9].map((t, i) => (
        <line key={i} x1={t*width} y1={0} x2={t*width} y2={height*0.15} stroke="#1a141a" strokeWidth={i%3===0?8:4} />
      ))}

      {/* Floor - rough concrete/metal plate */}
      <rect x={0} y={height*0.8} width={width} height={height*0.2} fill="#0d0a0d" />
      {[...Array(9)].map((_, i) => (
        <line key={i} x1={i*width/8} y1={height*0.8} x2={i*width/8} y2={height} stroke="#141014" strokeWidth="2" />
      ))}

      {/* Stall structures - makeshift market */}
      {/* Left stall */}
      <rect x={width*0.02} y={height*0.2} width={width*0.22} height={height*0.55} fill="#130f14" stroke="#1e1820" strokeWidth="2" />
      <rect x={width*0.02} y={height*0.2} width={width*0.22} height={height*0.06} fill="#1a1420" />
      {/* Stall wares - boxes/crates */}
      <rect x={width*0.04} y={height*0.45} width={width*0.06} height={height*0.1} fill="#1a1420" stroke="#251e28" strokeWidth="1" />
      <rect x={width*0.12} y={height*0.38} width={width*0.08} height={height*0.17} fill="#161220" stroke="#201a28" strokeWidth="1" />

      {/* Center passage - open market lane */}
      {/* Hanging sign */}
      <rect x={width*0.38} y={height*0.12} width={width*0.24} height={height*0.06} fill="#1a0a14" stroke="#4a0a28" strokeWidth="1" rx="2" />
      <text x={width*0.41} y={height*0.165} fill="#cc2266" fontSize="9" fontFamily="monospace" opacity="0.7">NO AUTHORITY BEYOND THIS POINT</text>
      <line x1={width*0.45} y1={height*0.1} x2={width*0.45} y2={height*0.12} stroke="#251e28" strokeWidth="2" />
      <line x1={width*0.55} y1={height*0.1} x2={width*0.55} y2={height*0.12} stroke="#251e28" strokeWidth="2" />

      {/* Right stall */}
      <rect x={width*0.76} y={height*0.2} width={width*0.22} height={height*0.55} fill="#130f14" stroke="#1e1820" strokeWidth="2" />
      <rect x={width*0.76} y={height*0.2} width={width*0.22} height={height*0.06} fill="#1a1420" />

      {/* Center stall / back wall */}
      <rect x={width*0.27} y={height*0.15} width={width*0.46} height={height*0.15} fill="#110e12" stroke="#1e1820" strokeWidth="1" />
      {/* Contraband display */}
      {[0.3, 0.38, 0.46, 0.54, 0.62].map((t, i) => (
        <rect key={i} x={t*width} y={height*0.18} width={width*0.06} height={height*0.09}
          fill="#0d0a10" stroke="#1e1820" strokeWidth="1" rx="1" />
      ))}

      {/* Red string lights overhead */}
      <path d={`M 0 ${height*0.18} Q ${width*0.25} ${height*0.22} ${width*0.5} ${height*0.18} Q ${width*0.75} ${height*0.14} ${width} ${height*0.18}`}
        stroke="#3a1020" strokeWidth="1.5" fill="none" />
      {[0.05, 0.15, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 0.85, 0.95].map((t, i) => {
        const y = height * (0.18 + Math.sin(t * Math.PI * 2) * 0.02);
        return <circle key={i} cx={t*width} cy={y} r={3}
          fill={i%3===0?'#cc2266':i%3===1?'#E87722':'#441a00'} opacity="0.7" filter="url(#bm-glow2)" />;
      })}

      {/* Street vendor - center left */}
      <rect x={width*0.28} y={height*0.5} width={width*0.18} height={height*0.28} fill="#130f14" stroke="#1e1820" strokeWidth="1" />
      <rect x={width*0.28} y={height*0.5} width={width*0.18} height={height*0.04} fill="#1e1420" />

      {/* Neon sign - teal */}
      <rect x={width*0.03} y={height*0.22} width={width*0.12} height={height*0.05} rx="2" fill="#001a1a" stroke="#00b4aa" strokeWidth="1" strokeOpacity="0.5" />
      <text x={width*0.04} y={height*0.255} fill="#00b4aa" fontSize="8" fontFamily="monospace" opacity="0.7">PARTS &amp; DATA</text>

      {/* Surveillance camera - corner */}
      <circle cx={width*0.02} cy={height*0.17} r={5} fill="#1a1420" stroke="#251e28" strokeWidth="1" />
      <circle cx={width*0.02} cy={height*0.17} r={2} fill="#ff4444" opacity="0.6" filter="url(#bm-glow2)" />

      {/* Figures in shadow */}
      {[0.35, 0.65].map((t, i) => (
        <g key={i}>
          <ellipse cx={t*width} cy={height*0.7} rx={width*0.015} ry={height*0.02} fill="#0d0a10" opacity="0.8" />
          <rect x={t*width-width*0.015} y={height*0.5} width={width*0.03} height={height*0.2} fill="#0d0a10" opacity="0.6" rx="2" />
        </g>
      ))}

      {/* Amber market glow */}
      <radialGradient id="bm-amb" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#331500" stopOpacity="0.12" />
        <stop offset="100%" stopColor="#080608" stopOpacity="0" />
      </radialGradient>
      <rect x={0} y={0} width={width} height={height} fill="url(#bm-amb)" />
    </svg>
  );
}
