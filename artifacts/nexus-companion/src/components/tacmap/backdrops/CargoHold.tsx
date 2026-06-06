export default function CargoHold({ width = 900, height = 600 }: { width?: number; height?: number }) {
  return (
    <svg width={width} height={height} viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="ch-glow"><feGaussianBlur stdDeviation="3" result="b"/><feComposite in="SourceGraphic" in2="b" operator="over"/></filter>
      </defs>
      <rect width={width} height={height} fill="#0a0c0e" />
      {/* High ceiling - industrial bay */}
      <rect x={0} y={0} width={width} height={height*0.08} fill="#0f1318"/>
      {/* Overhead crane tracks */}
      <rect x={0} y={height*0.05} width={width} height={height*0.02} fill="#1a2028" stroke="#252e38" strokeWidth="1"/>
      <rect x={0} y={height*0.065} width={width} height={height*0.008} fill="#141c24"/>
      {/* Crane trolley */}
      <rect x={width*0.45} y={height*0.05} width={width*0.1} height={height*0.04} fill="#1a2028" stroke="#252e38" strokeWidth="1" rx="2"/>
      <line x1={width*0.5} y1={height*0.09} x2={width*0.5} y2={height*0.3} stroke="#252e38" strokeWidth="2"/>
      <rect x={width*0.46} y={height*0.28} width={width*0.08} height={height*0.04} fill="#1a2028" stroke="#252e38" strokeWidth="1"/>
      {/* Crane hooks */}
      {[0.47, 0.5, 0.53].map((t, i) => (
        <line key={i} x1={t*width} y1={height*0.32} x2={t*width} y2={height*0.36} stroke="#252e38" strokeWidth="2"/>
      ))}
      {/* Bay doors - right side */}
      <rect x={width*0.82} y={0} width={width*0.18} height={height} fill="#0d1118" stroke="#1a2028" strokeWidth="3"/>
      {/* Bay door tracks */}
      <line x1={width*0.82} y1={0} x2={width*0.82} y2={height} stroke="#1a2028" strokeWidth="4"/>
      <line x1={width*0.82} y1={height*0.5} x2={width} y2={height*0.5} stroke="#1a2028" strokeWidth="2"/>
      {/* Bay door warning */}
      {[...Array(6)].map((_,i)=>(
        <rect key={i} x={width*0.82} y={i*height/6} width={width*0.02} height={height/12}
          fill={i%2===0?'#E87722':'#1a1510'} opacity="0.5"/>
      ))}
      {/* Left wall storage rack */}
      <rect x={0} y={height*0.08} width={width*0.12} height={height*0.92} fill="#0f1318"/>
      {[0.2, 0.35, 0.5, 0.65].map((t,i)=>(
        <rect key={i} x={0} y={t*height} width={width*0.12} height={height*0.03} fill="#141c24" stroke="#1a2028" strokeWidth="1"/>
      ))}
      {/* Crates on rack */}
      {[0.12, 0.27, 0.42, 0.57].map((t,i)=>(
        <rect key={i} x={width*0.01} y={t*height} width={width*0.1} height={height*0.12} fill="#141c24" stroke="#1e2830" strokeWidth="1" rx="1"/>
      ))}
      {/* Cargo containers - floor */}
      {[0.15, 0.35, 0.55].map((cx, i) => (
        <g key={i}>
          <rect x={cx*width} y={height*0.55} width={width*0.15} height={height*0.35} fill="#141c24" stroke="#1e2830" strokeWidth="2" rx="2"/>
          <rect x={cx*width} y={height*0.55} width={width*0.15} height={height*0.05} fill="#1a2430" stroke="#1e2830" strokeWidth="1"/>
          {/* Container ID */}
          <text x={cx*width+width*0.015} y={height*0.61} fill="#E87722" fontSize="7" fontFamily="monospace" opacity="0.6">CNT-{`${i+1}${i*7+3}${i*3+8}`}</text>
          {/* Container panel lines */}
          <line x1={cx*width} y1={height*0.72} x2={cx*width+width*0.15} y2={height*0.72} stroke="#1e2830" strokeWidth="1"/>
        </g>
      ))}
      {/* Forklift - center */}
      <rect x={width*0.52} y={height*0.68} width={width*0.1} height={height*0.12} fill="#1a2028" stroke="#252e38" strokeWidth="1" rx="2"/>
      <rect x={width*0.51} y={height*0.64} width={width*0.04} height={height*0.04} fill="#1a2028" stroke="#252e38" strokeWidth="1"/>
      <circle cx={width*0.54} cy={height*0.8} r={8} fill="#252e38"/>
      <circle cx={width*0.61} cy={height*0.8} r={8} fill="#252e38"/>
      {/* Forklift forks */}
      <rect x={width*0.51} y={height*0.64} width={width*0.02} height={height*0.18} fill="#252e38"/>
      <rect x={width*0.54} y={height*0.64} width={width*0.02} height={height*0.18} fill="#252e38"/>
      {/* Work light */}
      <circle cx={width*0.25} cy={height*0.12} r={5} fill="#E87722" opacity="0.8" filter="url(#ch-glow)"/>
      <polygon points={`${width*0.25},${height*0.12} ${width*0.15},${height*0.8} ${width*0.35},${height*0.8}`} fill="#E87722" opacity="0.02"/>
      {/* Emergency EXIT sign */}
      <rect x={width*0.78} y={height*0.45} width={width*0.04} height={height*0.03} fill="#001200" stroke="#00ff44" strokeWidth="1" strokeOpacity="0.4"/>
      <text x={width*0.782} y={height*0.47} fill="#00ff44" fontSize="6" fontFamily="monospace" opacity="0.5">EXIT</text>
      {/* Floor line markings */}
      <line x1={width*0.12} y1={height*0.82} x2={width*0.82} y2={height*0.82} stroke="#1a2028" strokeWidth="2" strokeDasharray="20 10"/>
      <line x1={width*0.12} y1={height*0.52} x2={width*0.82} y2={height*0.52} stroke="#E87722" strokeWidth="1" strokeDasharray="15 8" strokeOpacity="0.3"/>
    </svg>
  );
}
