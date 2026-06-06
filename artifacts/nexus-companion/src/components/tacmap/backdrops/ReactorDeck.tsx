export default function ReactorDeck({ width = 900, height = 600 }: { width?: number; height?: number }) {
  return (
    <svg width={width} height={height} viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="rd-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#004a44" />
          <stop offset="60%" stopColor="#001a18" />
          <stop offset="100%" stopColor="#000806" />
        </radialGradient>
        <filter id="rd-glow"><feGaussianBlur stdDeviation="5" result="b"/><feComposite in="SourceGraphic" in2="b" operator="over"/></filter>
        <filter id="rd-glow2"><feGaussianBlur stdDeviation="2" result="b"/><feComposite in="SourceGraphic" in2="b" operator="over"/></filter>
      </defs>
      <rect width={width} height={height} fill="#080c0b" />

      {/* Floor grating */}
      <rect x={0} y={height*0.72} width={width} height={height*0.28} fill="#0d1210" />
      {[...Array(18)].map((_, i) => (
        <line key={i} x1={i*width/17} y1={height*0.72} x2={i*width/17} y2={height} stroke="#141a18" strokeWidth="1" />
      ))}
      {[0.77, 0.84, 0.92].map((t, i) => (
        <line key={i} x1={0} y1={t*height} x2={width} y2={t*height} stroke="#141a18" strokeWidth="1" />
      ))}

      {/* Ceiling */}
      <rect x={0} y={0} width={width} height={height*0.12} fill="#0d1210" />

      {/* Reactor core housing - center */}
      <rect x={width*0.35} y={height*0.12} width={width*0.3} height={height*0.6} fill="#0f1614" stroke="#1a2620" strokeWidth="2" />
      <rect x={width*0.37} y={height*0.14} width={width*0.26} height={height*0.56} fill="#0a0f0d" stroke="#152020" strokeWidth="1" />

      {/* Core glow - central reactor */}
      <ellipse cx={width*0.5} cy={height*0.5} rx={width*0.1} ry={height*0.2} fill="url(#rd-core)" />
      <ellipse cx={width*0.5} cy={height*0.5} rx={width*0.06} ry={height*0.12} fill="#00b4aa" opacity="0.15" filter="url(#rd-glow)" />
      <ellipse cx={width*0.5} cy={height*0.5} rx={width*0.02} ry={height*0.06} fill="#00e8dc" opacity="0.4" filter="url(#rd-glow)" />

      {/* Core vertical column */}
      <rect x={width*0.475} y={height*0.12} width={width*0.05} height={height*0.6} fill="#0a1412" stroke="#00b4aa" strokeWidth="1" strokeOpacity="0.2" />

      {/* Core status rings */}
      {[0.25, 0.38, 0.5, 0.62, 0.75].map((t, i) => (
        <ellipse key={i} cx={width*0.5} cy={height*t} rx={width*0.045} ry={height*0.015}
          fill="none" stroke="#00b4aa" strokeWidth={i===2?2:1} strokeOpacity={i===2?0.5:0.2} />
      ))}

      {/* Coolant pipes - left side */}
      <line x1={0} y1={height*0.22} x2={width*0.35} y2={height*0.22} stroke="#1a2a28" strokeWidth={10} />
      <line x1={0} y1={height*0.22} x2={width*0.35} y2={height*0.22} stroke="#00b4aa" strokeWidth={2} strokeOpacity="0.2" />
      <line x1={0} y1={height*0.42} x2={width*0.35} y2={height*0.42} stroke="#1a2a28" strokeWidth={10} />
      <line x1={0} y1={height*0.62} x2={width*0.35} y2={height*0.62} stroke="#1a2a28" strokeWidth={10} />
      <line x1={0} y1={height*0.62} x2={width*0.35} y2={height*0.62} stroke="#00b4aa" strokeWidth={2} strokeOpacity="0.15" />

      {/* Coolant pipes - right side */}
      <line x1={width*0.65} y1={height*0.22} x2={width} y2={height*0.22} stroke="#1a2a28" strokeWidth={10} />
      <line x1={width*0.65} y1={height*0.42} x2={width} y2={height*0.42} stroke="#1a2a28" strokeWidth={10} />
      <line x1={width*0.65} y1={height*0.42} x2={width} y2={height*0.42} stroke="#00b4aa" strokeWidth={2} strokeOpacity="0.2" />
      <line x1={width*0.65} y1={height*0.62} x2={width} y2={height*0.62} stroke="#1a2a28" strokeWidth={10} />

      {/* Control panels - left wall */}
      <rect x={width*0.05} y={height*0.3} width={width*0.2} height={height*0.35} fill="#0f1614" stroke="#1a2620" strokeWidth="2" />
      {[0,1,2].map((row) => [0,1,2,3].map((col) => (
        <rect key={`${row}-${col}`}
          x={width*0.07 + col*width*0.04} y={height*0.33 + row*height*0.09}
          width={width*0.03} height={height*0.06}
          fill={Math.random()>0.7?'#00b4aa':'#141e1c'} opacity="0.6" stroke="#1a2620" strokeWidth="1" />
      )))}

      {/* Control panels - right wall */}
      <rect x={width*0.75} y={height*0.3} width={width*0.2} height={height*0.35} fill="#0f1614" stroke="#1a2620" strokeWidth="2" />

      {/* Hazard stripes at reactor base */}
      {[0,1,2,3,4,5,6,7,8,9].map((i) => (
        <rect key={i} x={width*0.35 + i*width*0.03} y={height*0.7} width={width*0.03} height={height*0.02}
          fill={i%2===0?'#E87722':'#1a1510'} opacity="0.6" />
      ))}

      {/* Emergency status lights */}
      {[0.1, 0.3, 0.7, 0.9].map((t, i) => (
        <circle key={i} cx={t*width} cy={height*0.08} r={5}
          fill={i===0||i===3?'#ff4444':'#00b4aa'} opacity="0.8" filter="url(#rd-glow2)" />
      ))}

      {/* Heat shimmer effect at top of reactor */}
      <rect x={width*0.4} y={height*0.12} width={width*0.2} height={height*0.05} fill="#00b4aa" opacity="0.03" />

      {/* Walkway - maintenance catwalk */}
      <rect x={0} y={height*0.68} width={width} height={height*0.04} fill="#141e1c" stroke="#1a2620" strokeWidth="1" />
      {[0.05, 0.15, 0.25, 0.75, 0.85, 0.95].map((t, i) => (
        <line key={i} x1={t*width} y1={height*0.68} x2={t*width} y2={height*0.72} stroke="#1a2620" strokeWidth="3" />
      ))}
    </svg>
  );
}
