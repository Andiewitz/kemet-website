import type { ImgHTMLAttributes } from 'react'

import { IMAGE_ALT, IMAGE_META, IMAGES, type PhotoKey } from '../lib/images'

/**
 * Every photograph goes through here, so swapping a file in lib/images.ts updates the site.
 * It emits a srcset of the resized variants plus the original, and intrinsic
 * width/height so the browser reserves the right box before the photo lands.
 * Pass `sizes` to describe how wide the picture actually renders.
 */
export function Photo({
  name,
  alt,
  sizes = '100vw',
  ...rest
}: { name: PhotoKey; alt?: string; sizes?: string } & Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt' | 'sizes'>) {
  const meta = IMAGE_META[name]
  const src = IMAGES[name]
  const base = src.replace(/\.webp$/, '')
  const srcSet = [...meta.widths.map((w) => `${base}-${w}.webp ${w}w`), `${src} ${meta.width}w`].join(', ')
  // srcSet is set before src: with src first the browser starts downloading the
  // full-size file before it knows that a smaller candidate would do.
  return (
    <img
      srcSet={srcSet}
      sizes={sizes}
      src={src}
      width={meta.width}
      height={meta.height}
      alt={alt ?? IMAGE_ALT[name]}
      decoding="async"
      {...rest}
    />
  )
}
