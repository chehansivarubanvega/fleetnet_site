import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'FleetNET GLOBAL',
    short_name: 'FleetNET',
    description: 'Advanced Fleet Management and Real-time Operation Intelligence System.',
    start_url: '/',
    display: 'standalone',
    background_color: '#020617',
    theme_color: '#fb8e17',
    icons: [
      {
        src: '/images/FLEETnet app icon.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
  };
}
