# Sitio de servicios técnicos de software

Prototipo funcional de un sitio estático para presentar servicios independientes de soporte de software, optimización, instalación/configuración y automatización en Costa Rica. Está diseñado para público no técnico, prioriza WhatsApp como contacto y mantiene hardware, pagos, cuentas y backend fuera de la v1.

La especificación está cerrada y se encuentra en [docs/requirements.md](docs/requirements.md). Las decisiones técnicas y reglas de contribución están en [docs/architecture.md](docs/architecture.md) y [docs/conventions.md](docs/conventions.md).

## Estado

- Stack: Astro 7 + TypeScript estricto + HTML semántico + CSS nativo.
- Salida: SSG en `dist/`.
- Temas: claro/oscuro automáticos con `prefers-color-scheme`.
- Interacción principal: `<details>`/`<summary>` con mejora progresiva.
- Canal de contacto: WhatsApp mediante configuración centralizada.
- Hosting previsto: Cloudflare Pages, todavía sin crear el proyecto definitivo.
- Datos pendientes: identidad pública, número de WhatsApp y URL de producción.

Mientras esos datos no estén confirmados, el proyecto debe conservar placeholders claros y no permitir indexación de una preview como si fuera producción.

## Requisitos del entorno

- Node.js `24.19.x`
- npm `11.17.x`

Las versiones se fijan en `package.json`, `.nvmrc` y `.node-version`. Se recomienda usar exactamente esas versiones también en CI y Cloudflare Pages.

## Inicio rápido

```sh
npm ci
npm run dev
```

Astro mostrará la URL local. Para instalar los navegadores de Playwright en una máquina nueva:

```sh
npx playwright install
```

En Linux CI puede ser necesario instalar también sus dependencias del sistema:

```sh
npx playwright install --with-deps
```

## Comandos

| Comando                   | Propósito                                       |
| ------------------------- | ----------------------------------------------- |
| `npm run dev`             | Inicia el servidor local de desarrollo.         |
| `npm run start`           | Alias del servidor local.                       |
| `npm run check`           | Comprueba Astro y TypeScript.                   |
| `npm run lint`            | Ejecuta ESLint.                                 |
| `npm run format`          | Aplica Prettier.                                |
| `npm run format:check`    | Verifica formato sin modificar archivos.        |
| `npm run build`           | Genera el sitio estático en `dist/`.            |
| `npm run verify:build`    | Verifica presupuestos, CSP y salida estática.   |
| `npm run preview`         | Sirve localmente el build de producción.        |
| `npm run test:e2e`        | Ejecuta Playwright en la matriz configurada.    |
| `npm run test:e2e:update` | Actualiza snapshots intencionalmente revisadas. |

Validación completa antes de integrar o desplegar:

```sh
npm run check
npm run lint
npm run format:check
npm run build
npm run verify:build
npm run test:e2e
```

## Configuración editable

Los cambios comerciales y visuales frecuentes están centralizados:

- `src/config/siteConfig.ts`: nombre, prestador, WhatsApp, ubicación, URL y metadatos base.
- `src/data/services.ts`: catálogo, precios, descripciones y mensajes de contacto por servicio.
- `src/data/content.ts`: propuesta de valor, proceso, confianza, alcance y copy general.
- `src/styles/tokens.css`: paleta semántica de ambos temas, tipografía, espaciado, radios, sombras y ancho de contenido.

Los componentes no deben duplicar estos valores. Cambiar un nombre, precio, texto, acento o escala visual no debe requerir modificar la estructura de la página.

### Placeholders obligatorios

Antes de publicar, localizar y sustituir los placeholders centralizados para:

- nombre comercial definitivo;
- nombre público del prestador, si se mostrará;
- número de WhatsApp con código de país;
- URL pública de producción;
- imagen Open Graph definitiva en PNG de 1200 × 630 tras cerrar la identidad.

Después se debe verificar manualmente cada CTA y mensaje precargado. No sustituirlos por datos inventados.

En la configuración inicial se reconocen explícitamente por estos valores y banderas:

- `siteName: 'NOMBRE DEL SERVICIO'`;
- `ownerName: 'NOMBRE DEL RESPONSABLE'`;
- `whatsappNumber: '50600000000'`;
- `siteUrl: null`;
- `identityIsPlaceholder: true`;
- `contactIsPlaceholder: true`.

Al completar la identidad, actualizar conjuntamente los valores y banderas correspondientes. El build adopta `SITE_DEPLOY_CONTEXT=preview` por defecto; solo el build definitivo debe recibir `SITE_DEPLOY_CONTEXT=production`.

## Servicios aprobados

| Servicio                    | Precio visible |
| --------------------------- | -------------: |
| Computadora lenta           |  Desde ₡10.000 |
| Problemas y errores         |  Desde ₡10.000 |
| Instalación y configuración |  Desde ₡12.000 |
| Automatizaciones            |  Desde ₡15.000 |
| No sé qué tiene / revisión  |   Desde ₡5.000 |

Si el cliente contrata la solución diagnosticada con el mismo prestador, los ₡5.000 de la revisión se descuentan del total. Todo aumento de precio requiere autorización previa. El servicio es con cita y se limita principalmente a software; hardware se refiere a un técnico de confianza. No se instala ni promociona software pirata.

## Estructura

