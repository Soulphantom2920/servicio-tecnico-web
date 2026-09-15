const deploymentContext = import.meta.env.SITE_DEPLOY_CONTEXT ?? 'preview';
const location = 'Costa Rica';

export const siteConfig = {
  siteName: 'Opal Bitwise',
  ownerName: 'NOMBRE DEL RESPONSABLE',

  siteDescription: `Servicios independientes de software, optimización, configuración y automatización en ${location}.`,

  whatsappNumber: '50600000000',
  contactIsPlaceholder: true,

  siteUrl: null as string | null,
  identityIsPlaceholder: true,

  location,
  academicProgram: 'Ingeniería en Computación',
  institution: 'Tecnológico de Costa Rica',

  deploymentContext,

  brand: {
    logo: {
      light: '/brand/logo/opal-bitwise-horizontal-white-opal.png',
      dark: '/brand/logo/opal-bitwise-horizontal-black-opal.png',
    },

    symbol: {
      light: {
        svg: '/brand/symbol/opal-bitwise-symbol-white-opal.svg',
        png: '/brand/symbol/opal-bitwise-symbol-white-opal.png',
      },
      dark: {
        svg: '/brand/symbol/opal-bitwise-symbol-black-opal.svg',
        png: '/brand/symbol/opal-bitwise-symbol-black-opal.png',
      },
    },

    favicon: {
      light: {
        16: '/brand/favicon/white/favicon-white-opal-16.png',
        32: '/brand/favicon/white/favicon-white-opal-32.png',
        48: '/brand/favicon/white/favicon-white-opal-48.png',
        64: '/brand/favicon/white/favicon-white-opal-64.png',
        180: '/brand/favicon/white/favicon-white-opal-180.png',
        192: '/brand/favicon/white/favicon-white-opal-192.png',
        512: '/brand/favicon/white/favicon-white-opal-512.png',
      },

      dark: {
        16: '/brand/favicon/black/favicon-black-opal-16.png',
        32: '/brand/favicon/black/favicon-black-opal-32.png',
        48: '/brand/favicon/black/favicon-black-opal-48.png',
        64: '/brand/favicon/black/favicon-black-opal-64.png',
        180: '/brand/favicon/black/favicon-black-opal-180.png',
        192: '/brand/favicon/black/favicon-black-opal-192.png',
        512: '/brand/favicon/black/favicon-black-opal-512.png',
      },
    },
  },

  ogImagePath: '/brand/social/opal-bitwise-og-image.png',
  ogImageAlt: 'Opal Bitwise — Soporte de software, optimización y automatización',
} as const;

export const isIndexableProduction =
  siteConfig.deploymentContext === 'production' &&
  !siteConfig.identityIsPlaceholder &&
  !siteConfig.contactIsPlaceholder &&
  siteConfig.siteUrl !== null;
