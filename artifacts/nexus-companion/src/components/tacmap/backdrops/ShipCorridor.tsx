export default function ShipCorridor({ width = 900, height = 600 }: { width?: number; height?: number }) {
  return (
    <svg width={width} height={height} viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sc-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a1a1a" />
          <stop offset="100%" stopColor="#0d0d0d" />
        </linearGradient>
        <linearGradient id="sc-ceiling" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0d0d0d" />
          <stop offset="100%" stopColor="#1a1a1a" />
        </linearGradient>
        <linearGradient id="sc-wall" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#141414" />
          <stop offset="30%" stopColor="#222222" />
          <stop offset="70%" stopColor="#1e1e1e" />
          <stop offset="100%" stopColor="#111111" />
        </linearGradient>
        <filter id="sc-glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Background void */}
      <rect width={width} height={height} fill="#080808" />

      {/* Floor */}
      <polygon points={`0,${height} ${width},${height} ${width*0.75},${height*0.6} ${width*0.25},${height*0.6}`} fill="url(#sc-floor)" />

      {/* Ceiling */}
      <polygon points={`0,0 ${width},0 ${width*0.75},${height*0.4} ${width*0.25},${height*0.4}`} fill="url(#sc-ceiling)" />

      {/* Left wall */}
      <polygon points={`0,0 ${width*0.25},${height*0.4} ${width*0.25},${height*0.6} 0,${height}`} fill="#161616" />

      {/* Right wall */}
      <polygon points={`${width},0 ${width*0.75},${height*0.4} ${width*0.75},${height*0.6} ${width},${height}`} fill="#131313" />

      {/* Corridor tunnel vanishing point */}
      <polygon points={`${width*0.25},${height*0.4} ${width*0.75},${height*0.4} ${width*0.75},${height*0.6} ${width*0.25},${height*0.6}`} fill="#0f0f0f" />

      {/* Structural ribs - left wall */}
      {[0.15, 0.35, 0.55, 0.75, 0.9].map((t, i) => (
        <line key={i}
          x1={t * width * 0.25} y1={t * height}
          x2={width * 0.25 + (1 - t) * 0} y2={t < 0.5 ? height * 0.4 : height * 0.6}
          stroke="#2a2a2a" strokeWidth="8" strokeLinecap="round"
        />
      ))}

      {/* Structural ribs - right wall */}
      {[0.15, 0.35, 0.55, 0.75, 0.9].map((t, i) => (
        <line key={i}
          x1={width - t * width * 0.25} y1={t * height}
          x2={width * 0.75} y2={t < 0.5 ? height * 0.4 : height * 0.6}
          stroke="#252525" strokeWidth="8" strokeLinecap="round"
        />
      ))}

      {/* Overhead light strip - center */}
      <rect x={width*0.43} y={height*0.38} width={width*0.14} height={height*0.04} rx="2" fill="#1a1a1a" />
      <rect x={width*0.44} y={height*0.39} width={width*0.12} height={height*0.02} rx="1" fill="#E87722" opacity="0.7" filter="url(#sc-glow)" />

      {/* Ceiling light strip extending back */}
      <polygon points={`${width*0.44},${height*0.05} ${width*0.56},${height*0.05} ${width*0.56},${height*0.39} ${width*0.44},${height*0.39}`} fill="#1a120a" opacity="0.6" />

      {/* Floor center stripe */}
      <polygon points={`${width*0.42},${height*0.6} ${width*0.58},${height*0.6} ${width*0.55},${height*1} ${width*0.45},${height*1}`} fill="#1a1a1a" />
      <polygon points={`${width*0.445},${height*0.61} ${width*0.555},${height*0.61} ${width*0.525},${height*0.98} ${width*0.475},${height*0.98}`} fill="#1d120a" opacity="0.5" />

      {/* Warning stripes on floor - left */}
      {[0, 1, 2, 3].map((i) => (
        <rect key={i}
          x={i * width * 0.06 + 20}
          y={height * 0.78}
          width={width * 0.03}
          height={20}
          fill={i % 2 === 0 ? '#E87722' : '#1a1a1a'}
          opacity="0.5"
          transform={`skewX(-20)`}
        />
      ))}

      {/* Warning stripes on floor - right */}
      {[0, 1, 2, 3].map((i) => (
        <rect key={i}
          x={width * 0.75 + i * width * 0.06 - 80}
          y={height * 0.78}
          width={width * 0.03}
          height={20}
          fill={i % 2 === 0 ? '#E87722' : '#1a1a1a'}
          opacity="0.5"
          transform={`skewX(-20)`}
        />
      ))}

      {/* Pipe runs - top left wall */}
      <line x1="0" y1={height*0.12} x2={width*0.25} y2={height*0.42} stroke="#333" strokeWidth="6" />
      <line x1="0" y1={height*0.18} x2={width*0.25} y2={height*0.44} stroke="#2a2a2a" strokeWidth="4" />

      {/* Pipe runs - top right wall */}
      <line x1={width} y1={height*0.12} x2={width*0.75} y2={height*0.42} stroke="#333" strokeWidth="6" />
      <line x1={width} y1={height*0.18} x2={width*0.75} y2={height*0.44} stroke="#2a2a2a" strokeWidth="4" />

      {/* Small indicator lights - left */}
      {[0.2, 0.45, 0.7].map((t, i) => (
        <circle key={i} cx={t * width * 0.22 + 15} cy={height*0.45} r="3"
          fill={i === 1 ? '#ff4444' : '#00b4aa'} opacity="0.8" filter="url(#sc-glow)" />
      ))}

      {/* Small indicator lights - right */}
      {[0.2, 0.45, 0.7].map((t, i) => (
        <circle key={i} cx={width - t * width * 0.22 - 15} cy={height*0.45} r="3"
          fill={i === 0 ? '#ff4444' : '#00b4aa'} opacity="0.8" filter="url(#sc-glow)" />
      ))}

      {/* Junction door far end */}
      <rect x={width*0.42} y={height*0.43} width={width*0.16} height={height*0.14} rx="2" fill="#1a1a1a" stroke="#2a2a2a" strokeWidth="2" />
      <rect x={width*0.44} y={height*0.44} width={width*0.12} height={height*0.12} rx="1" fill="#111" />
      <line x1={width*0.5} y1={height*0.44} x2={width*0.5} y2={height*0.56} stroke="#222" strokeWidth="2" />

      {/* Hazard tape near door */}
      <rect x={width*0.415} y={height*0.54} width={width*0.17} height={height*0.02} fill="#1a1a1a" />
      {[0,1,2,3,4,5,6,7].map((i) => (
        <rect key={i} x={width*0.415 + i*width*0.02} y={height*0.54}
          width={width*0.01} height={height*0.02}
          fill={i%2===0?'#E87722':'#1a1a1a'} opacity="0.7" />
      ))}

      {/* Atmospheric haze toward vanishing point */}
      <radialGradient id="sc-haze" cx="50%" cy="50%" r="20%">
        <stop offset="0%" stopColor="#1a1208" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#080808" stopOpacity="0" />
      </radialGradient>
      <ellipse cx={width*0.5} cy={height*0.5} rx={width*0.1} ry={height*0.08} fill="url(#sc-haze)" />
    </svg>
  );
}
