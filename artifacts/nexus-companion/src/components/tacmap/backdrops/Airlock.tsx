export default function Airlock({ width = 900, height = 600 }: { width?: number; height?: number }) {
  return (
    <svg width={width} height={height} viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="al-glow"><feGaussianBlur stdDeviation="4" result="b"/><feComposite in="SourceGraphic" in2="b" operator="over"/></filter>
        <linearGradient id="al-door" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a1f28" />
          <stop offset="50%" stopColor="#232b38" />
          <stop offset="100%" stopColor="#1a1f28" />
        </linearGradient>
      </defs>
      <rect width={width} height={height} fill="#0d1018" />

      {/* Side wall panels */}
      <rect x={0} y={0} width={width*0.18} height={height} fill="#131820" />
      <rect x={width*0.82} y={0} width={width*0.18} height={height} fill="#131820" />

      {/* Wall panel detail lines */}
      {[0.15, 0.3, 0.5, 0.65, 0.8].map((t, i) => (
        <line key={i} x1={0} y1={t*height} x2={width*0.18} y2={t*height} stroke="#1a2030" strokeWidth="1" />
      ))}
      {[0.15, 0.3, 0.5, 0.65, 0.8].map((t, i) => (
        <line key={i} x1={width*0.82} y1={t*height} x2={width} y2={t*height} stroke="#1a2030" strokeWidth="1" />
      ))}

      {/* Ceiling */}
      <rect x={0} y={0} width={width} height={height*0.12} fill="#131820" />
      {/* Ceiling light strip */}
      <rect x={width*0.25} y={height*0.06} width={width*0.5} height={height*0.03} rx="2" fill="#1a2030" />
      <rect x={width*0.27} y={height*0.07} width={width*0.46} height={height*0.015} fill="#E87722" opacity="0.6" filter="url(#al-glow)" />

      {/* Floor */}
      <rect x={0} y={height*0.82} width={width} height={height*0.18} fill="#131820" />
      {/* Hazard floor stripes */}
      {[...Array(14)].map((_, i) => (
        <rect key={i} x={i*width/14} y={height*0.85} width={width/28} height={height*0.05}
          fill={i%2===0?'#E87722':'#1a1510'} opacity="0.5" />
      ))}

      {/* Inner door - open (showing the void beyond) */}
      <rect x={width*0.25} y={height*0.12} width={width*0.5} height={height*0.7} fill="#060810" />
      {/* Stars in void */}
      {[...Array(20)].map((_, i) => (
        <circle key={i} cx={width*0.25 + (i*167)%(width*0.5)} cy={height*0.12+(i*97)%(height*0.7)} r={0.8} fill="#aaa" opacity={0.2+(i%4)*0.05} />
      ))}

      {/* Door frame */}
      <rect x={width*0.22} y={height*0.1} width={width*0.56} height={height*0.75} fill="none" stroke="#1e2840" strokeWidth="6" />
      <rect x={width*0.225} y={height*0.105} width={width*0.55} height={height*0.74} fill="none" stroke="#2a3850" strokeWidth="2" />

      {/* Outer door panels - left half sliding open */}
      <rect x={width*0.18} y={height*0.12} width={width*0.07} height={height*0.7} fill="url(#al-door)" />
      <line x1={width*0.18} y1={height*0.15} x2={width*0.25} y2={height*0.15} stroke="#2a3850" strokeWidth="1.5" />
      <line x1={width*0.18} y1={height*0.5} x2={width*0.25} y2={height*0.5} stroke="#2a3850" strokeWidth="1.5" />
      <line x1={width*0.18} y1={height*0.75} x2={width*0.25} y2={height*0.75} stroke="#2a3850" strokeWidth="1.5" />

      {/* Outer door panels - right half sliding open */}
      <rect x={width*0.75} y={height*0.12} width={width*0.07} height={height*0.7} fill="url(#al-door)" />

      {/* Pressure readout panel - left */}
      <rect x={width*0.02} y={height*0.35} width={width*0.12} height={height*0.2} fill="#0f1420" stroke="#1e2840" strokeWidth="1" />
      <text x={width*0.035} y={height*0.43} fill="#00b4aa" fontSize="8" fontFamily="monospace" opacity="0.8">PRESSURE</text>
      <text x={width*0.035} y={height*0.48} fill="#E87722" fontSize="10" fontFamily="monospace" opacity="0.9">0.00 ATM</text>
      <text x={width*0.035} y={height*0.52} fill="#ff4444" fontSize="7" fontFamily="monospace" opacity="0.8">VACUUM</text>

      {/* Pressure readout panel - right */}
      <rect x={width*0.86} y={height*0.35} width={width*0.12} height={height*0.2} fill="#0f1420" stroke="#1e2840" strokeWidth="1" />
      <text x={width*0.875} y={height*0.43} fill="#00b4aa" fontSize="8" fontFamily="monospace" opacity="0.8">CYCLE</text>
      <text x={width*0.875} y={height*0.48} fill="#E87722" fontSize="9" fontFamily="monospace" opacity="0.9">READY</text>

      {/* Warning light bands */}
      <rect x={width*0.18} y={height*0.12} width={width*0.04} height={height*0.7} fill="#E87722" opacity="0.12" />
      <rect x={width*0.78} y={height*0.12} width={width*0.04} height={height*0.7} fill="#E87722" opacity="0.12" />

      {/* Suit rack - left wall */}
      <rect x={width*0.02} y={height*0.18} width={width*0.12} height={height*0.15} fill="#101620" stroke="#1e2840" strokeWidth="1" />
      {[0,1].map((i) => (
        <g key={i}>
          <rect x={width*0.03 + i*width*0.055} y={height*0.2} width={width*0.04} height={height*0.1} rx="3" fill="#1a2030" stroke="#2a3850" strokeWidth="1" />
          <circle cx={width*0.05 + i*width*0.055} cy={height*0.21} r={4} fill="#2a3850" />
        </g>
      ))}

      {/* Status lights above door frame */}
      {[0.35, 0.45, 0.55, 0.65].map((t, i) => (
        <circle key={i} cx={t*width} cy={height*0.11} r={4}
          fill={i===0||i===3?'#ff4444':i===1?'#E87722':'#00b4aa'} opacity="0.9" filter="url(#al-glow)" />
      ))}
    </svg>
  );
}
