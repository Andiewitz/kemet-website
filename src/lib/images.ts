// Every photograph on the site is routed through this one map. The files in
// public/images are generated placeholders: replace them with your own
// photography (keep the keys) and every page picks them up. Each source has
// smaller `<key>-<width>.webp` siblings generated beside it for srcset.
export const IMAGES = {
  hero: '/images/hero.webp',
  heroFront: '/images/hero-front.webp',
  camel: '/images/camel.webp',
  dunes: '/images/dunes.webp',
  temple: '/images/temple.webp',
  felucca: '/images/felucca.webp',
  balloons: '/images/balloons.webp',
  abuSimbel: '/images/abu-simbel.webp',
  redSea: '/images/red-sea.webp',
  whiteDesert: '/images/white-desert.webp',
  cairo: '/images/cairo.webp',
  dahabiya: '/images/dahabiya.webp',
  philae: '/images/philae.webp',
} as const

export type PhotoKey = keyof typeof IMAGES

/** Intrinsic size of each source and the resized widths that exist beside it. */
export const IMAGE_META: Record<PhotoKey, { width: number; height: number; widths: number[] }> = {
  hero: { width: 1536, height: 1024, widths: [480, 768, 960, 1280] },
  heroFront: { width: 1536, height: 1024, widths: [480, 768, 960, 1280] },
  camel: { width: 993, height: 1503, widths: [320, 480, 760] },
  dunes: { width: 1536, height: 1024, widths: [480, 768, 960] },
  temple: { width: 1024, height: 1536, widths: [360, 540, 800] },
  felucca: { width: 1536, height: 1024, widths: [480, 768, 960] },
  balloons: { width: 1536, height: 1024, widths: [480, 768, 960] },
  abuSimbel: { width: 1536, height: 1024, widths: [480, 768, 960] },
  redSea: { width: 1536, height: 1024, widths: [480, 768, 960] },
  whiteDesert: { width: 1536, height: 1024, widths: [480, 768, 960] },
  cairo: { width: 1536, height: 1024, widths: [480, 768, 960] },
  dahabiya: { width: 1536, height: 1024, widths: [480, 768, 960] },
  philae: { width: 1536, height: 1024, widths: [480, 768, 960] },
}

/** Short descriptions used as alt text wherever a photo carries meaning. */
export const IMAGE_ALT: Record<PhotoKey, string> = {
  hero: 'The pyramids of Giza at golden hour',
  heroFront: '',
  camel: 'A camel in a woven red and navy halter',
  dunes: 'A lone traveller walking along a sand dune, footprints behind',
  temple: 'A traveller in a sun hat walking between carved temple columns',
  felucca: 'White-sailed feluccas on the Nile at Aswan at sunset',
  balloons: 'Hot air balloons over the West Bank of Luxor at sunrise',
  abuSimbel: 'The colossal seated statues of Abu Simbel',
  redSea: 'A turquoise Red Sea reef below red mountains',
  whiteDesert: 'Chalk rock formations and a desert camp in the White Desert at dusk',
  cairo: 'Glowing lanterns in an old Cairo bazaar alley',
  dahabiya: 'A two-sailed dahabiya on a calm stretch of the Nile',
  philae: 'The island temple of Philae reflected in the Nile',
}
