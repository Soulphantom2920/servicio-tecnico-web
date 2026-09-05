# Convenciones del proyecto

Estas reglas mantienen la v1 editable, predecible y pequeña. Aplican a código, contenido, assets, pruebas y documentación.

## 1. Nomenclatura

| Elemento                 | Convención                                                  | Ejemplo                            |
| ------------------------ | ----------------------------------------------------------- | ---------------------------------- |
| Directorios              | `kebab-case`                                                | `service-explorer/`                |
| Rutas                    | minúsculas, sin tildes, `kebab-case` si hay varias palabras | `/privacidad`, `/condiciones`      |
| Componentes Astro        | `PascalCase.astro`                                          | `ServiceExplorer.astro`            |
| Layouts Astro            | `PascalCase.astro`                                          | `BaseLayout.astro`                 |
| Datos y configuración TS | `camelCase.ts`                                              | `siteConfig.ts`, `services.ts`     |
| Utilidades TS            | operación en `camelCase.ts`                                 | `buildWhatsAppUrl.ts`              |
| Archivos de tipos        | `PascalCase.ts`                                             | `Service.ts`                       |
| Variables y funciones    | `camelCase`                                                 | `startingPrice`, `formatColones()` |
| Tipos e interfaces       | `PascalCase`                                                | `Service`, `SiteConfig`            |
| Constantes exportadas    | `camelCase` salvo constante verdaderamente global           | `siteConfig`, `services`           |
| CSS global               | minúsculas                                                  | `tokens.css`, `base.css`           |
| Clases CSS               | semánticas, minúsculas y con guion                          | `.service-summary`                 |
| Assets                   | `kebab-case` descriptivo                                    | `og-image.svg`                     |

No se usan nombres temporales como `final2.svg`, `new-new-icon` o `IMG_12345`. No se crean barrel files (`index.ts`) salvo que simplifiquen de forma demostrable una API estable; en este tamaño se prefieren imports directos.

## 2. Organización y responsabilidad

- Un archivo debe tener una responsabilidad reconocible.
- Una carpeta se crea cuando contiene trabajo real; no para imitar un árbol ideal vacío.
- Un componente se extrae si se reutiliza, posee semántica propia, encapsula comportamiento o mejora materialmente la lectura.
- No se crean `Box.astro`, `Wrapper.astro`, `Title.astro` ni componentes equivalentes sin una responsabilidad concreta.
- `index.astro` compone la página; no debe convertirse en un monolito que contenga todos los datos, estilos y reglas.
- Imports internos desde `src` usan el alias `@/` cuando mejora claridad.
- Las dependencias entre capas fluyen de páginas/componentes hacia configuración, datos, tipos y utilidades; datos y utilidades no importan componentes.

## 3. Fuente única de verdad

Nunca se hardcodea en varios componentes un dato del negocio que pueda cambiar.

| Tipo de dato                                              | Fuente                              |
| --------------------------------------------------------- | ----------------------------------- |
| Nombre, prestador, WhatsApp, ubicación y URL              | `src/config/siteConfig.ts`          |
| Servicios, precios, descripciones y mensajes contextuales | `src/data/services.ts`              |
| Copy de presentación, proceso, confianza y cierre         | `src/data/content.ts` o equivalente |
| Colores, tipografía, espacios, radios, sombras y ancho    | `src/styles/tokens.css`             |

Un cambio de nombre, número, precio, texto, acento, tipografía, escala espacial, radios, sombra o ancho de contenido debe ser localizado y no exigir una reescritura estructural.

No se tokeniza cada píxel. Un valor merece configuración o token si forma parte del sistema, aparece en más de un lugar con el mismo significado o tiene probabilidad razonable de cambiar.

## 4. TypeScript y Astro

