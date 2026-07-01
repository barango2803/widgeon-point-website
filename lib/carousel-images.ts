// ─────────────────────────────────────────────────────────────
// Add your org photos to /public/carousel/ then list them here.
// Each entry: { src: '/carousel/filename.jpg', label: 'Org Name' }
// ─────────────────────────────────────────────────────────────

export interface CarouselImage {
  src: string;
  label?: string;
}

export const carouselImages: CarouselImage[] = [
  { src: '/carousel/PIC_ForesidePhotography_SailMaine_SundayJVRegatta_092621_8291-300x200.jpg', label: 'Sail Maine' },
  { src: '/carousel/ForesidePhotography_SailMaine_SundayJVRegatta_092621_8291_0000_Virginia-1-300x200.jpg', label: 'Sail Maine' },
  { src: '/carousel/ForesidePhotography_SailMaine_SundayJVRegatta_092621_8291_0001_mevets03-resize-300x200.jpg', label: 'Sail Maine' },
  { src: '/carousel/ForesidePhotography_SailMaine_SundayJVRegatta_092621_8291_0002_image2-300x200.jpg', label: 'Sail Maine' },
  { src: '/carousel/ForesidePhotography_SailMaine_SundayJVRegatta_092621_8291_0004_DSC2501-300x200.jpg', label: 'Sail Maine' },
  { src: '/carousel/SQUASH_Spinski_66-300x200.jpg', label: 'Youth Squash' },
  { src: '/carousel/compressed_DSC02115-300x200.jpg', label: '' },
  { src: '/carousel/compressed_DSC08240-300x200.jpg', label: '' },
  { src: '/carousel/compressed_image0-300x200.jpeg',  label: '' },
  { src: '/carousel/imgage_0000_On-Belay-Photo-3-300x200.jpg', label: 'On Belay' },
  { src: '/carousel/imgage_0002_On-Belay-Photo-1-300x200.jpg', label: 'On Belay' },
];
