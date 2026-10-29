import type { SVGProps } from "react";

export function WhatsAppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.57.94.95-3.48-.22-.36a9.4 9.4 0 0 1-1.44-5.02c0-5.2 4.24-9.44 9.45-9.44 2.52 0 4.89.99 6.67 2.77a9.37 9.37 0 0 1 2.76 6.68c0 5.2-4.24 9.43-9.45 9.43m8.04-17.47A11.3 11.3 0 0 0 12.05.7C5.78.7.68 5.8.68 12.07c0 2 .52 3.96 1.52 5.68L.58 23.7l6.09-1.6a11.36 11.36 0 0 0 5.38 1.37h.01c6.26 0 11.37-5.1 11.37-11.37 0-3.04-1.18-5.89-3.34-8.04" />
    </svg>
  );
}

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}

/** Decorative botanical sprig, drawn in brand greens. */
export function LeafSprig({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 200" fill="none" aria-hidden="true" className={className} {...props}>
      <path
        d="M20 190 C 60 150, 100 110, 180 20"
        stroke="currentColor"
        strokeOpacity="0.55"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {(
        [
        [55, 152, -118],
        [78, 127, -8],
        [100, 105, -122],
        [122, 82, -12],
        [142, 60, -125],
        [162, 40, -20],
        ] as const
      ).map(([x, y, r], i) => (
        <path
          key={i}
          d="M0 0 C 10 -18, 34 -22, 46 -10 C 34 2, 12 6, 0 0 Z"
          transform={`translate(${x} ${y}) rotate(${r})`}
          fill="currentColor"
          fillOpacity={i % 2 === 0 ? 0.85 : 0.6}
        />
      ))}
    </svg>
  );
}

/** Small twin-leaf mark used in section dividers. */
export function TwinLeaf({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 24" fill="currentColor" aria-hidden="true" className={className} {...props}>
      <path d="M20 22 C 18 14, 10 6, 2 6 C 4 14, 12 20, 20 22 Z" opacity="0.8" />
      <path d="M20 22 C 22 14, 30 6, 38 6 C 36 14, 28 20, 20 22 Z" />
    </svg>
  );
}