- Se mantiene la configuración estricta de Astro; el repositorio usa `astro/tsconfigs/strictest`, que supera el mínimo aprobado de `strict`.
- Evitar `any`. Si una frontera externa requiere tipo desconocido, usar `unknown` y validarlo.
- Los datos estáticos se declaran inmutables cuando resulte útil (`as const`, `readonly`).
- Las uniones literales se prefieren para identificadores cerrados de servicios o variantes.
- Las funciones utilitarias son pequeñas, puras y fáciles de probar.
- No introducir estado global ni abstracciones asíncronas para datos locales de build.
- Las propiedades de componentes se tipan explícitamente.
- No usar directivas de hidratación si el componente no necesita ejecutarse en el navegador.
- Un script cliente requiere una razón descrita por el comportamiento que añade.
- No dejar `console.log`; ESLint solo permite advertencias o errores intencionales.

## 5. HTML semántico

- Enlaces navegan; botones ejecutan acciones.
- Usar `header`, `nav`, `main`, `section`, `article`, `aside` y `footer` según función, no por estilo.
- Mantener una jerarquía de encabezados que describa el documento.
- Usar listas para conjuntos de servicios, pasos o enlaces cuando corresponda.
- El logo o nombre enlaza al inicio; no se simula con un `div` clicable.
- Toda imagen informativa tiene alternativa útil; una imagen decorativa usa alternativa vacía.
- No añadir ARIA cuando el elemento nativo ya expresa el significado.
- No usar `tabindex` positivo ni depender de orden visual para corregir un DOM incoherente.
- Los enlaces externos deben comunicar su destino por texto o contexto. No se añade `target="_blank"` por costumbre.

## 6. Accesibilidad

- WCAG 2.2 AA es criterio de aceptación, no tarea final de pulido.
- Todas las acciones esenciales deben funcionar con teclado.
- `:focus-visible` debe ser claro en ambos temas y no se elimina el outline sin reemplazo equivalente.
- El foco no puede quedar oculto tras elementos fijos.
- Los objetivos interactivos respetan tamaño/separación suficiente y mantienen una zona táctil cómoda.
- Estados, precios y selección no dependen exclusivamente del color.
- Se verifica contraste de texto, bordes relevantes y foco en ambos temas.
- El layout debe tolerar 200 % de zoom, reflow estrecho y textos más largos.
- Si aparece validación o estado dinámico, debe exponerse también a tecnologías de asistencia.
- Movimiento no esencial respeta `prefers-reduced-motion`.

## 7. CSS

### 7.1 Distribución

- `tokens.css`: únicamente variables del sistema visual.
- `base.css`: normalización ligera, documento, tipografía, enlaces, medios, controles y foco.
- `global.css`: imports y reglas realmente compartidas.
- `<style>` del componente Astro: presentación específica del componente.

### 7.2 Reglas

- Usar propiedades personalizadas semánticas: `--color-text`, no `--gray-900-text` o `--dark-card`.
- Clases por función: `.service-summary`, no `.blue-box` o `.big-title`.
- Mantener especificidad baja; preferir selectores de clase cortos.
- No usar IDs para estilo.
- Evitar `!important`; una excepción debe explicar el conflicto técnico.
- Preferir propiedades lógicas (`margin-inline`, `padding-block`) cuando expresen mejor la intención.
- Breakpoints se introducen donde el contenido pierde calidad, no por marca de dispositivo.
- Usar Grid/Flexbox y funciones fluidas antes que posiciones absolutas frágiles.
- Reservar dimensiones de medios para evitar CLS.
- No ocultar contenido esencial solo para reducir altura.
- Hover nunca es la única forma de revelar una acción.

## 8. Copy y contenido

- Español neutro, frases directas y términos cotidianos.
- Hablar de problemas y resultados antes que de herramientas.
- No prometer resultados absolutos, disponibilidad permanente ni tiempos no confirmados.
- “Desde” acompaña todo precio inicial variable.
- La revisión explica siempre su descuento cuando se contrata la solución.
- No presentar al prestador como ingeniero graduado, técnico certificado, empresa o taller físico.
- No usar miedo, urgencia artificial ni afirmaciones de seguridad imposibles.
- No anunciar piratería, activaciones no autorizadas o servicios excluidos.
- Los placeholders deben estar identificados y nunca maquillarse como datos definitivos.

