# Arquitectura

## 1. Resumen de la solución

La v1 es un sitio estático generado con Astro 7. El build transforma componentes Astro, datos TypeScript y CSS en HTML/CSS y, únicamente si una mejora lo exige, una cantidad mínima de JavaScript cliente.

```text
siteConfig + services + content + design tokens
                       │
                       ▼
          componentes Astro y layouts
                       │
                  astro build
                       │
                       ▼
             dist/ (sitio estático)
                       │
                       ▼
              Cloudflare Pages CDN
```

No existe servidor de aplicación, base de datos, API propia, autenticación ni estado persistente. El canal transaccional es un enlace externo a WhatsApp.

## 2. Decisiones arquitectónicas

### 2.1 SSG

`output: 'static'` es la opción correcta porque todo el contenido público se conoce durante el build. SSG reduce latencia, costo operativo, superficie de ataque y JavaScript cliente.

### 2.2 Componentes en build-time

Astro permite separar layout, secciones y controles semánticos sin convertir la web en una SPA. Un componente existe si se reutiliza, representa una responsabilidad semántica o encapsula comportamiento real; no se crean wrappers ni microcomponentes arbitrarios.

### 2.3 Islands y mejora progresiva

La arquitectura admite islas, pero no obliga a hidratar ninguna. La interacción principal usa HTML nativo. Si se añade un script, debe mejorar una experiencia que ya conserva contenido y acciones esenciales sin ese script.

### 2.4 UI dirigida por datos

El catálogo no se copia en cada tarjeta o CTA. Los componentes iteran datos tipados y reciben propiedades. La presentación puede cambiar sin duplicar precios, reglas o mensajes.

### 2.5 Composición responsive

Existe un documento y un modelo semántico únicos. CSS reorganiza regiones conforme al espacio disponible; no hay una aplicación móvil y otra de escritorio.

### 2.6 Complejidad mínima

KISS y YAGNI prevalecen. No se implementan MVC, Clean Architecture, un store global o capas de servicios artificiales para un sitio estático pequeño. DRY se aplica a información y patrones con probabilidad real de cambio, no a cada coincidencia textual.

## 3. Responsabilidades por capa

| Capa              | Responsabilidad                                                    | No debe contener                                      |
| ----------------- | ------------------------------------------------------------------ | ----------------------------------------------------- |
| `src/config/`     | Identidad del sitio, contacto, URL y configuración transversal     | copy completo de secciones o reglas visuales          |
| `src/data/`       | Servicios, precios, mensajes de contacto y copy general            | marcado o estilos de componentes                      |
| `src/types/`      | Contratos TypeScript compartidos                                   | datos mutables del negocio                            |
| `src/utils/`      | Funciones puras como URL de WhatsApp y formato en colones          | estado, acceso a DOM o contenido duplicado            |
| `src/components/` | Estructura semántica y presentación de responsabilidades concretas | números, precios o tokens repetidos hardcodeados      |
| `src/layouts/`    | Documento base, metadatos comunes y shell HTML                     | contenido comercial específico de una página          |
| `src/pages/`      | Composición de rutas                                               | componentes monolíticos o lógica de negocio duplicada |
| `src/styles/`     | tokens, base y reglas globales justificadas                        | estilos locales de todos los componentes              |
| `public/`         | archivos que deben copiarse literalmente                           | imágenes que Astro debería procesar                   |
| `tests/e2e/`      | conducta visible, accesibilidad y compatibilidad                   | detalles internos frágiles                            |

## 4. Flujo de configuración

### 4.1 `siteConfig.ts`

Es la fuente única de:

- nombre e identidad pública;
- nombre del prestador cuando corresponda;
- número de WhatsApp internacional;
- ubicación general aprobada;
- URL pública;
- metadatos base;
- indicadores de publicación que necesite el proyecto.

Los placeholders deben ser evidentes y seguros. No se repite el número dentro de componentes ni páginas.

`SITE_DEPLOY_CONTEXT` distingue el build de producción de una preview y, si no está definido, adopta el valor seguro `preview`. Aun con contexto `production`, la indexación solo se habilita cuando identidad y contacto dejan de ser placeholders y `siteUrl` contiene una URL real.

### 4.2 `services.ts`

Cada servicio tiene un identificador estable y tipado, título, descripciones breve/ampliada, precio inicial, etiqueta de precio, ejemplos o notas necesarias y mensaje contextual de WhatsApp. La regla de revisión descontable forma parte de estos datos o del contenido normativo asociado, no de un texto accidental.

### 4.3 `content.ts`

Contiene propuesta de valor, navegación, pasos del proceso, confianza, alcance, cierres, etiquetas y demás copy editable que no pertenece a un servicio ni a la identidad global.

### 4.4 `tokens.css`

Centraliza valores del sistema visual que cambian como conjunto:

