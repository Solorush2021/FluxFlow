import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 50"
      width="150"
      height="37.5"
      aria-label="FluxFlow Inventory Logo"
      {...props}
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <path
        d="M10 25 C 20 10, 30 40, 40 25 S 50 10, 60 25 S 70 40, 80 25"
        stroke="url(#logoGradient)"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text
        x="90"
        y="32"
        fontFamily="'Space Grotesk', sans-serif"
        fontSize="24"
        fill="hsl(var(--foreground))"
        fontWeight="bold"
      >
        FluxFlow
      </text>
    </svg>
  );
}
