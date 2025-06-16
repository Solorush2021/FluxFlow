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
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      {/* Icon part */}
      <path
        d="M20 10 Q25 5, 30 10 T40 10 M20 25 Q25 20, 30 25 T40 25 M20 40 Q25 35, 30 40 T40 40"
        stroke="url(#logoGradient)"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="25" cy="10" r="3" fill="hsl(var(--primary))" />
      <circle cx="25" cy="25" r="3" fill="hsl(var(--accent))" />
      <circle cx="25" cy="40" r="3" fill="hsl(var(--primary))" />
      
      {/* Text part */}
      <text
        x="55" // Adjusted x position for text
        y="33" // Adjusted y position for vertical alignment
        fontFamily="'Space Grotesk', sans-serif"
        fontSize="26" // Slightly increased font size
        fill="hsl(var(--foreground))"
        fontWeight="bold"
        letterSpacing="-0.5"
      >
        FluxFlow
      </text>
    </svg>
  );
}
