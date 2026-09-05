import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';

const services = [
  {
    name: 'Computadora lenta',
    price: '₡10.000',
    messageNeedle: 'computadora lenta',
  },
  {
    name: 'Problemas y errores',
    price: '₡10.000',
    messageNeedle: 'problema',
  },
  {
    name: 'Instalación y configuración',
    price: '₡12.000',
    messageNeedle: 'instalación y configuración',
  },
  {
    name: 'Automatizaciones',
    price: '₡15.000',
    messageNeedle: 'automatizaciones',
  },
  {
    name: 'No sé qué tiene',
    price: '₡5.000',
    messageNeedle: 'revisión',
  },
] as const;

const contentRoutes = [
  { path: '/', status: 200 },
  { path: '/privacidad/', status: 200 },
  { path: '/condiciones/', status: 200 },
  { path: '/esta-ruta-no-existe/', status: 404 },
] as const;
const viewports = [
  { name: 'compacto', width: 320, height: 720 },
  { name: 'intermedio', width: 768, height: 900 },
  { name: 'amplio', width: 1440, height: 900 },
] as const;

function normalize(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLocaleLowerCase('es');
}

async function expectNoHorizontalOverflow(page: Page): Promise<void> {
  const widths = await page.evaluate(() => {
    const root = document.documentElement;

    return {
      client: root.clientWidth,
      scroll: Math.max(root.scrollWidth, document.body.scrollWidth),
    };
  });

  expect(
    widths.scroll,
    `El documento mide ${widths.scroll}px dentro de un viewport de ${widths.client}px.`,
  ).toBeLessThanOrEqual(widths.client + 1);
}

async function themePaint(page: Page, colorScheme: 'light' | 'dark') {
  await page.emulateMedia({ colorScheme });
  await page.goto('/');

  return page.evaluate(() => {
    const root = getComputedStyle(document.documentElement);
    const body = getComputedStyle(document.body);

    return {
      colorScheme: root.colorScheme,
      foreground: `${root.color}|${body.color}`,
      background: `${root.backgroundColor}|${body.backgroundColor}`,
    };
  });
}

