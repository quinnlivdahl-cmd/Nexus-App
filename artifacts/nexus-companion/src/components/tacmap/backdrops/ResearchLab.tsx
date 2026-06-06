export default function ResearchLab({ width = 900, height = 600 }: { width?: number; height?: number }) {
  return (
    <svg width={width} height={height} viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="rl-glow"><feGaussianBlur stdDeviation="3" result="b"/><feComposite in="SourceGraphic" in2="b" operator="over"/></filter>
      </defs>
      <rect width={width} height={height} fill="#08080e" />
      <rect x={0} y={0} width={width} height={height*0.08} fill="#0d0d18"/>
      <rect x={0} y={height*0.88} width={width} height={height*0.12} fill="#0a0a14"/>
      {/* Grid ceiling tiles */}
      {[...Array(8)].map((_,c)=>[...Array(1)].map((_,r)=>(
        <rect key={`${c}-${r}`} x={c*width/8} y={0} width={width/8-1} height={height*0.08-1} fill="#0f0f1a" stroke="#141428" strokeWidth="1"/>
      )))}
      {/* Ceiling light panels */}
      {[0.15, 0.4, 0.65, 0.87].map((t,i)=>(
        <rect key={i} x={t*width} y={height*0.01} width={width*0.1} height={height*0.055} rx="1" fill="#00b4aa" opacity="0.06" filter="url(#rl-glow)"/>
      ))}
      {/* White wall panels */}
      <rect x={0} y={height*0.08} width={width*0.08} height={height*0.8} fill="#0f0f18"/>
      <rect x={width*0.92} y={height*0.08} width={width*0.08} height={height*0.8} fill="#0f0f18"/>
      {/* Lab bench - left */}
      <rect x={width*0.08} y={height*0.55} width={width*0.28} height={height*0.33} fill="#0c0c16" stroke="#1a1a28" strokeWidth="2"/>
      <rect x={width*0.08} y={height*0.52} width={width*0.28} height={height*0.04} fill="#141428" stroke="#1e1e32" strokeWidth="1"/>
      {/* Lab equipment on bench */}
      {/* Microscope */}
      <rect x={width*0.1} y={height*0.4} width={width*0.04} height={height*0.12} fill="#141428" stroke="#1e1e32" strokeWidth="1"/>
      <ellipse cx={width*0.12} cy={height*0.4} rx={width*0.025} ry={height*0.03} fill="#0f0f1c" stroke="#1e1e32" strokeWidth="1"/>
      <circle cx={width*0.12} cy={height*0.37} r={5} fill="#00b4aa" opacity="0.3" filter="url(#rl-glow)"/>
      {/* Sample vials */}
      {[0,1,2,3,4].map((i)=>(
        <g key={i}>
          <rect x={width*0.18+i*width*0.024} y={height*0.45} width={width*0.018} height={height*0.06} rx="3" fill="#0a0a14" stroke="#00b4aa" strokeWidth="1" strokeOpacity="0.4"/>
          <rect x={width*0.18+i*width*0.024} y={height*0.48} width={width*0.018} height={height*0.02}
            fill={['#00b4aa','#E87722','#ff4444','#00b4aa','#8844aa'][i]} opacity="0.3"/>
        </g>
      ))}
      {/* Right bench */}
      <rect x={width*0.64} y={height*0.55} width={width*0.28} height={height*0.33} fill="#0c0c16" stroke="#1a1a28" strokeWidth="2"/>
      <rect x={width*0.64} y={height*0.52} width={width*0.28} height={height*0.04} fill="#141428" stroke="#1e1e32" strokeWidth="1"/>
      {/* Spectrometer on right bench */}
      <rect x={width*0.66} y={height*0.38} width={width*0.12} height={height*0.14} fill="#0f0f1c" stroke="#1e1e32" strokeWidth="1" rx="2"/>
      <rect x={width*0.67} y={height*0.4} width={width*0.1} height={height*0.08} fill="#060610" stroke="#00b4aa" strokeWidth="1" strokeOpacity="0.3"/>
      {/* Spectrometer display */}
      <polyline points={`${width*0.68},${height*0.47} ${width*0.69},${height*0.44} ${width*0.7},${height*0.46} ${width*0.71},${height*0.42} ${width*0.72},${height*0.46} ${width*0.73},${height*0.45} ${width*0.75},${height*0.43} ${width*0.76},${height*0.47}`}
        stroke="#00b4aa" strokeWidth="1.5" fill="none" opacity="0.6"/>
      {/* Central isolation chamber */}
      <rect x={width*0.38} y={height*0.12} width={width*0.24} height={height*0.38} fill="#060610" stroke="#00b4aa" strokeWidth="2" strokeOpacity="0.5" rx="3"/>
      <rect x={width*0.4} y={height*0.14} width={width*0.2} height={height*0.34} fill="#040408" stroke="#00b4aa" strokeWidth="1" strokeOpacity="0.2"/>
      {/* V-person scan readout - ominous */}
      <text x={width*0.41} y={height*0.2} fill="#00b4aa" fontSize="7" fontFamily="monospace" opacity="0.5">VOSS-SUBJECT-17</text>
      <text x={width*0.41} y={height*0.25} fill="#E87722" fontSize="7" fontFamily="monospace" opacity="0.5">NEURAL MAP: ACTIVE</text>
      <text x={width*0.41} y={height*0.3} fill="#ff4444" fontSize="6" fontFamily="monospace" opacity="0.4">LATTICE RESONANCE: 8.7</text>
      <text x={width*0.41} y={height*0.34} fill="#ff4444" fontSize="6" fontFamily="monospace" opacity="0.3">⚠ ANOMALY DETECTED</text>
      {/* Containment field glow */}
      <rect x={width*0.38} y={height*0.12} width={width*0.24} height={height*0.38} fill="#00b4aa" opacity="0.02" rx="3"/>
      {/* Lab chair */}
      <rect x={width*0.42} y={height*0.55} width={width*0.16} height={height*0.25} fill="#0d0d18" stroke="#141428" strokeWidth="1" rx="3"/>
      <rect x={width*0.44} y={height*0.52} width={width*0.12} height={height*0.05} rx="2" fill="#141428"/>
      {/* Biohazard sign */}
      <circle cx={width*0.5} cy={height*0.86} r={12} fill="#1a0a00" stroke="#E87722" strokeWidth="1" strokeOpacity="0.5"/>
      <text x={width*0.495} y={height*0.865} fill="#E87722" fontSize="9" fontFamily="monospace" opacity="0.5" textAnchor="middle">☣</text>
      {/* Teal ambient from chamber */}
      <radialGradient id="rl-amb" cx="50%" cy="35%" r="25%">
        <stop offset="0%" stopColor="#00b4aa" stopOpacity="0.04"/>
        <stop offset="100%" stopColor="#08080e" stopOpacity="0"/>
      </radialGradient>
      <rect x={0} y={0} width={width} height={height} fill="url(#rl-amb)"/>
    </svg>
  );
}
