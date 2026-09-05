# Especificación de requisitos

**Producto:** sitio web de servicios independientes de soporte de software

**Estado de la especificación:** APROBADO

**Versión objetivo:** v1, sitio estático
**Idioma:** español

Este documento es normativo para la v1. La planeación está cerrada: cualquier desviación requiere un conflicto técnico demostrable, una solución mínima y su documentación. Las decisiones visuales aún editables no autorizan cambios de alcance o arquitectura.

## 1. Objetivo del producto

El sitio presenta los servicios independientes de un estudiante de Ingeniería en Computación del Tecnológico de Costa Rica. Debe permitir que una persona sin conocimientos técnicos entienda rápidamente:

1. qué ayuda se ofrece;
2. si su problema podría encajar;
3. cuál es el precio inicial;
4. quién realizará el trabajo;
5. cómo funciona el proceso;
6. cómo iniciar una conversación por WhatsApp.

La propuesta se concentra en diagnóstico y soluciones de **software**, optimización, instalación/configuración y automatizaciones pequeñas. No representa una empresa grande ni un taller integral de hardware y no debe aparentarlo.

La experiencia comercial central es:

> El visitante explica qué ocurre → se revisa → se explica qué se encontró y cuánto costaría → solo se realiza el trabajo autorizado.

## 2. Público y principios de comunicación

El público es general. No se presupone conocimiento de controladores, procesos, APIs, PowerShell, sistemas operativos, seguridad informática ni hardware. La interfaz debe describir síntomas y resultados cotidianos; los detalles técnicos solo aparecen como información secundaria cuando aporten valor.

La condición de estudiante del TEC es contexto profesional y señal de formación, no una disculpa ni una certificación inexistente. El sitio debe comunicar atención directa, revisión individual y límites claros.

## 3. Catálogo y precios aprobados

Los datos completos de los servicios deben residir en una sola fuente, `src/data/services.ts`. La interfaz puede condensar el texto, pero no alterar precios ni reglas.

| Servicio visible            | Precio inicial | Promesa principal                                                                                 |
| --------------------------- | -------------: | ------------------------------------------------------------------------------------------------- |
| Computadora lenta           |  Desde ₡10.000 | Revisar qué afecta el rendimiento y ajustar el sistema según el uso real.                         |
| Problemas y errores         |  Desde ₡10.000 | Investigar fallos de programas, del sistema o de configuración y buscar una solución de software. |
| Instalación y configuración |  Desde ₡12.000 | Instalar o reinstalar el sistema, programas y controladores, y dejar el equipo listo para usar.   |
| Automatizaciones            |  Desde ₡15.000 | Crear pequeñas herramientas que reduzcan pasos o tareas repetitivas.                              |
| No sé qué tiene / revisión  |   Desde ₡5.000 | Revisar el equipo cuando el cliente no puede identificar la causa.                                |

### 3.1 Alcance orientativo

- **Computadora lenta:** inicio, programas innecesarios, almacenamiento, procesos, actualizaciones, integridad del sistema, configuración y optimización adaptada al uso. No se vende una “optimización extrema” genérica.
- **Problemas y errores:** errores de Windows o aplicaciones, controladores, inicio, configuraciones dañadas y otros fallos lógicos. Un síntoma físico se deriva.
- **Instalación y configuración:** Windows o Linux cuando resulte apropiado, controladores, aplicaciones legítimas y puesta a punto. No se promueve Windows 10 como opción normal vigente.
- **Automatizaciones:** apertura o preparación de entornos, organización de archivos, ejecución de tareas repetitivas, respuesta a eventos y utilidades pequeñas. Es el diferenciador principal, pero debe explicarse sin jerga de programación.
- **Revisión:** el visitante no debe diagnosticarse por su cuenta. Si el mismo prestador ejecuta luego la solución diagnosticada, los ₡5.000 de la revisión se descuentan del total, no se suman.

## 4. Reglas de negocio