test.describe('página principal', () => {
  test('expone estructura semántica, metadatos y reglas del servicio', async ({ page }) => {
    const response = await page.goto('/');

    expect(response?.ok()).toBe(true);
    await expect(page.locator('html')).toHaveAttribute('lang', /^es(?:-|$)/i);
    await expect(page.getByRole('main')).toBeVisible();
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
    await expect(page).toHaveTitle(/servicio|soporte|comput/i);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.{20,}/);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);

    const main = page.getByRole('main');
    await expect(main).toContainText(/cita/i);
    await expect(main).toContainText(/software/i);
    await expect(main).toContainText(/hardware/i);
    await expect(main).toContainText(/técnico de confianza/i);
  });

  test('publica los cinco servicios y sus precios de lanzamiento', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('details')).toHaveCount(5);
    await expect(page.locator('[role="tablist"]')).toHaveCount(0);
    await expect(page.locator('[role="tab"]')).toHaveCount(0);

    for (const service of services) {
      const details = page
        .locator('details')
        .filter({ has: page.locator('summary', { hasText: service.name }) });

      await expect(details, `No se encontró «${service.name}».`).toHaveCount(1);
      await expect(details).toContainText(service.price);
    }

    const diagnostic = page
      .locator('details')
      .filter({ has: page.locator('summary', { hasText: services[4].name }) });
    await expect(diagnostic).toContainText(/los ₡5\.000 de la revisión se descuentan del total/i);
  });

  test('details/summary funciona con teclado y conserva un solo modelo de interacción', async ({
    page,
  }) => {
    await page.goto('/');

    const diagnostic = page.locator('details[data-featured="true"]');
    const details = page
      .locator('details')
      .filter({ has: page.locator('summary', { hasText: services[0].name }) });
    const summary = details.locator('summary');

    await expect(diagnostic).toHaveAttribute('open', '');
    await expect(details).not.toHaveAttribute('open', '');
    await summary.focus();
    await expect(summary).toBeFocused();

    await summary.press('Enter');
    await expect(details).toHaveAttribute('open', '');
    await expect(diagnostic).not.toHaveAttribute('open', '');

    await summary.press('Space');
    await expect(details).not.toHaveAttribute('open', '');

    await page.keyboard.press('Tab');
    await expect(page.locator('summary', { hasText: services[1].name })).toBeFocused();
  });

  test('el enlace de salto es el primer control y su foco es visible', async ({ page }) => {
    await page.goto('/');

    const skipLink = page.getByRole('link', { name: 'Saltar al contenido' });
    const firstFocusable = page
      .locator('a[href], button, input, select, textarea, [tabindex]')
      .first();

    await expect(firstFocusable).toHaveText('Saltar al contenido');
    await skipLink.focus();
    await expect(skipLink).toBeFocused();
    await expect(skipLink).toBeVisible();

    const focusStyle = await skipLink.evaluate((element) => {
      const style = getComputedStyle(element);
      return {
        outlineStyle: style.outlineStyle,
        outlineWidth: Number.parseFloat(style.outlineWidth),
      };
    });

    expect(focusStyle.outlineStyle).not.toBe('none');
    expect(focusStyle.outlineWidth).toBeGreaterThanOrEqual(2);
  });

  test('no registra errores de consola, página ni recursos al cargar', async ({ page }) => {
    const errors: string[] = [];

    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(`consola: ${message.text()}`);
    });
    page.on('pageerror', (error) => errors.push(`página: ${error.message}`));
    page.on('requestfailed', (request) => {
      errors.push(`recurso: ${request.url()} (${request.failure()?.errorText ?? 'error'})`);
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    expect(errors).toEqual([]);
  });

  test('los enlaces internos y recursos declarados responden correctamente', async ({ page }) => {
    await page.goto('/');

    const urls = await page
      .locator('a[href^="/"], link[rel="stylesheet"], link[rel="icon"], img[src^="/"]')
      .evaluateAll((elements) => [
        ...new Set(
          elements
            .map((element) => element.getAttribute('href') ?? element.getAttribute('src'))
            .filter((value): value is string => Boolean(value)),
        ),
      ]);

    for (const url of urls) {
      const response = await page.request.get(url);
      expect(response.status(), url).toBeLessThan(400);
    }
  });

  test('cada servicio genera una URL de WhatsApp válida y un mensaje contextual', async ({
    page,
  }) => {
    await page.goto('/');

    const configuredNumbers = new Set<string>();

    for (const service of services) {
      const details = page
        .locator('details')
        .filter({ has: page.locator('summary', { hasText: service.name }) });
      const contactLink = details.locator('a[href*="wa.me/"]');

      await expect(contactLink).toHaveCount(1);

      const href = await contactLink.getAttribute('href');
      expect(href).not.toBeNull();

      const url = new URL(href!);
      const number = url.pathname.slice(1);
      const message = url.searchParams.get('text') ?? '';

      expect(url.protocol).toBe('https:');
      expect(url.hostname).toBe('wa.me');
      expect(number).toMatch(/^\d{8,15}$/);
      expect(message.length).toBeGreaterThan(10);
      expect(normalize(message)).toContain(normalize(service.messageNeedle));
      await expect(contactLink).not.toHaveAttribute('aria-label', /por WhatsApp por WhatsApp/i);
      configuredNumbers.add(number);
    }

    expect(configuredNumbers.size).toBe(1);
  });

  test('respeta automáticamente los esquemas claro y oscuro', async ({ page }) => {
    const light = await themePaint(page, 'light');
    const dark = await themePaint(page, 'dark');

    expect(light.colorScheme).toContain('light');
    expect(dark.colorScheme).toContain('dark');
    expect(dark.background).not.toBe(light.background);
    expect(dark.foreground).not.toBe(light.foreground);
  });
});

