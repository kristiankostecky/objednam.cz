type Size = { width: number; height: number }
type Theme = 'light' | 'dark'

const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str)

const shimmer = (size: Size, theme: Theme) => `
<svg width="${size.width}" height="${size.height}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="${theme === 'light' ? '#f0f0f0' : '#333'}" offset="20%" />
      <stop stop-color="${theme === 'light' ? '#e0e0e0' : '#444'}" offset="50%" />
      <stop stop-color="${theme === 'light' ? '#f0f0f0' : '#333'}" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${size.width}" height="${size.height}" fill="${theme === 'light' ? '#f0f0f0' : '#333'}" />
  <rect id="r" width="${size.width}" height="${size.height}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${size.width}" to="${size.width}" dur="1s" repeatCount="indefinite"  />
</svg>
`

/**
 * Use as `placeholder` attribute in next/image component to show a shimmer effect while the image is loading.
 */
export function getImageFallback(
  size: { width: number; height: number } = { width: 700, height: 475 },
  theme: Theme = 'light'
) {
  return `data:image/svg+xml;base64,${toBase64(shimmer(size, theme))}` as const
}
