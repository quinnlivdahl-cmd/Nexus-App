export default function CommandDeck({ width = 900, height = 600 }: { width?: number; height?: number }) {
  return (
    <svg width={width} height={height} viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="cd-glow"><feGaussianBlur stdDeviation="4" result="b"/><feComposite in="SourceGraphic" in2="b" operator="over"/></filter>
        <filter id="cd-glow2"><feGaussianBlur stdDeviation="2" result="b"/><feComposite in="SourceGraphic" in2="b" operator="over"/></filter>
      </defs>
      <rect width={width} height={height} fill="#050810" />

      {/* Main viewport - forward window */}
      <rect x={width*0.1} y={0} width={width*0.8} height={height*0.5} fill="#030510" />
      {/* Star field through viewport */}
      {[...Array(50)].map((_, i) => (
        <circle key={i} cx={width*0.1+(i*173)%(width*0.8)} cy={(i*97)%(height*0.5)} r={i%7===0?1.5:0.8} fill="#ccc" opacity={0.1+(i%6)*0.04} />
      ))}
      {/* Jupiter arc */}
      <ellipse cx={width*0.75} cy={-20} rx={80} ry={70} fill="#6B4E0A" opacity="0.3" />
      <ellipse cx={width*0.75} cy={-20} rx={80} ry={15} fill="none" stroke="#8B6914" strokeWidth="2" opacity="0.2" />

      {/* Viewport frame */}
      <rect x={width*0.08} y={0} width={width*0.84} height={height*0.52} fill="none" stroke="#1a2035" strokeWidth="6" />
      <rect x={width*0.1} y={0} width={width*0.8} height={height*0.52} fill="none" stroke="#2a3550" strokeWidth="2" />
      {/* Viewport struts */}
      <line x1={width*0.36} y1={0} x2={width*0.36} y2={height*0.52} stroke="#1a2035" strokeWidth="4" />
      <line x1={width*0.64} y1={0} x2={width*0.64} y2={height*0.52} stroke="#1a2035" strokeWidth="4" />

      {/* Console floor */}
      <polygon points={`0,${height} ${width},${height} ${width},${height*0.55} ${width*0.82},${height*0.52} ${width*0.18},${height*0.52} 0,${height*0.55}`} fill="#0d1220" />

      {/* Side walls */}
      <polygon points={`0,0 ${width*0.1},0 ${width*0.18},${height*0.52} 0,${height*0.55}`} fill="#0f1520" />
      <polygon points={`${width},0 ${width*0.9},0 ${width*0.82},${height*0.52} ${width},${height*0.55}`} fill="#0f1520" />

      {/* Main console arc */}
      <path d={`M ${width*0.05} ${height*0.95} Q ${width*0.5} ${height*0.55} ${width*0.95} ${height*0.95}`}
        fill="#131828" stroke="#1e2840" strokeWidth="2" />
      <path d={`M ${width*0.1} ${height*0.98} Q ${width*0.5} ${height*0.6} ${width*0.9} ${height*0.98}`}
        fill="#101520" stroke="#1a2238" strokeWidth="1" />

      {/* Console screen surfaces */}
      {[0.15, 0.28, 0.42, 0.56, 0.7, 0.83].map((t, i) => {
        const cx = t * width;
        const cy = height * 0.72 - Math.abs(t - 0.5) * height * 0.2;
        return (
          <g key={i}>
            <rect x={cx - width*0.055} y={cy - height*0.06} width={width*0.11} height={height*0.1}
              fill="#0a0f1c" stroke="#1e2840" strokeWidth="1" rx="2" transform={`rotate(${(t-0.5)*20}, ${cx}, ${cy})`} />
            <rect x={cx - width*0.045} y={cy - height*0.05} width={width*0.09} height={height*0.08}
              fill={i===2||i===3?'#00b4aa':'#0a0f1c'} opacity={i===2||i===3?0.1:0.8}
              stroke="#00b4aa" strokeWidth="1" strokeOpacity="0.2" rx="1"
              transform={`rotate(${(t-0.5)*20}, ${cx}, ${cy})`} />
          </g>
        );
      })}

      {/* Captain's chair - center */}
      <ellipse cx={width*0.5} cy={height*0.76} rx={width*0.05} ry={height*0.08} fill="#131828" stroke="#1e2840" strokeWidth="2" />
      <rect x={width*0.455} y={height*0.64} width={width*0.09} height={height*0.12} fill="#131828" stroke="#1e2840" strokeWidth="1" rx="3" />

      {/* Tactical overlay on center screen */}
      <rect x={width*0.36} y={height*0.55} width={width*0.28} height={height*0.2} fill="#070c18" stroke="#00b4aa" strokeWidth="1" strokeOpacity="0.4" rx="2" />
      <circle cx={width*0.5} cy={height*0.65} r={width*0.04} fill="none" stroke="#00b4aa" strokeWidth="1" strokeOpacity="0.3" />
      <circle cx={width*0.5} cy={height*0.65} r={width*0.07} fill="none" stroke="#00b4aa" strokeWidth="1" strokeOpacity="0.15" strokeDasharray="4 4" />
      <line x1={width*0.36} y1={height*0.65} x2={width*0.64} y2={height*0.65} stroke="#00b4aa" strokeWidth="0.5" strokeOpacity="0.2" />
      <line x1={width*0.5} y1={height*0.55} x2={width*0.5} y2={height*0.75} stroke="#00b4aa" strokeWidth="0.5" strokeOpacity="0.2" />
      <circle cx={width*0.5} cy={height*0.65} r={3} fill="#00b4aa" opacity="0.8" filter="url(#cd-glow)" />
      <circle cx={width*0.46} cy={height*0.62} r={2} fill="#E87722" opacity="0.7" filter="url(#cd-glow2)" />

      {/* HUD elements on viewport */}
      {/* Speed readout */}
      <rect x={width*0.12} y={height*0.04} width={width*0.12} height={height*0.12} fill="#050810" stroke="#1e2840" strokeWidth="1" fillOpacity="0.6" />
      <text x={width*0.13} y={height*0.09} fill="#00b4aa" fontSize="7" fontFamily="monospace" opacity="0.7">VEL: 0.4 km/s</text>
      <text x={width*0.13} y={height*0.14} fill="#E87722" fontSize="7" fontFamily="monospace" opacity="0.7">HDG: 042°</text>

      {/* Threat indicator */}
      <rect x={width*0.76} y={height*0.04} width={width*0.12} height={height*0.12} fill="#050810" stroke="#ff4444" strokeWidth="1" fillOpacity="0.6" strokeOpacity="0.4" />
      <text x={width*0.77} y={height*0.09} fill="#ff4444" fontSize="7" fontFamily="monospace" opacity="0.7">THREAT: MED</text>
      <text x={width*0.77} y={height*0.14} fill="#ff4444" fontSize="7" fontFamily="monospace" opacity="0.5">TRACE: ACT</text>

      {/* Indicator lights across console top */}
      {[0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8].map((t, i) => (
        <circle key={i} cx={t*width} cy={height*0.53} r={3}
          fill={i===3?'#ff4444':i%2===0?'#00b4aa':'#E87722'} opacity="0.8" filter="url(#cd-glow2)" />
      ))}

      {/* Ambient teal glow from screens */}
      <radialGradient id="cd-amb" cx="50%" cy="70%" r="50%">
        <stop offset="0%" stopColor="#00b4aa" stopOpacity="0.04" />
        <stop offset="100%" stopColor="#050810" stopOpacity="0" />
      </radialGradient>
      <rect x={0} y={0} width={width} height={height} fill="url(#cd-amb)" />
    </svg>
  );
}