test.describe('información legal y estados de navegación', () => {
  test('privacidad y condiciones son navegables y contienen las salvaguardas acordadas', async ({
    page,
  }) => {
    await page.goto('/');

    const privacyLink = page.getByRole('link', { name: /privacidad/i }).first();
    await expect(privacyLink).toBeVisible();
    await privacyLink.click();
    await expect(page).toHaveURL(/\/privacidad\/?$/);
    await expect(page.getByRole('heading', { level: 1, name: /privacidad/i })).toBeVisible();
    const privacy = await page.getByRole('main').innerText();

    await page.goto('/');
    const conditionsLink = page.getByRole('link', { name: /condiciones|términos/i }).first();
    await expect(conditionsLink).toBeVisible();
    await conditionsLink.click();
    await expect(page).toHaveURL(/\/condiciones\/?$/);
    await expect(
      page.getByRole('heading', {
        level: 1,
        name: /condiciones|términos/i,
      }),
    ).toBeVisible();
    const conditions = await page.getByRole('main').innerText();

    const legalCopy = normalize(`${privacy} ${conditions}`);
    expect(legalCopy).toMatch(/privacidad|datos personales|confidencial/);
    expect(legalCopy).toMatch(/respaldo|copia de seguridad/);
    expect(legalCopy).toMatch(/autoriz/);
    expect(legalCopy).toMatch(/precio/);
    expect(legalCopy).toMatch(/garant/);
    expect(legalCopy).toMatch(/exclusion|no incluye|fuera de alcance/);
    expect(legalCopy).toMatch(/pirat|crack|activador|licencia no autorizada/);
  });

  test('una ruta inexistente responde 404 y ofrece una salida comprensible', async ({ page }) => {
    const response = await page.goto('/esta-ruta-no-existe/');

    expect(response?.status()).toBe(404);
    await expect(page.getByRole('heading', { level: 1, name: /404|no encontrad/i })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Volver al inicio', exact: true })).toBeVisible();
  });
});

test('el contenido esencial y ServiceExplorer funcionan sin JavaScript', async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({
    baseURL: baseURL ?? 'http://127.0.0.1:4321',
    javaScriptEnabled: false,
    locale: 'es-CR',
    colorScheme: 'dark',
    viewport: { width: 320, height: 720 },
  });

  try {
    const page = await context.newPage();
    const response = await page.goto('/');

    expect(response?.ok()).toBe(true);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.locator('details')).toHaveCount(5);
    await expect(page.locator('a[href*="wa.me/"]').first()).toBeVisible();

    const closedDetails = page
      .locator('details')
      .filter({ has: page.locator('summary', { hasText: services[0].name }) });
    const closedSummary = closedDetails.locator('summary');
    await expect(closedDetails).not.toHaveAttribute('open', '');
    await closedSummary.focus();
    await closedSummary.press('Enter');
    await expect(closedDetails).toHaveAttribute('open', '');
  } finally {
    await context.close();
  }
});

test('el contenido no desborda en 320, 768 ni 1440 px, en claro y oscuro', async ({ page }) => {
  for (const viewport of viewports) {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });

    for (const colorScheme of ['light', 'dark'] as const) {
      await page.emulateMedia({ colorScheme });

      for (const route of contentRoutes) {
        const response = await page.goto(route.path);

        expect([route.status, 304], `${route.path}, ${viewport.name}, ${colorScheme}`).toContain(
          response?.status(),
        );
        await expect(page.getByRole('main')).toBeVisible();
        await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
        await expectNoHorizontalOverflow(page);
      }
    }
  }
});

test.describe('WCAG 2.2 AA', () => {
  for (const route of contentRoutes) {
    test(`${route.path} no presenta violaciones automáticas en ambos temas`, async ({ page }) => {
      for (const colorScheme of ['light', 'dark'] as const) {
        await page.emulateMedia({ colorScheme, reducedMotion: 'reduce' });
        const response = await page.goto(route.path);
        expect([route.status, 304]).toContain(response?.status());

        await page.locator('details').evaluateAll((nodes) => {
          for (const node of nodes) {
            node.removeAttribute('name');
            (node as HTMLDetailsElement).open = true;
          }
        });

        const results = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
          .analyze();
        const summary = results.violations
          .map(
            ({ id, impact, nodes }) =>
              `${id} (${impact ?? 'impacto desconocido'}): ${nodes.length} nodo(s)`,
          )
          .join('\n');

        expect(results.violations, `${route.path} en tema ${colorScheme}\n${summary}`).toEqual([]);
      }
    });
  }
});