- **RB-01 — Precios iniciales.** “Desde” comunica un mínimo, no una cotización definitiva.
- **RB-02 — Autorización.** Ninguna ampliación de alcance ni incremento de precio se ejecuta sin informar el hallazgo, cotizar y recibir autorización del cliente.
- **RB-03 — Revisión descontable.** El costo de revisión de ₡5.000 se descuenta del total cuando el cliente contrata con el mismo prestador la solución diagnosticada.
- **RB-04 — Cita previa.** La atención se realiza únicamente con cita; no se promete disponibilidad permanente ni atención inmediata.
- **RB-05 — Plazo.** El tiempo depende del problema y se confirma después de revisar. La web no promete un plazo fijo o un SLA de 24 horas.
- **RB-06 — Software.** El servicio propio se concentra en software. Limpieza interna, sustitución de piezas y reparación física se pueden referir a un técnico de confianza.
- **RB-07 — Legalidad del software.** No se instala ni anuncia software pirata, cracks, activadores no autorizados, KMS ilícito ni licencias ilegales. Las licencias comerciales no están incluidas salvo indicación expresa y legítima.
- **RB-08 — Acceso mínimo.** Solo se accede a los datos necesarios para el trabajo. No se solicitan credenciales cuando el cliente puede introducirlas directamente.
- **RB-09 — Respaldo y consentimiento.** Antes de reinstalar, borrar, migrar o realizar otra operación destructiva se acuerda el respaldo aplicable o se obtiene consentimiento informado sobre el riesgo.
- **RB-10 — Garantía.** Las condiciones deben respetar la normativa costarricense aplicable. La planeación contempla una garantía mínima de 30 días hábiles sobre el trabajo realizado, diferenciando el mismo fallo atribuible al servicio de problemas nuevos, daños posteriores o causas externas. No se usan cláusulas de “sin garantía” para eliminar derechos.
- **RB-11 — Verificación.** La entrega comprueba el problema original y los cambios autorizados; el cliente recibe un resumen breve de hallazgos, trabajo, resultado y recomendaciones.
- **RB-12 — Privacidad pública.** El sitio v1 no recolecta información mediante formularios, cuentas, cookies de aplicación o analítica. El contacto ocurre en WhatsApp, sujeto a las condiciones de ese servicio externo.

## 5. Exclusiones del servicio ordinario

La web no debe prometer ni insinuar como prestación normal:

- análisis forense;
- respuesta a ransomware;
- incidentes graves de ciberseguridad;
- recuperación profesional de datos;
- servidores de producción;
- sistemas empresariales críticos;
- reparación física o electrónica realizada por el propietario del sitio.

Un caso fuera de alcance se rechaza o deriva de forma responsable. El diagnóstico mediante software puede identificar indicios físicos, pero no convierte el hardware en una categoría comercial propia.

## 6. Requisitos funcionales

### RF-01 — Presentación inmediata

La vista inicial debe comunicar propuesta de valor, foco en software, precios iniciales y acceso a WhatsApp sin obligar a navegar a otra página.

### RF-02 — Exploración de servicios

Los cinco servicios deben permanecer identificables. `ServiceExplorer` mostrará información progresiva mediante un único patrón semántico basado inicialmente en `<details>` y `<summary>`. No se implementan tabs en escritorio y acordeón en móvil como dos interfaces diferentes.

### RF-03 — Caso desconocido

“No sé qué tiene / revisión” debe ser fácil de encontrar y explicar tanto el precio como el descuento posterior.

### RF-04 — Contacto contextual

Debe existir acceso a WhatsApp desde puntos contextuales —cabecera, presentación, servicio o cierre— sin inundar la interfaz con botones repetidos. Todos los enlaces se generan desde una única configuración y admiten mensajes específicos por servicio.

### RF-05 — Proceso

La web debe explicar de forma breve:

1. cuéntame qué pasa;
2. reviso el equipo;
3. te explico qué encontré y cuánto costaría;
4. realizo solo lo autorizado y compruebo el resultado.

### RF-06 — Identidad y confianza

Debe indicarse que es un servicio independiente realizado por un estudiante de Ingeniería en Computación del TEC y enfocado en software, optimización y automatización. No se atribuyen títulos, certificaciones, local, personal, horarios o escala inexistentes.

### RF-07 — Información secundaria

La landing resume alcance, referencia de hardware, privacidad y condiciones sin transformarlos en franjas extensas. Las rutas `/privacidad` y `/condiciones` contienen la explicación completa y existe una página `404` útil.

### RF-08 — Metadatos y compartición

Cada página debe incluir título y descripción apropiados. Cuando exista URL pública definitiva, también canonical y Open Graph coherentes. No se inventan datos para marcado estructurado.

