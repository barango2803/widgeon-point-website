export interface CarouselImage {
  src: string;
  label?: string;
}

// Hero carousel: full-resolution images only (wp-012..016 are high-res; wp-001..011 are 300×200 thumbnails)
export const carouselImages: CarouselImage[] = [
  { src: '/carousel/wp-012.jpg' },
  { src: '/carousel/wp-013.jpg' },
  { src: '/carousel/wp-014.jpg' },
  { src: '/carousel/wp-015.jpg' },
  { src: '/carousel/wp-016.jpg' },
];
