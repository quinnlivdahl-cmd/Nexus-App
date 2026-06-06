export default function IndustrialPlatform({ width = 900, height = 600 }: { width?: number; height?: number }) {
  return (
    <svg width={width} height={height} viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="ip-glow"><feGaussianBlur stdDeviation="4" result="b"/><feComposite in="SourceGraphic" in2="b" operator="over"/></filter>
        <linearGradient id="ip-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#040608" />
          <stop offset="100%" stopColor="#080c14" />
        </linearGradient>
      </defs>
      <rect width={width} height={height} fill="url(#ip-sky)" />
      {/* Stars */}
      {[...Array(35)].map((_,i)=>(
        <circle key={i} cx={(i*197)%width} cy={(i*113)%(height*0.5)} r={0.7} fill="#aaa" opacity={0.1+(i%5)*0.04}/>
      ))}
      {/* Far factory silhouette */}
      <rect x={0} y={height*0.35} width={width*0.15} height={height*0.65} fill="#0d1118"/>
      <rect x={width*0.05} y={height*0.2} width={width*0.04} height={height*0.15} fill="#0d1118"/>
      <rect x={width*0.82} y={height*0.3} width={width*0.18} height={height*0.7} fill="#0d1118"/>
      <rect x={width*0.88} y={height*0.15} width={width*0.04} height={height*0.15} fill="#0d1118"/>
      {/* Chimney stacks with amber glow */}
      <circle cx={width*0.07} cy={height*0.2} r={6} fill="#E87722" opacity="0.4" filter="url(#ip-glow)"/>
      <circle cx={width*0.9} cy={height*0.15} r={6} fill="#E87722" opacity="0.4" filter="url(#ip-glow)"/>
      {/* Main platform deck */}
      <rect x={0} y={height*0.6} width={width} height={height*0.1} fill="#141820" stroke="#1e2430" strokeWidth="2"/>
      <rect x={0} y={height*0.68} width={width} height={height*0.32} fill="#101418"/>
      {/* Grating detail on platform */}
      {[...Array(18)].map((_,i)=>(
        <line key={i} x1={i*width/17} y1={height*0.6} x2={i*width/17} y2={height*0.68} stroke="#1e2430" strokeWidth="1"/>
      ))}
      {/* Platform edge warning */}
      {[...Array(16)].map((_,i)=>(
        <rect key={i} x={i*width/16} y={height*0.6} width={width/32} height={height*0.015}
          fill={i%2===0?'#E87722':'#1a1510'} opacity="0.6"/>
      ))}
      {/* Heavy machinery - crane arm */}
      <rect x={width*0.4} y={height*0.1} width={width*0.04} height={height*0.5} fill="#1a2028" stroke="#252e38" strokeWidth="1"/>
      <rect x={width*0.2} y={height*0.12} width={width*0.24} height={width*0.025} fill="#1a2028" stroke="#252e38" strokeWidth="1"/>
      <line x1={width*0.38} y1={height*0.13} x2={width*0.3} y2={height*0.62} stroke="#252e38" strokeWidth="2"/>
      <rect x={width*0.27} y={height*0.56} width={width*0.06} height={height*0.08} fill="#1a2028" stroke="#252e38" strokeWidth="1"/>
      {/* Warning light on crane */}
      <circle cx={width*0.42} cy={height*0.1} r={5} fill="#E87722" opacity="0.9" filter="url(#ip-glow)"/>
      {/* Processing tanks */}
      <ellipse cx={width*0.65} cy={height*0.52} rx={width*0.07} ry={height*0.1} fill="#141820" stroke="#1e2430" strokeWidth="2"/>
      <rect x={width*0.58} y={height*0.3} width={width*0.14} height={height*0.22} fill="#141820" stroke="#1e2430" strokeWidth="2"/>
      <ellipse cx={width*0.65} cy={height*0.3} rx={width*0.07} ry={height*0.04} fill="#1e2430"/>
      {/* Tank level indicator */}
      <rect x={width*0.71} y={height*0.35} width={width*0.015} height={height*0.15} fill="#0a1018" stroke="#1e2430" strokeWidth="1"/>
      <rect x={width*0.71} y={height*0.42} width={width*0.015} height={height*0.08} fill="#00b4aa" opacity="0.4"/>
      {/* Walkway bridge */}
      <rect x={width*0.18} y={height*0.55} width={width*0.15} height={height*0.05} fill="#1a2028" stroke="#252e38" strokeWidth="1"/>
      <line x1={width*0.2} y1={height*0.5} x2={width*0.2} y2={height*0.6} stroke="#252e38" strokeWidth="3"/>
      <line x1={width*0.31} y1={height*0.5} x2={width*0.31} y2={height*0.6} stroke="#252e38" strokeWidth="3"/>
      <line x1={width*0.2} y1={height*0.5} x2={width*0.31} y2={height*0.5} stroke="#252e38" strokeWidth="2"/>
      {/* Steam/exhaust vents */}
      <ellipse cx={width*0.15} cy={height*0.58} rx={width*0.015} ry={height*0.005} fill="#aaa" opacity="0.1"/>
      <ellipse cx={width*0.15} cy={height*0.55} rx={width*0.02} ry={height*0.008} fill="#aaa" opacity="0.06"/>
      {/* Status boards */}
      <rect x={width*0.8} y={height*0.35} width={width*0.08} height={height*0.12} fill="#0f1420" stroke="#1e2430" strokeWidth="1"/>
      <text x={width*0.81} y={height*0.4} fill="#E87722" fontSize="7" fontFamily="monospace" opacity="0.7">SECTOR 7G</text>
      <text x={width*0.81} y={height*0.44} fill="#00b4aa" fontSize="7" fontFamily="monospace" opacity="0.6">ACTIVE</text>
    </svg>
  );
}
