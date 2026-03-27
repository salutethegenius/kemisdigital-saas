type StackLogoProps = {
  inverted?: boolean;
  width?: number;
  wordmark?: string;
};

export default function StackLogo({
  inverted = false,
  width = 200,
  wordmark = "KemisDigital",
}: StackLogoProps) {
  const primary = inverted ? "#FFFFFF" : "#0A1628";
  const secondary = "#0066FF";
  const muted = inverted ? "rgba(255,255,255,0.35)" : "rgba(10,22,40,0.35)";

  return (
    <svg
      width={width}
      height={36}
      viewBox="0 0 220 40"
      fill="none"
      role="img"
      aria-label={wordmark}
    >
      <rect x="0" y="0" width="36" height="9" rx="2.5" fill={primary} />
      <rect x="0" y="14" width="28" height="9" rx="2.5" fill={secondary} />
      <rect x="0" y="28" width="18" height="9" rx="2.5" fill={muted} />
      <text
        x="48"
        y="28"
        fontFamily="'Plus Jakarta Sans', sans-serif"
        fontSize="21"
        fontWeight="800"
        fill={primary}
        letterSpacing="-0.6"
      >
        Kemis
        <tspan fill={secondary}>Digital</tspan>
      </text>
    </svg>
  );
}
