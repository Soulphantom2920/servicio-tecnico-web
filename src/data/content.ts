import { siteConfig } from '@/config/siteConfig';
import { services } from '@/data/services';
import { formatColones } from '@/utils/formatColones';

const diagnosticService = services.find((service) => service.id === 'revision');

if (!diagnosticService) {
  throw new Error('Debe existir el servicio de revisión.');
}

const diagnosticPrice = formatColones(diagnosticService.startingPrice);

export const content = {
  navigation: {
    services: 'Servicios',
    process: 'Cómo funciona',
    trust: 'Sobre el servicio',
    contact: 'WhatsApp',
  },
  homeSeo: {
    title: 'Soporte de software sin complicaciones',
    description: siteConfig.siteDescription,
  },
  hero: {
    eyebrow: `Soporte de software · ${siteConfig.location}`,
    title: 'Tu computadora, sin complicaciones.',
    description:
      'Solución de problemas, optimización, configuración y pequeñas automatizaciones adaptadas a lo que necesitas.',
    primaryAction: 'Escribirme por WhatsApp',
    secondaryAction: 'Ver servicios',
    signals: ['Atención directa', 'Precio antes de continuar', 'Solo con cita'],
    cardLabel: 'Una ruta sencilla',
    cardTitle: 'Primero entendemos el problema.',
    cardBody:
      'No tienes que elegir una categoría técnica. Describe lo que ocurre y recibirás una explicación antes de autorizar cambios.',
    cardSteps: ['Describe lo que notas', 'Recibe una explicación', 'Decide antes de continuar'],
  },
  services: {
    eyebrow: 'Servicios y precios de lanzamiento',
    title: '¿En qué te puedo ayudar?',
    description:
      'Abre la opción que más se parezca a tu situación. Si ninguna encaja, empieza por la revisión.',
    priceNote:
      'El precio final depende del problema y del trabajo necesario. Siempre te indico el costo antes de realizar cambios adicionales.',
    examplesLabel: 'Puede ayudarte si…',
    detailAction: 'Consultar este servicio',
    featuredLabel: 'Empieza aquí si no estás seguro',
    diagnosticCredit: `Si realizo la solución, los ${diagnosticPrice} de la revisión se descuentan del total.`,
  },
  process: {
    eyebrow: 'Proceso',
    title: 'Sabes qué se hará antes de decidir.',
    description:
      'La atención se organiza con cita y cada paso se confirma contigo. No se realizan trabajos adicionales por sorpresa.',
    steps: [
      {
        title: 'Cuéntame qué pasa',
        body: 'Escríbeme por WhatsApp y explícame qué problema presenta la computadora.',
      },
      {
        title: 'Reviso el equipo',
        body: 'Identifico la causa y qué sería necesario hacer.',
      },
      {
        title: 'Te explico',
        body: 'Te indico qué encontré y cuánto costaría solucionarlo antes de continuar.',
      },
      {
        title: 'Lo soluciono',
        body: 'Realizo únicamente el trabajo autorizado, compruebo el resultado y te explico lo que se hizo.',
      },
    ],
  },
  trust: {
    eyebrow: 'Atención directa',
    title: 'Trabajo personalizado, sin aparentar una empresa que no existe.',
    intro: `Soy estudiante de ${siteConfig.academicProgram} del ${siteConfig.institution} y ofrezco servicios independientes enfocados en software, optimización y automatización.`,
    body: 'Cada equipo se revisa según el problema y el uso de la persona, evitando cambios innecesarios o configuraciones genéricas.',
    principles: [
      {
        title: 'Sin cambios innecesarios',
        body: 'Primero se identifica el problema y se decide qué vale la pena modificar.',
      },
      {
        title: 'Precio claro',
        body: 'Si aparece trabajo adicional, te indico el costo antes de continuar.',
      },
      {
        title: 'Privacidad',
        body: 'Solo se accede a la información necesaria para realizar el servicio.',
      },
    ],
  },
  scope: {
    title: '¿El problema es físico?',
    body: 'Mi trabajo se enfoca en software. Si el equipo necesita limpieza interna, cambio de componentes u otra reparación de hardware, puedo referirte con un técnico de confianza.',
    note: 'La derivación se realiza únicamente después de informarte y contar con tu autorización.',
  },
  finalCta: {
    eyebrow: 'Siguiente paso',
    title: '¿Algo no funciona bien en tu computadora?',
    body: 'No necesitas saber cuál es el problema. Cuéntame qué está pasando y vemos cuál sería el siguiente paso.',
    action: 'Hablar por WhatsApp',
    message: 'Hola, vi tu página. Tengo un problema con mi computadora: ___',
  },
  footer: {
    summary: 'Servicios independientes de software, con cita previa.',
    privacy: 'Privacidad',
    terms: 'Condiciones',
    placeholderNotice: 'Identidad y contacto pendientes de configuración para producción.',
  },
  privacy: {
    seoTitle: 'Privacidad',
    description: 'Cómo se protege la información durante la prestación del servicio.',
    eyebrow: 'Información del servicio',
    title: 'Privacidad y acceso mínimo',
    intro:
      'Solo se accede a la información necesaria para diagnosticar y realizar el trabajo autorizado. Este sitio no utiliza formularios, cuentas, cookies de aplicación ni analítica de terceros.',
    sections: [
      {
        title: 'Durante la revisión',
        paragraphs: [
          'No se abren documentos, fotografías, correos, historiales u otra información personal salvo que sea estrictamente necesario para el servicio y se haya explicado el motivo.',
          'No se solicitan contraseñas cuando puedes introducirlas directamente y nunca se guardan como parte del registro del trabajo.',
        ],
      },
      {
        title: 'Datos mínimos del servicio',
        paragraphs: [
          'Puede ser necesario registrar nombre, número de contacto, modelo del equipo, problema reportado, trabajo autorizado, fecha, precio y resultado.',
          'No se recopilan por defecto dirección exacta, cédula, fecha de nacimiento, cuentas, contraseñas ni listas completas de archivos.',
          'El enlace de contacto abre WhatsApp. Si decides usarlo, WhatsApp procesa tu número, perfil y mensajes conforme a sus propias condiciones y política de privacidad; este sitio no recibe esos datos hasta que envías el mensaje.',
        ],
      },
      {
        title: 'Copias y respaldos temporales',
        paragraphs: [
          'No se copia información que no sea necesaria. Los respaldos temporales utilizados durante el servicio se eliminan después de entregar el equipo y verificar el trabajo.',
        ],
      },
      {
        title: 'Terceros',
        paragraphs: [
          'Fuera del procesamiento propio de WhatsApp cuando eliges ese canal, la información del servicio no se comparte con terceros. Si una falla física requiere derivar el equipo a un técnico de confianza, se informa primero y se solicita autorización antes de facilitar información o entregar el equipo.',
        ],
      },
    ],
  },
  terms: {
    seoTitle: 'Condiciones del servicio',
    description: 'Alcance, precios, autorización, respaldos y garantía del servicio.',
    eyebrow: 'Información del servicio',
    title: 'Condiciones claras antes de trabajar',
    intro:
      'Estas condiciones resumen cómo se cotiza, autoriza y realiza el servicio. La redacción legal definitiva debe verificarse antes de la publicación comercial.',
    sections: [
      {
        title: 'Precios y autorización',
        paragraphs: [
          `Los precios publicados son precios iniciales “desde”. La revisión comienza en ${diagnosticPrice}; si realizo la solución diagnosticada, ese monto se descuenta del total.`,
          'El precio final depende del alcance real. Ningún trabajo adicional que incremente el precio se realiza sin autorización previa.',
        ],
      },
      {
        title: 'Citas y tiempos',
        paragraphs: [
          'La atención es únicamente con cita. El plazo se confirma después de revisar el problema; no se promete disponibilidad inmediata ni una entrega universal en 24 horas.',
        ],
      },
      {
        title: 'Respaldos y cambios importantes',
        paragraphs: [
          'Antes de formatear, particionar, reinstalar, migrar un sistema o eliminar información de forma importante, se requiere un respaldo adecuado o una autorización explícita y registrada para continuar sin él.',
          'Un punto de restauración no sustituye un respaldo de archivos personales. Para respaldos grandes, normalmente el cliente proporciona un medio adecuado.',
        ],
      },
      {
        title: 'Garantía',
        paragraphs: [
          'Se contempla una garantía mínima de 30 días hábiles sobre el trabajo realizado, sin limitar los derechos reconocidos por la normativa costarricense aplicable. Si el mismo problema reaparece por una causa atribuible a la intervención, se revisa sin un nuevo cobro.',
          'La garantía no convierte en el mismo caso un problema nuevo, daño físico posterior, software o malware instalado después, cambios realizados por terceros, una falla independiente de hardware u otra causa ajena al trabajo autorizado.',
        ],
      },
      {
        title: 'Alcance y licencias',
        paragraphs: [
          'El servicio se concentra en software. Las reparaciones físicas, limpieza interna, sustitución de componentes, microsoldadura y electrónica se derivan a un especialista con autorización del cliente.',
          'Solo se instala software gratuito, de código abierto o con una licencia válida aportada por el cliente. El precio no incluye licencias comerciales y no se instalan cracks, activadores ni mecanismos de licencia no autorizados.',
        ],
      },
      {
        title: 'Exclusiones del servicio',
        paragraphs: [
          'No se ofrecen como servicio ordinario análisis forense, ransomware, recuperación de cuentas comprometidas, incidentes graves de ciberseguridad, recuperación profesional de datos, discos físicamente dañados, sistemas empresariales críticos ni servidores de producción.',
          'Cuando un caso excede este alcance, la revisión se detiene en un punto razonable y se recomienda un especialista.',
        ],
      },
    ],
  },
  notFound: {
    seoTitle: 'Página no encontrada',
    title: 'Página no encontrada.',
    body: 'El enlace puede estar incompleto o la página pudo haberse movido.',
    action: 'Volver al inicio',
  },
} as const;
