import type { Service } from '@/types/Service';

export const services = [
  {
    id: 'revision',
    title: 'No sé qué tiene',
    pricePrefix: 'Revisión desde',
    startingPrice: 5000,
    shortDescription:
      'Si solo sabes que algo anda mal, no necesitas identificar el problema. Cuéntame qué está pasando y reviso el equipo.',
    longDescription:
      'La revisión permite identificar el siguiente paso antes de autorizar una solución. Si el caso requiere pruebas más profundas, te indico el alcance y el costo antes de continuar.',
    examples: [
      'El equipo se comporta distinto, pero no sabes por qué',
      'Aparecen fallos difíciles de describir',
      'Necesitas orientación antes de decidir qué hacer',
    ],
    whatsappMessage:
      'Hola, vi tu página. Quisiera solicitar una revisión porque mi computadora tiene un problema, pero no sé cuál. Esto es lo que está pasando: ___',
    featured: true,
    diagnosticCredit: true,
  },
  {
    id: 'computadora-lenta',
    title: 'Computadora lenta',
    pricePrefix: 'Desde',
    startingPrice: 10000,
    shortDescription:
      'Reviso qué está afectando el rendimiento y ajusto el sistema según el uso que le das.',
    longDescription:
      'La revisión se adapta a tu forma de usar el equipo. Se corrigen causas reales de lentitud y se evitan cambios genéricos o innecesarios.',
    examples: [
      'Inicio lento o programas que tardan demasiado',
      'Poco espacio y aplicaciones innecesarias',
      'Configuración, actualizaciones o procesos que afectan el rendimiento',
    ],
    whatsappMessage:
      'Hola, vi tu página. Quisiera consultar por una computadora lenta. Esto es lo que noto: ___',
    featured: false,
    diagnosticCredit: false,
  },
  {
    id: 'problemas-errores',
    title: 'Problemas y errores',
    pricePrefix: 'Desde',
    startingPrice: 10000,
    shortDescription:
      'Si algo dejó de funcionar o aparece algún error, reviso la causa y busco una solución a nivel de software.',
    longDescription:
      'Puede tratarse de un programa, el inicio del sistema, una actualización, un controlador o una configuración. Primero se identifica la causa; después se propone el trabajo.',
    examples: [
      'Programas que ya no abren o se cierran',
      'Errores al iniciar o después de una actualización',
      'Periféricos cuyo problema parece ser de software',
    ],
    whatsappMessage:
      'Hola, vi tu página. Tengo un problema o error de software. El mensaje o comportamiento es: ___',
    featured: false,
    diagnosticCredit: false,
  },
  {
    id: 'instalacion-configuracion',
    title: 'Instalación y configuración',
    pricePrefix: 'Desde',
    startingPrice: 12000,
    shortDescription:
      'Instalación o reinstalación del sistema, programas, controladores y configuración para dejar el equipo listo para usar.',
    longDescription:
      'Puede incluir la preparación de una computadora nueva o una reinstalación acordada. Se consideran compatibilidad, licencias y respaldo antes de realizar cambios importantes.',
    examples: [
      'Preparar una computadora nueva',
      'Reinstalar Windows o evaluar Linux cuando corresponda',
      'Instalar programas y controladores con licencias válidas',
    ],
    whatsappMessage:
      'Hola, vi tu página. Quisiera consultar por instalación y configuración. Necesito lo siguiente: ___',
    featured: false,
    diagnosticCredit: false,
  },
  {
    id: 'automatizaciones',
    title: 'Automatizaciones',
    pricePrefix: 'Desde',
    startingPrice: 15000,
    shortDescription:
      '¿Haces siempre los mismos pasos en tu computadora? Puedo crear pequeñas herramientas para hacerlos automáticamente.',
    longDescription:
      'Primero definimos qué haces hoy, qué debería ocurrir y qué límites debe respetar la solución. Recibes una propuesta y un precio antes de desarrollarla.',
    examples: [
      'Abrir y preparar un entorno de trabajo',
      'Organizar, mover o respaldar archivos',
      'Ejecutar tareas repetitivas o responder a determinados eventos',
    ],
    whatsappMessage:
      'Hola, vi tu página. Quisiera consultar por automatizaciones. Tengo una tarea que repito en mi computadora: ___',
    featured: false,
    diagnosticCredit: false,
  },
] as const satisfies readonly Service[];
