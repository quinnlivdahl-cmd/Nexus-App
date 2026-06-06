export default function EngineeringCrawl({ width = 900, height = 600 }: { width?: number; height?: number }) {
  return (
    <svg width={width} height={height} viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="ec-glow"><feGaussianBlur stdDeviation="3" result="b"/><feComposite in="SourceGraphic" in2="b" operator="over"/></filter>
      </defs>
      <rect width={width} height={height} fill="#060808" />
      {/* Tight tunnel - top and bottom wall close together */}
      <rect x={0} y={0} width={width} height={height*0.22} fill="#0f1210" />
      <rect x={0} y={height*0.75} width={width} height={height*0.25} fill="#0d1010" />
      {/* Ribbed tunnel walls */}
      {[0.05,0.15,0.25,0.35,0.45,0.55,0.65,0.75,0.85,0.95].map((t,i)=>(
        <g key={i}>
          <rect x={t*width-8} y={0} width={16} height={height*0.22} fill="#141816" stroke="#1a2018" strokeWidth="1"/>
          <rect x={t*width-8} y={height*0.75} width={16} height={height*0.25} fill="#141816" stroke="#1a2018" strokeWidth="1"/>
        </g>
      ))}
      {/* Pipe runs along ceiling - multiple */}
      <line x1={0} y1={height*0.07} x2={width} y2={height*0.07} stroke="#1e2820" strokeWidth={8}/>
      <line x1={0} y1={height*0.12} x2={width} y2={height*0.12} stroke="#1e2820" strokeWidth={5}/>
      <line x1={0} y1={height*0.16} x2={width} y2={height*0.16} stroke="#182018" strokeWidth={3}/>
      {/* Pipe glow - coolant pipe */}
      <line x1={0} y1={height*0.12} x2={width} y2={height*0.12} stroke="#00b4aa" strokeWidth={1} strokeOpacity="0.2"/>
      {/* Pipe runs along floor */}
      <line x1={0} y1={height*0.8} x2={width} y2={height*0.8} stroke="#1e2820" strokeWidth={8}/>
      <line x1={0} y1={height*0.86} x2={width} y2={height*0.86} stroke="#182018" strokeWidth={5}/>
      {/* Crawl space interior */}
      <rect x={0} y={height*0.22} width={width} height={height*0.53} fill="#090b09" />
      {/* Perspective lines vanishing to center */}
      <polygon points={`0,${height*0.22} ${width*0.35},${height*0.35} ${width*0.35},${height*0.62} 0,${height*0.75}`} fill="#0c0f0c"/>
      <polygon points={`${width},${height*0.22} ${width*0.65},${height*0.35} ${width*0.65},${height*0.62} ${width},${height*0.75}`} fill="#0a0d0a"/>
      {/* Center passage opening */}
      <rect x={width*0.35} y={height*0.35} width={width*0.3} height={height*0.27} fill="#040605"/>
      {/* Far end indicator light */}
      <circle cx={width*0.5} cy={height*0.485} r={4} fill="#E87722" opacity="0.4" filter="url(#ec-glow)"/>
      {/* Maintenance labels on pipes */}
      <rect x={width*0.2} y={height*0.07-5} width={width*0.08} height={height*0.02} fill="#1a2818" stroke="#252e20" strokeWidth="1"/>
      <text x={width*0.21} y={height*0.082} fill="#E87722" fontSize="6" fontFamily="monospace" opacity="0.6">COOL-7B</text>
      <rect x={width*0.55} y={height*0.07-5} width={width*0.08} height={height*0.02} fill="#1a2818" stroke="#252e20" strokeWidth="1"/>
      <text x={width*0.56} y={height*0.082} fill="#00b4aa" fontSize="6" fontFamily="monospace" opacity="0.6">VENT-3A</text>
      {/* Tool hanging on wall */}
      <line x1={width*0.08} y1={height*0.25} x2={width*0.08} y2={height*0.45} stroke="#252e20" strokeWidth={4}/>
      <rect x={width*0.06} y={height*0.4} width={width*0.04} height={height*0.04} fill="#1e2818" stroke="#252e20" strokeWidth="1" rx="1"/>
      {/* Work light - battery powered, clamped */}
      <circle cx={width*0.85} cy={height*0.35} r={6} fill="#E87722" opacity="0.6" filter="url(#ec-glow)"/>
      <polygon points={`${width*0.85},${height*0.35} ${width*0.75},${height*0.6} ${width*0.95},${height*0.6}`} fill="#E87722" opacity="0.02"/>
      {/* Scuff marks / boot prints on floor pipe */}
      {[0.2,0.35,0.5,0.65].map((t,i)=>(
        <ellipse key={i} cx={t*width} cy={height*0.8} rx={8} ry={4} fill="#0f1210" opacity="0.7"/>
      ))}
      {/* Status indicator strip - red warning */}
      <rect x={0} y={height*0.22} width={width} height={height*0.015} fill="#200800" opacity="0.6"/>
      <rect x={0} y={height*0.735} width={width} height={height*0.015} fill="#200800" opacity="0.6"/>
    </svg>
  );
}
