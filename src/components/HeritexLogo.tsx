import React from 'react';

interface HeritexLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  showSubtitle?: boolean;
  inverted?: boolean;
  withCircleBg?: boolean;
  className?: string;
  onClick?: () => void;
}

export const HeritexLogo: React.FC<HeritexLogoProps> = ({
  size = 'md',
  showSubtitle = true,
  inverted = false,
  withCircleBg = true,
  className = '',
  onClick,
}) => {
  const sizeMap = {
    sm: {
      svgSize: 34,
      fontSize: 'text-base',
      subSize: 'text-[9px]',
      gap: 'gap-2',
    },
    md: {
      svgSize: 44,
      fontSize: 'text-xl',
      subSize: 'text-[11px]',
      gap: 'gap-2.5',
    },
    lg: {
      svgSize: 56,
      fontSize: 'text-2xl',
      subSize: 'text-xs',
      gap: 'gap-3',
    },
    xl: {
      svgSize: 80,
      fontSize: 'text-4xl',
      subSize: 'text-sm',
      gap: 'gap-4',
    },
    '2xl': {
      svgSize: 120,
      fontSize: 'text-5xl',
      subSize: 'text-base',
      gap: 'gap-5',
    },
  };

  const current = sizeMap[size];

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center ${current.gap} ${onClick ? 'cursor-pointer select-none' : ''} ${className}`}
    >
      {/* Exact SVG Icon matched to user's uploaded logo */}
      <svg
        width={current.svgSize}
        height={current.svgSize}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0 drop-shadow-sm transition-transform hover:scale-105 duration-300"
      >
        <defs>
          {/* Gradients */}
          {/* Left Terracotta Pillar */}
          <linearGradient id="leftPillarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C95928" />
            <stop offset="50%" stopColor="#BD4F20" />
            <stop offset="100%" stopColor="#9C3B12" />
          </linearGradient>

          {/* Right Teal/Circuit Pillar */}
          <linearGradient id="rightPillarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0B423F" />
            <stop offset="50%" stopColor="#083735" />
            <stop offset="100%" stopColor="#052422" />
          </linearGradient>

          {/* Roof Gable Gradient */}
          <linearGradient id="roofGableGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#755644" />
            <stop offset="100%" stopColor="#543A2B" />
          </linearGradient>

          {/* X-Arm 1: Top-Left (Orange) to Bottom-Right (Orange-Brown) */}
          <linearGradient id="xArmTopLeftGrad" x1="20%" y1="20%" x2="80%" y2="80%">
            <stop offset="0%" stopColor="#C95928" />
            <stop offset="50%" stopColor="#9E4624" />
            <stop offset="100%" stopColor="#C45727" />
          </linearGradient>

          {/* X-Arm 2: Bottom-Left (Teal) to Top-Right (Orange-Brown) */}
          <linearGradient id="xArmBottomLeftGrad" x1="20%" y1="80%" x2="80%" y2="20%">
            <stop offset="0%" stopColor="#0A3E3C" />
            <stop offset="50%" stopColor="#1C4B47" />
            <stop offset="100%" stopColor="#B34B22" />
          </linearGradient>

          {/* Pin Aperture Copper Gradient */}
          <linearGradient id="copperPinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E09F87" />
            <stop offset="60%" stopColor="#C6765D" />
            <stop offset="100%" stopColor="#9C523C" />
          </linearGradient>

          {/* Soft Circle Background Gradient */}
          <linearGradient id="circleBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D9DAE7" />
            <stop offset="100%" stopColor="#C6C8DA" />
          </linearGradient>
        </defs>

        {/* Circular Periwinkle Background Badge (as in the uploaded design) */}
        {withCircleBg && (
          <circle
            cx="100"
            cy="100"
            r="96"
            fill="url(#circleBgGrad)"
            stroke="#B6B9CE"
            strokeWidth="1.5"
          />
        )}

        {/* --- Top Roof Gables (Brown Triangles) --- */}
        {/* Left Roof Triangle */}
        <polygon
          points="42,28 69,38 48,56"
          fill="url(#roofGableGrad)"
        />
        {/* Right Roof Triangle */}
        <polygon
          points="156,26 129,38 152,54"
          fill="url(#roofGableGrad)"
        />

        {/* --- Left Pillar (Terracotta Motif Column) --- */}
        <path
          d="M45 56 L71 39 V160 L45 174 Z"
          fill="url(#leftPillarGrad)"
        />
        {/* Decorative inner fold shadow */}
        <path
          d="M69 40 L71 39 V160 L69 161 Z"
          fill="#7E2C0B"
          opacity="0.5"
        />

        {/* Batik Traditional Floral 8-Point Rosettes on Left Pillar */}
        <g fill="#FBE1C8" opacity="0.95">
          {/* Functioning repeating floral pattern along Left Pillar */}
          {[62, 77, 92, 107, 122, 137, 152].map((y, idx) => (
            <g key={`flower-${idx}`} transform={`translate(58, ${y}) scale(0.68)`}>
              {/* Cardinal Petals */}
              <path d="M0 -8 C1 -5 3 -3 6 -3 C3 0 1 2 0 6 C-1 2 -3 0 -6 -3 C-3 -3 -1 -5 0 -8 Z" fill="#FCEBD9" />
              {/* Diagonal Petals */}
              <path d="M-5 -5 C-3 -4 -1 -2 -2 0 C-4 -1 -5 -3 -5 -5 Z" fill="#FCEBD9" opacity="0.9" />
              <path d="M5 -5 C3 -4 1 -2 2 0 C4 -1 5 -3 5 -5 Z" fill="#FCEBD9" opacity="0.9" />
              <path d="M-5 3 C-3 2 -1 1 -2 -1 C-4 0 -5 1 -5 3 Z" fill="#FCEBD9" opacity="0.9" />
              <path d="M5 3 C3 2 1 1 2 -1 C4 0 5 1 5 3 Z" fill="#FCEBD9" opacity="0.9" />
              {/* Rosette Petal Ornaments */}
              <circle cx="0" cy="-6" r="1" fill="#FFFFFF" />
              <circle cx="0" cy="4.5" r="1" fill="#FFFFFF" />
              <circle cx="-5" cy="-2" r="1" fill="#FFFFFF" />
              <circle cx="5" cy="-2" r="1" fill="#FFFFFF" />
              {/* Center Dot */}
              <circle cx="0" cy="-0.5" r="1.6" fill="#A83E16" />
              <circle cx="0" cy="-0.5" r="0.8" fill="#FFF4EB" />
            </g>
          ))}
        </g>

        {/* --- Center "X" Crossing Bands --- */}
        {/* Arm 1 (Top-Left to Bottom-Right) */}
        <path
          d="M71 72 Q95 95 129 160 L149 148 Q108 90 71 58 Z"
          fill="url(#xArmTopLeftGrad)"
        />

        {/* Arm 2 (Bottom-Left to Top-Right) */}
        <path
          d="M45 160 Q82 108 129 72 L129 58 Q85 96 68 152 Z"
          fill="url(#xArmBottomLeftGrad)"
        />

        {/* Center X Cross Overlap & Depth */}
        <path
          d="M85 86 Q100 100 115 116 Q100 128 85 86 Z"
          fill="#1E4744"
          opacity="0.4"
        />

        {/* --- Right Pillar (Teal/Dark Green Tech Circuit Column) --- */}
        <path
          d="M129 39 L155 56 V174 L129 160 Z"
          fill="url(#rightPillarGrad)"
        />
        {/* Decorative inner fold highlight */}
        <path
          d="M129 39 L131 40 V161 L129 160 Z"
          fill="#0F5B57"
          opacity="0.6"
        />

        {/* Technology Circuit Board Traces & Nodes on Right Pillar */}
        <g stroke="#C6EFEA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
          {/* Circuit line 1 - top vertical & pad */}
          <path d="M136 50 V68 L142 74 V84" />
          <circle cx="136" cy="50" r="1.8" fill="#C6EFEA" />
          <circle cx="142" cy="84" r="1.8" fill="#C6EFEA" />

          {/* Circuit line 2 - mid branches */}
          <path d="M148 58 V70 L142 76" />
          <circle cx="148" cy="58" r="1.8" fill="#C6EFEA" />

          {/* Circuit line 3 - long meandering trace */}
          <path d="M148 80 V98 L142 104 V116 L146 120 V138" />
          <circle cx="148" cy="80" r="1.8" fill="#C6EFEA" />
          <circle cx="146" cy="138" r="1.8" fill="#C6EFEA" />

          {/* Circuit line 4 - right edge trace */}
          <path d="M152 70 V88 L148 92" />
          <circle cx="152" cy="70" r="1.8" fill="#C6EFEA" />

          {/* Circuit line 5 - lower left trace */}
          <path d="M136 82 V104 L140 108" />
          <circle cx="136" cy="82" r="1.8" fill="#C6EFEA" />

          {/* Circuit line 6 - lower branch */}
          <path d="M136 122 V142 L142 148 V162" />
          <circle cx="136" cy="122" r="1.8" fill="#C6EFEA" />
          <circle cx="142" cy="162" r="1.8" fill="#C6EFEA" />

          {/* Circuit line 7 - bottom connector */}
          <path d="M148 146 V158" />
          <circle cx="148" cy="146" r="1.8" fill="#C6EFEA" />
          <circle cx="148" cy="158" r="1.8" fill="#C6EFEA" />
        </g>

        {/* --- Center Location Map Pin --- */}
        <g filter="drop-shadow(0px 2px 4px rgba(0,0,0,0.3))">
          {/* Dark Teal Pin Silhouette */}
          <path
            d="M100 44 C88 44 79 53 79 65 C79 79 100 99 100 99 C100 99 121 79 121 65 C121 53 112 44 100 44 Z"
            fill="#083835"
            stroke="#FFFFFF"
            strokeWidth="0.8"
          />
          {/* Warm Copper Metallic Center Aperture */}
          <circle
            cx="100"
            cy="63"
            r="7.5"
            fill="url(#copperPinGrad)"
            stroke="#5D2817"
            strokeWidth="0.6"
          />
          {/* Subtle Aperture Core Highlight */}
          <circle
            cx="98.5"
            cy="61.5"
            r="2"
            fill="#FFFFFF"
            opacity="0.4"
          />
        </g>
      </svg>

      {/* Brand Text */}
      <div className="flex flex-col">
        <div className="flex items-baseline leading-none font-bold tracking-tight">
          <span
            className={`font-sans tracking-wider font-extrabold ${current.fontSize} ${
              inverted ? 'text-white' : 'text-[#0D3B3A]'
            }`}
          >
            HERITE
          </span>
          <span
            className={`font-sans font-black ${current.fontSize} text-[#C85A32] ml-[1px]`}
          >
            X
          </span>
        </div>
        {showSubtitle && (
          <span
            className={`font-medium tracking-normal mt-0.5 whitespace-nowrap ${current.subSize} ${
              inverted ? 'text-stone-300' : 'text-[#4A5E5D]'
            }`}
          >
            Explore Heritage, Experience Technology
          </span>
        )}
      </div>
    </div>
  );
};

