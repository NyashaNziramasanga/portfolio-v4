export function SimpleIconSvg({
  icon,
  className,
  style,
  "aria-label": ariaLabel,
}: {
  icon: { path: string };
  className?: string;
  style?: React.CSSProperties;
  "aria-label"?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      style={style}
      fill="currentColor"
      aria-hidden={!ariaLabel}
      aria-label={ariaLabel}
    >
      <path d={icon.path} />
    </svg>
  );
}