## 7. Arquitectura de información y experiencia

La landing debe ser compacta y sobria. No se acepta una sucesión mecánica de ocho secciones gigantes. La información se agrupa en cuatro regiones lógicas:

1. **Shell:** identidad, navegación mínima y contacto.
2. **Presentación + servicios:** propuesta de valor, explorador, precios y contacto en una composición integrada.
3. **Proceso + confianza:** pasos, identidad del prestador, autorización, privacidad y cambios justificados.
4. **Información secundaria + cierre:** hardware, condiciones, privacidad, contacto final y pie.

En espacios amplios las regiones pueden compartir columnas; en espacios estrechos se reordenan sin perder relación ni funcionalidad. Los cinco servicios no se convierten en cinco secciones completas.

La dirección visual debe ser profesional, elaborada, contenida y comprensible. Se descartan:

- estética “hacker” o Matrix;
- terminales falsas, código verde, binario o circuitos decorativos;
- imágenes corporativas genéricas de técnicos sonrientes;
- decoración excesiva que compita con la información.

## 8. Requisitos no funcionales

### 8.1 Plataforma y arquitectura

- Astro 7, generación estática (`output: 'static'`) y TypeScript estricto.
- HTML semántico y CSS moderno nativo.
- JavaScript cliente mínimo y progresivo.
- UI dirigida por datos, componentes por responsabilidad y fuente única de verdad.
- Sin React, Vue, Svelte, Tailwind, Bootstrap, jQuery, estado global, backend, API propia, base de datos, SSR, CMS, PWA, service worker ni analítica en v1, salvo un requisito nuevo demostrable.

### 8.2 Responsive

- Teléfonos, tablets, laptops y escritorios son plataformas de primera clase.
- Los breakpoints derivan del contenido, no de modelos de dispositivo.
- Se permiten composiciones conceptuales Compact, Intermediate y Wide, con CSS Grid, Flexbox, `minmax()`, `clamp()`, consultas de contenedor o media queries cuando aporten valor.
- No puede existir desbordamiento horizontal involuntario, contenido perdido ni funcionalidad distinta por tamaño.

### 8.3 Temas

- Tema claro y oscuro tienen la misma prioridad y calidad.
- La selección es automática mediante `prefers-color-scheme`; no hay selector manual en v1.
- Se declara `color-scheme` y se usan tokens semánticos, no colores ligados al nombre de un tema.
- Ambos temas deben conservar jerarquía, contraste, foco, estados y legibilidad.

### 8.4 Accesibilidad

El objetivo obligatorio es **WCAG 2.2 nivel AA**. Como mínimo:

- estructura de encabezados y landmarks coherente;
- contenido y controles accesibles por teclado;
- foco visible y no oculto;
- contraste AA en ambos temas;
- nombre accesible y propósito claro de enlaces y controles;
- objetivos táctiles conformes al criterio aplicable de WCAG 2.2;
- reflow, zoom y texto ampliado sin pérdida funcional;
- estados no comunicados solo por color;
- HTML nativo antes que ARIA;
- contenido esencial utilizable sin JavaScript no esencial;
- `prefers-reduced-motion` para cualquier movimiento no esencial.

La auditoría automática con axe ayuda, pero no sustituye la revisión manual ni con teclado.

### 8.5 Rendimiento

Objetivos de experiencia real, idealmente al percentil 75 en móvil y escritorio:

- LCP ≤ 2,5 s;
- INP ≤ 200 ms;
- CLS ≤ 0,1.

Presupuestos iniciales:

- JavaScript cliente inicial: menos de 30 KB gzip;
- CSS: menos de 50 KB gzip;
- dependencias cliente: aproximadamente cero;
- fuentes: preferiblemente cero a dos archivos;
- imagen hero: no obligatoria.

Una desviación exige medición y justificación. Las imágenes deben reservar dimensiones, los assets deben optimizarse y no se añade peso sin beneficio verificable.

### 8.6 Compatibilidad

La matriz mínima automatizada cubre Chromium, Firefox y WebKit, con viewports representativos Compact/Wide y esquemas claro/oscuro. No se exige soporte para navegadores obsoletos sin mantenimiento.

### 8.7 SEO y previews

