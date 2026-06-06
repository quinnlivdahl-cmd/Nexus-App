export default function MedicalBay({ width = 900, height = 600 }: { width?: number; height?: number }) {
  return (
    <svg width={width} height={height} viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="mb-glow"><feGaussianBlur stdDeviation="3" result="b"/><feComposite in="SourceGraphic" in2="b" operator="over"/></filter>
        <linearGradient id="mb-panel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a2222" />
          <stop offset="100%" stopColor="#141c1c" />
        </linearGradient>
      </defs>
      <rect width={width} height={height} fill="#0d1414" />

      {/* Clean white walls (worn) */}
      <rect x={0} y={0} width={width} height={height} fill="#0f1818" />

      {/* Ceiling - sterile panel grid */}
      <rect x={0} y={0} width={width} height={height*0.1} fill="#141e1e" />
      {[0.15, 0.3, 0.45, 0.6, 0.75, 0.9].map((t, i) => (
        <line key={i} x1={t*width} y1={0} x2={t*width} y2={height*0.1} stroke="#1a2828" strokeWidth="1" />
      ))}
      {/* Bright overhead light strip */}
      <rect x={width*0.3} y={height*0.03} width={width*0.4} height={height*0.04} rx="2" fill="#1e2c2c" />
      <rect x={width*0.32} y={height*0.035} width={width*0.36} height={height*0.025} fill="#b0d8d0" opacity="0.5" filter="url(#mb-glow)" />

      {/* Floor */}
      <rect x={0} y={height*0.82} width={width} height={height*0.18} fill="#131e1e" />
      {/* Floor grid tiles */}
      {[...Array(10)].map((_, c) => [...Array(3)].map((_, r) => (
        <rect key={`${c}-${r}`} x={c*width/10} y={height*0.82+r*height*0.06}
          width={width/10-1} height={height*0.06-1} fill="#141e1e" stroke="#1a2828" strokeWidth="1" />
      )))}

      {/* Med bay beds - left */}
      <rect x={width*0.05} y={height*0.35} width={width*0.2} height={height*0.45} fill="url(#mb-panel)" stroke="#1e3030" strokeWidth="2" rx="3" />
      <rect x={width*0.06} y={height*0.38} width={width*0.18} height={height*0.3} fill="#0f1c1c" stroke="#1a2828" strokeWidth="1" />
      {/* Bio-monitor display */}
      <rect x={width*0.06} y={height*0.7} width={width*0.18} height={height*0.08} fill="#0a1414" stroke="#00b4aa" strokeWidth="1" strokeOpacity="0.4" />
      <polyline points={`${width*0.07},${height*0.74} ${width*0.09},${height*0.72} ${width*0.1},${height*0.76} ${width*0.11},${height*0.72} ${width*0.12},${height*0.74} ${width*0.14},${height*0.74} ${width*0.15},${height*0.73} ${width*0.17},${height*0.75} ${width*0.19},${height*0.74} ${width*0.23},${height*0.74}`}
        stroke="#00b4aa" strokeWidth="1.5" fill="none" opacity="0.7" />

      {/* Med bay bed - center */}
      <rect x={width*0.38} y={height*0.35} width={width*0.24} height={height*0.45} fill="url(#mb-panel)" stroke="#1e3030" strokeWidth="2" rx="3" />
      <rect x={width*0.39} y={height*0.38} width={width*0.22} height={height*0.3} fill="#0f1c1c" />
      {/* Patient outline - occupant */}
      <ellipse cx={width*0.5} cy={height*0.45} rx={width*0.04} ry={height*0.04} fill="#1a2828" opacity="0.8" />
      <rect x={width*0.43} y={height*0.49} width={width*0.14} height={height*0.18} rx="4" fill="#1a2828" opacity="0.6" />
      {/* IV stand */}
      <line x1={width*0.61} y1={height*0.35} x2={width*0.61} y2={height*0.75} stroke="#1e3030" strokeWidth="3" />
      <rect x={width*0.595} y={height*0.35} width={width*0.03} height={height*0.08} rx="3" fill="#1a2828" stroke="#00b4aa" strokeWidth="1" strokeOpacity="0.4" />

      {/* Med bay beds - right */}
      <rect x={width*0.75} y={height*0.35} width={width*0.2} height={height*0.45} fill="url(#mb-panel)" stroke="#1e3030" strokeWidth="2" rx="3" />
      <rect x={width*0.76} y={height*0.38} width={width*0.18} height={height*0.3} fill="#0f1c1c" />

      {/* Equipment wall - right */}
      <rect x={width*0.82} y={height*0.1} width={width*0.18} height={height*0.25} fill="#141e1e" stroke="#1e3030" strokeWidth="1" />
      {/* Equipment panel displays */}
      {[0,1,2].map((i) => (
        <rect key={i} x={width*0.84} y={height*0.12+i*height*0.07} width={width*0.12} height={height*0.05}
          fill="#0a1414" stroke="#00b4aa" strokeWidth="1" strokeOpacity={0.3-i*0.05} />
      ))}
      <text x={width*0.845} y={height*0.16} fill="#00b4aa" fontSize="7" fontFamily="monospace" opacity="0.6">VITAL MONITOR</text>
      <text x={width*0.845} y={height*0.23} fill="#E87722" fontSize="7" fontFamily="monospace" opacity="0.6">STABLE</text>

      {/* Surgical arm overhead center */}
      <line x1={width*0.5} y1={height*0.1} x2={width*0.5} y2={height*0.3} stroke="#1e3030" strokeWidth="4" />
      <circle cx={width*0.5} cy={height*0.3} r={6} fill="#1e3030" stroke="#2a4040" strokeWidth="1" />
      <line x1={width*0.45} y1={height*0.3} x2={width*0.55} y2={height*0.3} stroke="#1e3030" strokeWidth="3" />
      <circle cx={width*0.45} cy={height*0.3} r={4} fill="#00b4aa" opacity="0.3" filter="url(#mb-glow)" />
      <circle cx={width*0.55} cy={height*0.3} r={4} fill="#00b4aa" opacity="0.3" filter="url(#mb-glow)" />

      {/* Cross symbol on wall */}
      <rect x={width*0.02} y={height*0.2} width={width*0.04} height={height*0.12} rx="2" fill="#1e3030" />
      <rect x={width*0.005} y={height*0.24} width={width*0.07} height={height*0.04} rx="2" fill="#1e3030" />

      {/* Teal ambient light from displays */}
      <radialGradient id="mb-teal" cx="50%" cy="75%" r="40%">
        <stop offset="0%" stopColor="#00b4aa" stopOpacity="0.04" />
        <stop offset="100%" stopColor="#0d1414" stopOpacity="0" />
      </radialGradient>
      <rect x={0} y={0} width={width} height={height} fill="url(#mb-teal)" />
    </svg>
  );
}