- colores semánticos de fondo, superficie, texto, borde, acento, foco y estados;
- familias y escala tipográfica;
- escala de espaciado;
- radios y sombras;
- ancho de contenido;
- bordes y transiciones justificadas.

Los tokens de tema describen función, no apariencia concreta. Cambiar acento, tipografía, densidad o geometría no debe exigir reestructurar componentes.

## 5. Composición de páginas

### 5.1 `BaseLayout`

Centraliza el documento base:

- `<!doctype html>` y `<html lang="es">`;
- UTF-8 y viewport responsive;
- `color-scheme`;
- título y meta description;
- meta robots según entorno;
- canonical solo cuando existe URL pública válida;
- Open Graph;
- favicon;
- importación de estilos globales;
- estructura semántica compartida.

Los metadatos se derivan mediante propiedades y configuración, no se copian manualmente entre rutas.

### 5.2 Landing

`src/pages/index.astro` compone cuatro regiones:

```text
Header / shell
└── identidad · navegación mínima · CTA

Main
├── presentación + ServiceExplorer
├── proceso + confianza
└── alcance secundario + cierre

Footer
└── condiciones · privacidad · contacto
```

En Wide, presentación y explorador pueden convivir lateralmente. En Intermediate y Compact se redistribuyen según el espacio, conservando el mismo orden lógico y DOM accesible.

### 5.3 Privacidad, condiciones y 404

Las rutas secundarias reutilizan el layout y la identidad. Privacidad explica tratamiento técnico y contacto externo; condiciones documenta precios, autorización, respaldos, alcance, garantía y exclusiones en lenguaje comprensible. La 404 orienta de vuelta a contenido útil.

## 6. `ServiceExplorer`

El patrón inicial aprobado es `<details>` + `<summary>`:

- ofrece activación nativa por teclado, ratón y tacto;
- muestra todo el catálogo sin depender de JavaScript;
- permite revelado progresivo;
- conserva el mismo significado en todos los viewports.

CSS puede presentar el conjunto como lista compacta, grid o composición selector/detalle cuando sea posible sin destruir semántica. Si el agrupamiento exclusivo mediante `name` no tiene el soporte o comportamiento deseado, es aceptable permitir más de un panel abierto antes que crear una dependencia cliente innecesaria.

Solo un conflicto técnico demostrado justificaría reemplazar **todo** el patrón por tabs accesibles conforme a WAI-ARIA. Nunca se mantienen tabs para escritorio y disclosures para móvil en paralelo.

## 7. WhatsApp

Una utilidad pura `buildWhatsAppUrl()` recibe el número centralizado y un mensaje contextual. Debe:

- normalizar el número para `wa.me` sin copiarlo en el componente;
- codificar el mensaje como parámetro URL;
- permitir un mensaje general y mensajes por servicio;
- producir un enlace normal que siga siendo funcional sin JavaScript;
- evitar colocar datos privados adicionales en la URL.

Los CTA son enlaces, no botones que simulan navegación. Su nombre accesible debe indicar que abren WhatsApp cuando ello no sea evidente por el texto visible.

## 8. CSS, temas y movimiento

`tokens.css` define el contrato visual; `base.css`, los defaults del documento; `global.css`, la composición verdaderamente global. Los componentes conservan estilos locales con nombres semánticos y especificidad baja.

La raíz contiene tokens del esquema claro y `@media (prefers-color-scheme: dark)` redefine los mismos roles. Se declara `color-scheme: light dark`. No hay selector manual ni bifurcación de componentes por tema.

No existe una cuota de animación. Cuando un movimiento no esencial se incorpore, `prefers-reduced-motion: reduce` debe eliminarlo o simplificarlo sin afectar información ni estado.

## 9. Accesibilidad por construcción

La arquitectura prioriza elementos nativos: enlaces para navegación, botones para acciones, `<details>`/`<summary>` para disclosure, landmarks y listas donde corresponde. ARIA solo completa una semántica inexistente; no repara un elemento incorrecto.

Las decisiones de estructura deben preservar:

- orden de lectura coherente aunque CSS reordene visualmente;
- una sola región `main`;
- jerarquía de encabezados lógica;
- salto o acceso directo al contenido cuando resulte apropiado;
- foco visible y no tapado por la cabecera;
- interacción táctil suficientemente amplia;
- mensajes que no dependan de color, hover o movimiento;
- reflow y zoom sin solapamientos.

## 10. SEO e indexación

SEO es una responsabilidad de layout/configuración, no una colección de strings en cada página.

- En desarrollo y previews: `noindex`, sin canonical de producción.
- En producción definitiva: indexación solo tras confirmar identidad, WhatsApp, URL, copy, robots y canonical.
- Open Graph usa un asset local y texto derivado de la página.
- `robots.txt` permite el rastreo para que cada buscador pueda leer la directiva meta de la página.
- El marcado estructurado se pospone hasta disponer de datos públicos completos y verificables.

