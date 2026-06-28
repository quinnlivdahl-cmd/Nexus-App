export default function OrbitalApproach({ width = 900, height = 600 }: { width?: number; height?: number }) {
  return (
    <svg width={width} height={height} viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="oa-planet" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1a3a5a" />
          <stop offset="70%" stopColor="#0d2040" />
          <stop offset="100%" stopColor="#05101e" />
        </radialGradient>
        <filter id="oa-glow"><feGaussianBlur stdDeviation="5" result="b"/><feComposite in="SourceGraphic" in2="b" operator="over"/></filter>
      </defs>
      <rect width={width} height={height} fill="#020408" />
      {/* Dense star field */}
      {[...Array(80)].map((_,i)=>(
        <circle key={i} cx={(i*173+20)%width} cy={(i*97+10)%height} r={i%10===0?1.5:i%5===0?1:0.6} fill="#ddd" opacity={0.08+(i%8)*0.03}/>
      ))}
      {/* Distant nebula */}
      <ellipse cx={width*0.1} cy={height*0.2} rx={width*0.2} ry={height*0.15} fill="#1a0a2a" opacity="0.3"/>
      <ellipse cx={width*0.12} cy={height*0.22} rx={width*0.15} ry={height*0.1} fill="#2a0a3a" opacity="0.15"/>
      {/* Large planet - Europa or Jupiter */}
      <ellipse cx={width*0.7} cy={height*0.6} rx={width*0.5} ry={height*0.6} fill="url(#oa-planet)" opacity="0.8"/>
      {/* Planet atmospheric rim */}
      <ellipse cx={width*0.7} cy={height*0.6} rx={width*0.5} ry={height*0.6} fill="none" stroke="#2a6090" strokeWidth="3" opacity="0.3"/>
      <ellipse cx={width*0.7} cy={height*0.6} rx={width*0.51} ry={height*0.61} fill="none" stroke="#1a4070" strokeWidth="6" opacity="0.1"/>
      {/* Planet surface features */}
      <line x1={width*0.22} y1={height*0.3} x2={width*0.9} y2={height*0.4} stroke="#1a3060" strokeWidth="4" opacity="0.4"/>
      <line x1={width*0.25} y1={height*0.45} x2={width*0.85} y2={height*0.52} stroke="#152844" strokeWidth="3" opacity="0.3"/>
      <path d={`M ${width*0.3} ${height*0.2} Q ${width*0.5} ${height*0.18} ${width*0.7} ${height*0.22} Q ${width*0.85} ${height*0.25} ${width*0.9} ${height*0.32}`}
        stroke="#0d2840" strokeWidth="5" fill="none" opacity="0.3"/>
      {/* Station structure - left foreground */}
      <rect x={0} y={height*0.15} width={width*0.06} height={height*0.5} fill="#14181e" stroke="#1e2430" strokeWidth="1"/>
      <rect x={width*0.06} y={height*0.28} width={width*0.18} height={height*0.04} fill="#14181e" stroke="#1e2430" strokeWidth="1"/>
      {/* Solar panels on station */}
      <rect x={0} y={height*0.1} width={width*0.08} height={height*0.05} fill="#0a1428" stroke="#1e3050" strokeWidth="1"/>
      <rect x={0} y={height*0.65} width={width*0.08} height={height*0.05} fill="#0a1428" stroke="#1e3050" strokeWidth="1"/>
      {/* Solar panel cells */}
      {[0,1,2,3].map((i)=>(
        <rect key={i} x={i*width*0.02} y={height*0.1} width={width*0.019} height={height*0.05} fill="none" stroke="#0e1e3a" strokeWidth="0.5"/>
      ))}
      {/* Ship approaching */}
      <g transform={`translate(${width*0.25},${height*0.35})`}>
        <polygon points={`0,-8 12,0 0,6 -4,2 -4,-3`} fill="#141820" stroke="#1e2430" strokeWidth="1.5"/>
        <polygon points={`-4,0 -15,8 -12,0 -15,-8`} fill="#141820" stroke="#1e2430" strokeWidth="1"/>
        <polygon points={`-4,0 -15,-8 -12,0 -15,8`} fill="#0f1418" stroke="#1e2430" strokeWidth="1"/>
        {/* Engine glow */}
        <ellipse cx={-14} cy={0} rx={5} ry={3} fill="#E87722" opacity="0.6" filter="url(#oa-glow)"/>
      </g>
      {/* Navigation beacon */}
      <circle cx={width*0.45} cy={height*0.15} r={4} fill="#E87722" opacity="0.9" filter="url(#oa-glow)"/>
      <circle cx={width*0.45} cy={height*0.15} r={12} fill="none" stroke="#E87722" strokeWidth="1" strokeOpacity="0.3"/>
      {/* Comms chatter display overlay - HUD */}
      <rect x={width*0.02} y={height*0.68} width={width*0.2} height={height*0.12} fill="#060810" stroke="#1e2840" strokeWidth="1" fillOpacity="0.7"/>
      <text x={width*0.03} y={height*0.72} fill="#00b4aa" fontSize="6" fontFamily="monospace" opacity="0.7">TARGET NODE :: 847 km</text>
      <text x={width*0.03} y={height*0.76} fill="#E87722" fontSize="6" fontFamily="monospace" opacity="0.7">APPROACH: DARK RUN</text>
      <text x={width*0.03} y={height*0.79} fill="#ff4444" fontSize="5" fontFamily="monospace" opacity="0.5">TRACE MONITOR: ACTIVE</text>
      {/* Orbit track arc */}
      <path d={`M ${width*0.1} ${height*0.05} Q ${width*0.5} ${height*0.02} ${width*0.9} ${height*0.1}`}
        stroke="#1e2840" strokeWidth="1.5" fill="none" strokeDasharray="8 6" opacity="0.4"/>
      {/* Stars through station viewport hint */}
      <circle cx={width*0.82} cy={height*0.08} r={20} fill="#060810" stroke="#1e2430" strokeWidth="2"/>
      <circle cx={width*0.82} cy={height*0.08} r={16} fill="#020408"/>
      {[...Array(5)].map((_,i)=>(
        <circle key={i} cx={width*0.82+(i*31%26-13)} cy={height*0.08+(i*17%22-11)} r={0.8} fill="#ccc" opacity="0.3"/>
      ))}
    </svg>
  );
}
