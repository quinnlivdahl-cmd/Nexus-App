export default function HabModule({ width = 900, height = 600 }: { width?: number; height?: number }) {
  return (
    <svg width={width} height={height} viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="hm-glow"><feGaussianBlur stdDeviation="3" result="b"/><feComposite in="SourceGraphic" in2="b" operator="over"/></filter>
      </defs>
      <rect width={width} height={height} fill="#0c0e12" />
      {/* Wall panels */}
      <rect x={0} y={0} width={width*0.14} height={height} fill="#101418" />
      <rect x={width*0.86} y={0} width={width*0.14} height={height} fill="#101418" />
      {/* Ceiling */}
      <rect x={0} y={0} width={width} height={height*0.1} fill="#101418" />
      {/* Floor */}
      <rect x={0} y={height*0.86} width={width} height={height*0.14} fill="#101418" />
      {/* Panel lines */}
      {[0.2, 0.35, 0.5, 0.65, 0.8].map((t,i)=> <line key={i} x1={0} y1={t*height} x2={width*0.14} y2={t*height} stroke="#161a20" strokeWidth="1"/>)}
      {[0.2, 0.35, 0.5, 0.65, 0.8].map((t,i)=> <line key={i} x1={width*0.86} y1={t*height} x2={width} y2={t*height} stroke="#161a20" strokeWidth="1"/>)}
      {/* Bunks - left */}
      <rect x={width*0.14} y={height*0.12} width={width*0.2} height={height*0.35} fill="#131820" stroke="#1e2430" strokeWidth="1"/>
      <rect x={width*0.14} y={height*0.48} width={width*0.2} height={height*0.35} fill="#131820" stroke="#1e2430" strokeWidth="1"/>
      {/* Bunk mattress */}
      <rect x={width*0.15} y={height*0.14} width={width*0.18} height={height*0.3} rx="2" fill="#181e2a" stroke="#1e2430" strokeWidth="1"/>
      <rect x={width*0.15} y={height*0.5} width={width*0.18} height={height*0.3} rx="2" fill="#181e2a" stroke="#1e2430" strokeWidth="1"/>
      {/* Personal items shelf */}
      <rect x={width*0.14} y={height*0.44} width={width*0.2} height={height*0.04} fill="#161c28" stroke="#1e2430" strokeWidth="1"/>
      <circle cx={width*0.18} cy={height*0.46} r={3} fill="#E87722" opacity="0.5"/>
      <rect x={width*0.22} y={height*0.445} width={width*0.06} height={height*0.03} fill="#1a2030" rx="1"/>
      {/* Terminal/screen - right wall */}
      <rect x={width*0.68} y={height*0.2} width={width*0.18} height={height*0.4} fill="#0c1018" stroke="#1e2430" strokeWidth="2" rx="2"/>
      <rect x={width*0.69} y={height*0.22} width={width*0.16} height={height*0.36} fill="#060810" stroke="#00b4aa" strokeWidth="1" strokeOpacity="0.3"/>
      {/* Screen content */}
      {[0.25, 0.32, 0.39, 0.46, 0.53].map((t,i)=> (
        <rect key={i} x={width*0.7} y={t*height} width={(0.5+Math.sin(i*2.1)*0.3)*width*0.12} height={height*0.018} fill="#00b4aa" opacity={0.15+(i%3)*0.05} rx="1"/>
      ))}
      <text x={width*0.7} y={height*0.25} fill="#00b4aa" fontSize="7" fontFamily="monospace" opacity="0.5">PERSONAL LOG :: ENCRYPTED</text>
      {/* Ceiling light */}
      <rect x={width*0.35} y={height*0.08} width={width*0.3} height={height*0.025} rx="2" fill="#1e2430"/>
      <rect x={width*0.37} y={height*0.085} width={width*0.26} height={height*0.012} fill="#8090a0" opacity="0.25" filter="url(#hm-glow)"/>
      {/* Personal photos / pin board */}
      <rect x={width*0.36} y={height*0.12} width={width*0.28} height={height*0.2} fill="#101820" stroke="#1e2430" strokeWidth="1"/>
      {[0,1,2,3,4,5].map((i)=> (
        <rect key={i} x={width*0.37+i%3*width*0.08} y={height*0.13+(i>2?height*0.09:0)} width={width*0.07} height={height*0.08} fill="#141c28" stroke="#1e2c3a" strokeWidth="1" rx="1"/>
      ))}
      {/* Foot locker */}
      <rect x={width*0.36} y={height*0.78} width={width*0.28} height={height*0.08} fill="#131820" stroke="#1e2430" strokeWidth="1" rx="2"/>
      <line x1={width*0.36} y1={height*0.82} x2={width*0.64} y2={height*0.82} stroke="#1e2430" strokeWidth="1"/>
      <circle cx={width*0.5} cy={height*0.82} r={3} fill="#1e2430"/>
      {/* Ambient warm light from bunk reading lamp */}
      <radialGradient id="hm-lamp" cx="20%" cy="35%" r="25%">
        <stop offset="0%" stopColor="#E87722" stopOpacity="0.05"/>
        <stop offset="100%" stopColor="#0c0e12" stopOpacity="0"/>
      </radialGradient>
      <rect x={0} y={0} width={width} height={height} fill="url(#hm-lamp)"/>
    </svg>
  );
}