La v1 no inventa dirección, local, horario, teléfono o entidad jurídica para enriquecer resultados.

El SVG Open Graph del prototipo es provisional. Antes de publicar se debe probar en los canales reales y, por compatibilidad amplia, exportar una versión rasterizada de 1200 × 630 —normalmente PNG— una vez cerrada la identidad.

`SeoHead.astro` emite `noindex` mientras existan placeholders o el contexto no sea producción; las páginas de error permanecen fuera del índice. `_headers` no impone un bloqueo global, porque la misma regla afectaría también a la futura producción. Cloudflare Pages añade su propia cabecera de no indexación a los despliegues preview. Solo una compilación con contexto de producción, identidad confirmada, número real y URL final puede emitir `index` y canonical.

## 11. Seguridad

La mayor reducción de riesgo proviene de no tener backend, credenciales, entradas de usuario, cookies ni dependencias cliente. `public/_headers` añade defensa en profundidad:

- CSP construida a partir de los recursos del build;
- `X-Content-Type-Options: nosniff`;
- política de referencia restrictiva y compatible;
- `Permissions-Policy` sin capacidades no usadas;
- HSTS únicamente para publicación HTTPS correcta.

La CSP se valida contra `dist/` y en navegador. No se relaja con fuentes u orígenes amplios por conveniencia. Cualquier fuente, icono o imagen requiere licencia compatible y se prefiere local/autohospedado cuando beneficie privacidad, rendimiento o estabilidad.

## 12. Rendimiento

La estrategia es evitar trabajo, no compensarlo después:

- cero runtime de framework cliente;
- scripts pequeños y diferidos solo si son necesarios;
- fuentes del sistema o un máximo razonable de archivos locales;
- SVG para iconografía simple;
- imágenes con tamaño intrínseco y optimización;
- CSS dividido por responsabilidad, sin utility framework;
- HTML generado y servido por CDN.

El build se inspecciona para mantener JS inicial < 30 KB gzip y CSS < 50 KB gzip. Lighthouse sirve como diagnóstico de laboratorio; LCP, INP y CLS se juzgan con datos reales al percentil 75 cuando haya tráfico suficiente.

## 13. Pruebas y CI

Las pruebas E2E de Playwright validan conducta pública, no la implementación interna:

- carga de rutas;
- presencia y precios de cinco servicios;
- disclosure por puntero y teclado;
- enlaces y mensajes de WhatsApp;
- temas claro/oscuro;
- viewports Compact/Wide representativos;
- privacidad, condiciones y 404;
- ausencia de errores críticos de accesibilidad mediante axe.

Proyectos mínimos: Chromium, Firefox y WebKit. La revisión manual cubre zoom, reflow, textos largos, foco, lector de pantalla básico, estados, consola y degradación sin JavaScript.

GitHub Actions debe usar la versión fijada de Node, `npm ci`, análisis estático, formato, build y pruebas. El lockfile se versiona y las versiones críticas no dependen de la máquina local.

## 14. Cloudflare Pages

La salida desplegable es `dist/` y el comando de build es `npm run build`. La integración futura con GitHub debe ejecutar el mismo entorno reproducible del CI.

El prototipo **no crea** el proyecto definitivo de Cloudflare Pages: el subdominio `*.pages.dev` depende del nombre aún pendiente. Al publicarlo:

1. confirmar nombre, número de WhatsApp y URL;
2. crear el proyecto con el nombre definitivo;
3. configurar Node/npm compatibles con el repositorio;
4. usar `npm run build` y directorio `dist`;
5. definir `SITE_DEPLOY_CONTEXT=production` únicamente en el build definitivo;
6. mantener previews con `noindex` y sin canonical definitivo;
7. permitir indexación solo en producción después de completar la configuración central y la revisión de salida;
8. comprobar cabeceras, CSP, HTTPS, enlaces, OG y 404 desde el entorno real.

Un dominio personalizado queda fuera de v1, pero se podrá adoptar cambiando la URL central, canonical y configuración de Cloudflare, sin reescribir componentes.

## 15. Alternativas descartadas

- **SPA React/Vue/Svelte:** añade runtime y estado que el producto no necesita.
- **Tailwind/Bootstrap/librería de UI:** incrementa dependencia y desplaza un sistema visual pequeño que CSS nativo resuelve mejor.
- **SSR/backend/DB/CMS:** no existe contenido dinámico ni flujo de servidor que los justifique.
- **PWA/service worker:** no hay requisito offline o instalable.
- **Tabs por viewport:** rompe la consistencia semántica del explorador.
- **Analítica de terceros:** no hay necesidad demostrada y añadiría privacidad, cookies y peso.

Una alternativa solo se reabre si aparece un requisito funcional nuevo; popularidad o preferencia técnica no bastan.
