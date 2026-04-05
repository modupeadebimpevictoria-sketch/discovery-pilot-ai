interface FindrLogoProps {
  size?: number;
  darkBackground?: boolean;
  className?: string;
}

export default function FindrLogo({ size = 40, darkBackground, className = "" }: FindrLogoProps) {
  // On dark backgrounds: stripes become off-white and outer ring becomes white
  // Auto-detect: if darkBackground is undefined, we use CSS to handle both
  const ringColor = darkBackground ? "#F5F5F0" : "#1A1A1A";
  const stripeDark = darkBackground ? "#F5F5F0" : "#1A1A1A";
  const stripeLight = darkBackground ? "#3A3A3A" : "#F5F5F0";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <pattern
          id={`stripes-${size}`}
          patternUnits="userSpaceOnUse"
          width="12"
          height="12"
          patternTransform="rotate(45)"
        >
          <rect width="6" height="12" fill={stripeDark} />
          <rect x="6" width="6" height="12" fill={stripeLight} />
        </pattern>
        <clipPath id={`circle-clip-${size}`}>
          <circle cx="100" cy="100" r="88" />
        </clipPath>
      </defs>

      {/* Outer ring */}
      <circle cx="100" cy="100" r="96" fill={ringColor} />

      {/* Inner striped fill */}
      <circle cx="100" cy="100" r="88" fill={`url(#stripes-${size})`} clipPath={`url(#circle-clip-${size})`} />

      {/* Electric lime arc — springboard surface */}
      <path
        d="M 32 142 Q 100 172 168 142"
        stroke="#F06D5C"
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
