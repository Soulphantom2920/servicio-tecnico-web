const deploymentContext = import.meta.env.SITE_DEPLOY_CONTEXT ?? 'preview';
const location = 'Costa Rica';

export const siteConfig = {
  siteName: 'NOMBRE DEL SERVICIO',
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
  ogImagePath: '/og-image.png',
  ogImageAlt: 'Tu computadora, sin complicaciones',
} as const;

export const isIndexableProduction =
  siteConfig.deploymentContext === 'production' &&
  !siteConfig.identityIsPlaceholder &&
  !siteConfig.contactIsPlaceholder &&
  siteConfig.siteUrl !== null;
