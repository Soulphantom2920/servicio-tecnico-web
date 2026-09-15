import { readdir, readFile } from 'node:fs/promises';
import { extname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const distRoot = join(projectRoot, 'dist');
const limits = {
  clientJavaScriptGzip: 30 * 1024,
  cssGzip: 50 * 1024,
};

async function listFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nestedFiles = await Promise.all(
    entries.map((entry) => {
      const entryPath = join(directory, entry.name);
      return entry.isDirectory() ? listFiles(entryPath) : [entryPath];
    }),
  );

  return nestedFiles.flat();
}

function assertBuild(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const files = await listFiles(distRoot);
const htmlFiles = files.filter((file) => extname(file) === '.html');
const cssFiles = files.filter((file) => extname(file) === '.css');
const scriptFiles = files.filter((file) => ['.js', '.mjs'].includes(extname(file)));

let cssGzip = 0;
for (const file of cssFiles) {
  cssGzip += gzipSync(await readFile(file)).byteLength;
}

let clientJavaScriptGzip = 0;
for (const file of scriptFiles) {
  clientJavaScriptGzip += gzipSync(await readFile(file)).byteLength;
}

assertBuild(
  clientJavaScriptGzip < limits.clientJavaScriptGzip,
  `JavaScript cliente: ${clientJavaScriptGzip} B gzip; límite: ${limits.clientJavaScriptGzip} B.`,
);
assertBuild(cssGzip < limits.cssGzip, `CSS: ${cssGzip} B gzip; límite: ${limits.cssGzip} B.`);

for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const fileLabel = relative(distRoot, file);

  assertBuild(!/<script(?:\s|>)/i.test(html), `${fileLabel} contiene JavaScript inline o cliente.`);
  assertBuild(!/<style(?:\s|>)/i.test(html), `${fileLabel} contiene un bloque de estilo inline.`);
  assertBuild(!/\sstyle\s*=/i.test(html), `${fileLabel} contiene un atributo style inline.`);
  assertBuild(/<html\s+lang="es"/i.test(html), `${fileLabel} no declara lang="es".`);

  if (/name="robots"\s+content="noindex/i.test(html)) {
    assertBuild(!/rel="canonical"/i.test(html), `${fileLabel} combina noindex con canonical.`);
  } else {
    assertBuild(
      /name="robots"\s+content="index/i.test(html),
      `${fileLabel} no declara una directiva robots reconocida.`,
    );
    assertBuild(/rel="canonical"/i.test(html), `${fileLabel} permite indexar sin canonical.`);
    assertBuild(/property="og:url"/i.test(html), `${fileLabel} permite indexar sin og:url.`);
    assertBuild(/property="og:image"/i.test(html), `${fileLabel} permite indexar sin og:image.`);
  }
}

const notFoundHtml = await readFile(join(distRoot, '404.html'), 'utf8');
assertBuild(
  /name="robots"\s+content="noindex/i.test(notFoundHtml),
  '404.html debe permanecer en noindex.',
);

const requiredFiles = [
  '404.html',
  '_headers',
  'robots.txt',

  'brand/logo/opal-bitwise-horizontal-black-opal.png',
  'brand/logo/opal-bitwise-horizontal-white-opal.png',

  'brand/symbol/opal-bitwise-symbol-black-opal.svg',
  'brand/symbol/opal-bitwise-symbol-black-opal.png',
  'brand/symbol/opal-bitwise-symbol-white-opal.svg',
  'brand/symbol/opal-bitwise-symbol-white-opal.png',

  'brand/favicon/black/favicon-black-opal-16.png',
  'brand/favicon/black/favicon-black-opal-32.png',
  'brand/favicon/black/favicon-black-opal-48.png',
  'brand/favicon/black/favicon-black-opal-64.png',
  'brand/favicon/black/favicon-black-opal-180.png',
  'brand/favicon/black/favicon-black-opal-192.png',
  'brand/favicon/black/favicon-black-opal-512.png',

  'brand/favicon/white/favicon-white-opal-16.png',
  'brand/favicon/white/favicon-white-opal-32.png',
  'brand/favicon/white/favicon-white-opal-48.png',
  'brand/favicon/white/favicon-white-opal-64.png',
  'brand/favicon/white/favicon-white-opal-180.png',
  'brand/favicon/white/favicon-white-opal-192.png',
  'brand/favicon/white/favicon-white-opal-512.png',

  'brand/social/opal-bitwise-og-image.png',
];
for (const requiredFile of requiredFiles) {
  assertBuild(
    files.some((file) => relative(distRoot, file).replaceAll('\\', '/') === requiredFile),
    `Falta dist/${requiredFile}.`,
  );
}

const obsoleteFiles = ['favicon.svg', 'og-image.png', 'og-image.svg'];

for (const obsoleteFile of obsoleteFiles) {
  assertBuild(
    !files.some((file) => relative(distRoot, file).replaceAll('\\', '/') === obsoleteFile),
    `El build todavía contiene el asset provisional dist/${obsoleteFile}.`,
  );
}

const headers = await readFile(join(distRoot, '_headers'), 'utf8');
assertBuild(headers.includes('Content-Security-Policy:'), 'Falta Content-Security-Policy.');
assertBuild(!headers.includes("'unsafe-inline'"), 'La CSP contiene unsafe-inline.');
assertBuild(
  !/X-Robots-Tag:\s*noindex/i.test(headers),
  '_headers bloquea globalmente la futura indexación de producción.',
);

const robots = await readFile(join(distRoot, 'robots.txt'), 'utf8');
assertBuild(/Allow:\s*\/$/im.test(robots), 'robots.txt debe permitir leer las directivas meta.');
assertBuild(!/Disallow:\s*\/$/im.test(robots), 'robots.txt bloquea todo el rastreo.');

process.stdout.write(
  [
    'Build verificado.',
    `JavaScript cliente: ${clientJavaScriptGzip} B gzip (límite < ${limits.clientJavaScriptGzip} B).`,
    `CSS: ${cssGzip} B gzip (límite < ${limits.cssGzip} B).`,
    `HTML revisado: ${htmlFiles.length} páginas, sin scripts ni estilos inline.`,
  ].join('\n') + '\n',
);
