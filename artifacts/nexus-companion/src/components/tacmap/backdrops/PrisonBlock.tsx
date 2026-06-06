export default function PrisonBlock({ width = 900, height = 600 }: { width?: number; height?: number }) {
  return (
    <svg width={width} height={height} viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="pb-glow"><feGaussianBlur stdDeviation="3" result="b"/><feComposite in="SourceGraphic" in2="b" operator="over"/></filter>
      </defs>
      <rect width={width} height={height} fill="#090a0c" />
      <rect x={0} y={0} width={width} height={height*0.07} fill="#0f1014"/>
      <rect x={0} y={height*0.87} width={width} height={height*0.13} fill="#0c0d10"/>
      {/* Central walkway */}
      <rect x={width*0.3} y={height*0.07} width={width*0.4} height={height*0.8} fill="#0c0d12"/>
      {/* Cell block - left row */}
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <rect x={0} y={height*0.07+i*height*0.16} width={width*0.3} height={height*0.16} fill="#0f1014" stroke="#191b20" strokeWidth="2"/>
          {/* Cell bars */}
          {[0.05,0.1,0.15,0.2,0.25].map((t,j)=>(
            <line key={j} x1={width*t} y1={height*0.07+i*height*0.16} x2={width*t} y2={height*0.07+(i+1)*height*0.16} stroke="#1e2028" strokeWidth="3"/>
          ))}
          <line x1={0} y1={height*(0.07+i*0.16)} x2={width*0.3} y2={height*(0.07+i*0.16)} stroke="#191b20" strokeWidth="2"/>
          {/* Cell contents */}
          <rect x={width*0.02} y={height*(0.1+i*0.16)} width={width*0.1} height={height*0.06} fill="#141620" rx="2" stroke="#191b20" strokeWidth="1"/>
        </g>
      ))}
      {/* Cell block - right row */}
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <rect x={width*0.7} y={height*0.07+i*height*0.16} width={width*0.3} height={height*0.16} fill="#0f1014" stroke="#191b20" strokeWidth="2"/>
          {[0.75,0.8,0.85,0.9,0.95].map((t,j)=>(
            <line key={j} x1={width*t} y1={height*0.07+i*height*0.16} x2={width*t} y2={height*0.07+(i+1)*height*0.16} stroke="#1e2028" strokeWidth="3"/>
          ))}
          <line x1={width*0.7} y1={height*(0.07+i*0.16)} x2={width} y2={height*(0.07+i*0.16)} stroke="#191b20" strokeWidth="2"/>
        </g>
      ))}
      {/* Guard catwalk above */}
      <rect x={width*0.28} y={height*0.07} width={width*0.44} height={height*0.04} fill="#141620" stroke="#1e2028" strokeWidth="1"/>
      {/* Guard booth - far end */}
      <rect x={width*0.38} y={height*0.08} width={width*0.24} height={height*0.12} fill="#0f1014" stroke="#191b20" strokeWidth="2"/>
      <rect x={width*0.4} y={height*0.09} width={width*0.2} height={height*0.08} fill="#060810" stroke="#00b4aa" strokeWidth="1" strokeOpacity="0.3"/>
      {/* Display in booth */}
      {[0,1,2,3].map((i)=>(
        <rect key={i} x={width*0.41+i*width*0.04} y={height*0.1} width={width*0.03} height={height*0.06} fill="#00b4aa" opacity={0.06+i*0.02} stroke="#00b4aa" strokeWidth="1" strokeOpacity="0.2"/>
      ))}
      {/* Floor center line */}
      <line x1={width*0.5} y1={height*0.07} x2={width*0.5} y2={height*0.87} stroke="#191b20" strokeWidth="2" strokeDasharray="20 10"/>
      {/* Red alert lights along ceiling */}
      {[0.32, 0.42, 0.52, 0.62, 0.72].map((t,i)=>(
        <circle key={i} cx={t*width} cy={height*0.08} r={4} fill="#ff2200" opacity={i===2?0.9:0.4} filter={i===2?"url(#pb-glow)":undefined}/>
      ))}
      {/* Cell ID plates */}
      {[0,1,2,3,4].map((i)=>(
        <g key={i}>
          <rect x={width*0.28} y={height*(0.09+i*0.16)} width={width*0.025} height={height*0.04} fill="#0c0d10" stroke="#191b20" strokeWidth="1"/>
          <text x={width*0.281} y={height*(0.115+i*0.16)} fill="#ff2200" fontSize="5" fontFamily="monospace" opacity="0.6">C-{`0${i+1}`}</text>
        </g>
      ))}
      {/* Occupied cell indicator */}
      <circle cx={width*0.28} cy={height*0.25} r={3} fill="#E87722" opacity="0.8" filter="url(#pb-glow)"/>
      <circle cx={width*0.28} cy={height*0.57} r={3} fill="#E87722" opacity="0.8" filter="url(#pb-glow)"/>
      {/* Emergency override panel */}
      <rect x={width*0.32} y={height*0.78} width={width*0.08} height={height*0.06} fill="#14040c" stroke="#cc0044" strokeWidth="1" strokeOpacity="0.5"/>
      <text x={width*0.325} y={height*0.82} fill="#cc0044" fontSize="6" fontFamily="monospace" opacity="0.6">CELL OVERRIDE</text>
    </svg>
  );
}
