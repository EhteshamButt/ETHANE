/** 
 * BrandLogo.tsx
 * Site brand logo with responsive sizing optimized for mobile-first layouts.
 *
 * Purpose:
 * - Provide smaller, visually balanced logo sizing on mobile and scale up on larger screens.
 * - Maintain aspect ratio via the img element using object-contain.
 * - Allow callers to override or extend sizing via the className prop (appended last).
 */

import React from 'react'

/** Props for BrandLogo */
export interface BrandLogoProps {
  /** Wrap the logo in a link to the homepage */
  withLink?: boolean
  /** Extra class names (appended last, can override widths if needed) */
  className?: string
  /** Accessible alt text for the image */
  alt?: string
  /** Localized aria-label for the home link */
  linkAriaLabel?: string
}

/**
 * BrandLogo
 * - Uses responsive Tailwind width classes on the wrapper to control size:
 *   Mobile: w-24, sm: w-28, md: w-40, lg: w-48, xl: w-56
 * - The image fills the wrapper width and preserves aspect ratio.
 */
export function BrandLogo({
  withLink = true,
  className = '',
  alt = 'Ethaane logo',
  linkAriaLabel = 'Go to homepage',
}: BrandLogoProps) {
  /** Default responsive widths for a balanced hierarchy on mobile and up */
  const widthClasses =
    'w-24 sm:w-28 md:w-40 lg:w-48 xl:w-56'

  /** Base interactive styles (applied only when wrapped as a link) */
  const interactiveBase =
    'inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(60,77,42,0.6)] rounded'

  /** The brand image element */
  const imgEl = (
    <img
      src="https://pub-cdn.sider.ai/u/U0E5H7KKOW/web-coder/68c6c0275375a0a7f3b87371/resource/860c59d6-5882-4ffa-84ab-515055c904ca.png"
      alt={alt}
      className="block h-auto w-full object-contain"
      loading="eager"
      decoding="async"
      // fetchpriority must be lowercase to avoid React warnings
      fetchpriority="high"
    />
  )

  if (!withLink) {
    // Non-interactive variant (e.g., in a static context)
    return <span className={`brand-logo ${widthClasses} ${className}`}>{imgEl}</span>
  }

  // Interactive link to homepage
  return (
    <a
      href="#/"
      aria-label={linkAriaLabel}
      className={`brand-logo ${widthClasses} ${interactiveBase} ${className}`}
    >
      {imgEl}
    </a>
  )
}

export default BrandLogo