- `BaseLayout` centraliza `lang="es"`, UTF-8, viewport, título, descripción, robots, Open Graph, canonical cuando corresponda, `color-scheme` y favicon.
- Desarrollo y despliegues preview no deben indexarse ni declarar la URL definitiva como canonical.
- Solo producción con identidad y URL confirmadas puede indexarse y usar canonical de producción.
- `robots.txt`, cabeceras y metadatos deben revisarse como parte de la publicación.
- Los datos estructurados quedan P1 hasta confirmar identidad, URL e información pública.

### 8.8 Seguridad y privacidad técnica

- El sitio no contiene cuentas, autenticación, pagos, formularios propios, carga de archivos, cookies de aplicación, API ni servidor.
- `public/_headers` debe contener políticas compatibles con el build real para CSP, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` y HSTS cuando el entorno HTTPS definitivo sea correcto.
- No se copian CSP genéricas ni se agrega `unsafe`/`unsafe-inline` indiscriminadamente para ocultar incompatibilidades.
- Los recursos externos se reducen al mínimo; licencias, privacidad y estabilidad se verifican antes de incorporarlos.

### 8.9 Mantenibilidad y configuración

- Identidad, contacto y URL: `src/config/siteConfig.ts`.
- Servicios, precios, descripciones y mensajes de WhatsApp: `src/data/services.ts`.
- Copy general editable: `src/data/content.ts` o equivalente.
- Paleta, tipografía, escala espacial, radios, sombras, anchos y estados: `src/styles/tokens.css`.
- Los componentes consumen estas fuentes y no duplican datos del negocio ni valores del sistema visual.
- No se convierte cada píxel en token: solo valores sistemáticos o razonablemente editables.

## 9. Fuera de alcance de v1

- cuentas, login y perfiles;
- pagos, carrito o comercio electrónico;
- reservaciones o agenda propia;
- panel administrativo;
- formularios de contacto propios;
- seguimiento de reparaciones o tickets;
- chatbot o diagnóstico automático;
- blog;
- aplicación móvil;
- portal del técnico de hardware;
- analítica, píxeles publicitarios o banner de cookies por costumbre;
- dominio personalizado y proyecto definitivo de Cloudflare Pages durante el prototipo.

La arquitectura permite añadir un dominio posteriormente sin reescribir contenido o componentes.

## 10. Criterios de aceptación y Definition of Done

La v1 está terminada cuando:

- las rutas `/`, `/privacidad`, `/condiciones` y `404` funcionan;
- los cinco servicios y precios coinciden con esta especificación;
- la regla de revisión descontable es clara;
- todos los CTA usan el número centralizado y mensajes codificados correctamente;
- el contenido no presenta placeholders como datos reales ni inventa negocio, dirección u horario;
- `ServiceExplorer` funciona con ratón, tacto y teclado, y conserva un solo modelo semántico;
- el sitio funciona sin JavaScript no esencial;
- ambos temas y los layouts Compact/Intermediate/Wide fueron inspeccionados;
- no hay overflow horizontal, saltos de layout evitables ni foco oculto;
- zoom, texto largo, enlaces, estados hover/focus/active y navegación por teclado fueron revisados manualmente;
- Chromium, Firefox y WebKit superan las pruebas E2E acordadas;
- `npm run check`, `npm run lint`, `npm run format:check`, `npm run build` y `npm run test:e2e` finalizan correctamente;
- la auditoría automatizada no presenta infracciones serias o críticas conocidas;
- el build real respeta razonablemente los presupuestos de JS/CSS y no muestra errores relevantes en consola;
- favicon, Open Graph, robots, canonical y cabeceras responden al entorno correcto;
- las licencias de todos los assets están verificadas;
- CI reproduce instalación, análisis, build y pruebas;
- README, arquitectura, convenciones y pendientes reflejan el estado real;
- no se crea todavía el proyecto definitivo `*.pages.dev` mientras nombre, WhatsApp y URL sigan pendientes.

## 11. Datos pendientes antes de publicar

- nombre comercial definitivo;
- nombre público del prestador, si se mostrará;
- número de WhatsApp en formato internacional;
- URL pública de producción;
- revisión final del copy legal y de garantía;
- decisión final sobre indexación y datos estructurados;
- imagen Open Graph definitiva en un formato compatible con los canales de compartición objetivo;
- validación final de mensajes, disponibilidad y cualquier dato de contacto público.