```text
.
├── .github/workflows/       CI
├── docs/                    requisitos, arquitectura y convenciones
├── public/                  favicon, OG, robots y cabeceras de Cloudflare
├── src/
│   ├── components/          layout, secciones, servicios, SEO y UI
│   ├── config/              identidad y configuración transversal
│   ├── data/                servicios y copy editable
│   ├── layouts/             documento HTML base
│   ├── pages/               rutas estáticas
│   ├── styles/              tokens, base y estilos globales
│   ├── types/               contratos TypeScript compartidos
│   └── utils/               funciones puras
├── tests/e2e/               pruebas Playwright
├── astro.config.mjs
├── playwright.config.ts
├── package.json
└── tsconfig.json
```

Solo se materializan directorios con contenido real; este árbol describe responsabilidades, no exige carpetas vacías.

## Accesibilidad y rendimiento

Objetivo de accesibilidad: **WCAG 2.2 AA**, incluyendo teclado, foco visible, contraste en ambos temas, reflow/zoom, nombres accesibles y objetivos táctiles adecuados. ARIA solo se usa cuando HTML nativo no basta.

Objetivos de rendimiento:

- LCP ≤ 2,5 s;
- INP ≤ 200 ms;
- CLS ≤ 0,1;
- JavaScript cliente inicial < 30 KB gzip;
- CSS < 50 KB gzip;
- dependencias cliente cercanas a cero.

Las cifras de Core Web Vitals deben evaluarse al percentil 75 en móvil y escritorio cuando existan datos de campo. La revisión de laboratorio y los tests previenen regresiones, pero no sustituyen esos datos.

## Seguridad, SEO y privacidad

La v1 no tiene login, formularios propios, backend, API, base de datos, pagos, cargas, cookies de aplicación ni analítica. `public/_headers` se diseña para el output real de Astro; cualquier cambio de CSP debe probarse contra el build, sin relajarla indiscriminadamente.

Desarrollo y previews deben permanecer en `noindex` y sin canonical de producción. Antes de habilitar indexación se deben confirmar URL, identidad, robots, canonical, Open Graph, 404, políticas y cabeceras. No se inventan dirección, horario, local o datos estructurados.

## Cloudflare Pages

No se crea todavía el proyecto definitivo porque el nombre del subdominio `*.pages.dev` depende de la identidad pendiente.

Configuración prevista cuando esos datos estén aprobados:

| Campo                | Valor                           |
| -------------------- | ------------------------------- |
| Repositorio          | repositorio GitHub del proyecto |
| Comando de build     | `npm run build`                 |
| Directorio de salida | `dist`                          |
| Versión de Node      | `24.19.x`                       |

Lista de publicación:

1. sustituir y revisar todos los placeholders;
2. confirmar el nombre definitivo antes de crear `*.pages.dev`;
3. configurar producción y previews por separado;
4. mantener previews en `noindex` y sin canonical definitivo;
5. definir `SITE_DEPLOY_CONTEXT=production` únicamente para producción;
6. comprobar que los previews conserven `noindex` y que solo la compilación definitiva emita `index` y canonical;
7. sustituir el arte provisional de Open Graph conservando el PNG de 1200 × 630;
8. ejecutar la validación completa con `npm ci`;
9. desplegar el build estático;
10. probar WhatsApp, rutas, 404, OG, robots, canonical, HTTPS, cabeceras y CSP en la URL real;
11. habilitar indexación solo después de aprobar la revisión final.

Un dominio personalizado queda fuera de v1. La URL centralizada permite adoptarlo después sin reescribir componentes.

## Definition of Done

- Landing, privacidad, condiciones y 404 son funcionales.
- Los cinco servicios, precios y regla de descuento coinciden con la especificación.
- `ServiceExplorer` mantiene un solo patrón semántico y funciona con teclado, ratón y tacto.
- Todos los CTA usan configuración y mensajes contextuales válidos.
- Claro/oscuro y composiciones Compact/Intermediate/Wide conservan contenido, contraste y estados.
- No hay overflow, solapamientos, foco oculto, recursos faltantes ni errores relevantes de consola.
- Zoom, textos largos, navegación por teclado, hover/focus/active y degradación sin JS no esencial fueron revisados.
- Chromium, Firefox y WebKit superan E2E; axe no reporta infracciones serias o críticas conocidas.
- Check, lint, formato, build y pruebas terminan correctamente en local y CI.
- Presupuestos de JS/CSS y Core Web Vitals se revisan proporcionalmente al entorno disponible.
- Assets tienen licencia compatible y tamaño razonable.
- SEO, robots, canonical y cabeceras distinguen preview de producción.
- No quedan placeholders antes del lanzamiento público.
- No se han incorporado frameworks, servicios o dependencias fuera del alcance aprobado.

## Decisiones y desviaciones

- La configuración TypeScript usa `astro/tsconfigs/strictest`, una garantía mayor que el mínimo aprobado `strict`; no cambia el alcance.
- La versión fijada es Astro 7.3.1 con Node 24.19.x y npm 11.17.x para reproducibilidad.
- Un dominio personalizado, analítica y datos estructurados permanecen pendientes por alcance o por falta de datos definitivos.
- Cualquier nueva desviación debe registrar requisito que la origina, alternativa mínima elegida, impacto y verificación.

## Licencia

No se ha definido una licencia pública para el repositorio. La ausencia de archivo de licencia no autoriza reutilización o redistribución de su contenido.