## 9. Temas y tokens

Los componentes consumen el mismo conjunto de tokens en claro y oscuro. La media query de preferencia redefine valores, no estructura. No se crean clases `.dark-*`, propiedades `darkCard` ni lógica TypeScript para detectar el tema si CSS puede resolverlo.

Cada estado interactivo debe evaluarse en los dos esquemas:

- reposo;
- hover cuando exista;
- foco visible;
- active/pressed;
- abierto/cerrado;
- visitado cuando sea relevante;
- deshabilitado si llegara a existir.

## 10. Assets y dependencias

- Preferir SVG local para iconos simples y el pipeline de Astro para imágenes procesables.
- `public/` contiene únicamente archivos que deben conservarse sin transformación: favicon, robots, cabeceras y OG si así se decidió.
- No usar icon fonts ni instalar un paquete completo por unos pocos iconos.
- Toda fuente, fotografía, ilustración e icono debe tener licencia compatible y procedencia documentable.
- Un paquete nuevo requiere necesidad funcional, revisión de peso, licencia, mantenimiento, seguridad y alternativa nativa.
- Las versiones se fijan y `package-lock.json` se versiona.
- No se añade una dependencia de runtime cliente para resolver una interacción nativa.

## 11. Seguridad, privacidad y SEO

- No incluir secretos en el repositorio ni en variables `PUBLIC_*`; todo lo enviado al navegador es público.
- La URL de WhatsApp solo incluye el número comercial y copy contextual previsto.
- No añadir formularios, trackers, cookies o scripts externos sin reabrir requisitos de privacidad y seguridad.
- Cambios de CSP se validan contra el build y todos los navegadores objetivo.
- No usar `unsafe-inline`, wildcards o dominios completos sin justificación específica.
- Canonical e indexación dependen del entorno; previews nunca se hacen pasar por producción.
- No inventar datos para SEO o JSON-LD.

## 12. Pruebas

- Nombrar tests por conducta observable: `muestra los cinco precios`, no `itera services`.
- Priorizar roles, nombres accesibles y texto estable sobre clases CSS o estructura DOM accidental.
- Usar `data-testid` solo cuando no exista un selector semántico estable.
- Cada corrección de una regresión relevante debe añadir o ajustar una prueba proporcionada al riesgo.
- E2E cubre Chromium, Firefox y WebKit.
- Probar temas con emulación de `colorScheme` y viewports representativos, no una lista de modelos comerciales.
- La auditoría axe no sustituye teclado, zoom, contraste, lector de pantalla básico ni inspección visual.
- Las snapshots visuales se actualizan solo después de revisar intencionalmente el cambio.

## 13. Formato y validación

Antes de integrar un cambio:

```sh
npm run check
npm run lint
npm run format:check
npm run build
npm run test:e2e
```

`npm run format` puede modificar archivos; se usa de forma consciente y se revisa el diff. El build generado, reportes y resultados de prueba no se versionan.

## 14. Git y commits

Se usa Git/GitHub con Conventional Commits ligeros:

- `feat:` funcionalidad visible;
- `fix:` corrección;
- `docs:` documentación;
- `style:` formato sin cambio funcional;
- `refactor:` reorganización sin cambio de conducta;
- `test:` pruebas;
- `chore:` herramientas, dependencias o mantenimiento.

El asunto es imperativo, breve y describe una unidad coherente, por ejemplo: `feat: add native service explorer`. No mezclar refactors extensos y cambios funcionales no relacionados en el mismo commit.

## 15. Revisión de cambios

Cada revisión debe comprobar:

1. que no duplica datos o tokens;
2. que mantiene alcance y lenguaje aprobados;
3. que conserva semántica y teclado;
4. que funciona en ambos temas y composiciones;
5. que no añade peso o dependencia sin justificación;
6. que no cambia indexación, privacidad o cabeceras accidentalmente;
7. que pruebas, documentación y placeholders siguen reflejando el estado real.
