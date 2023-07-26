import puppeteer from 'puppeteer';
import { HOMEPAGE } from '@packages/bdd/HOMEPAGE';

export async function getBrowser() {
  return await puppeteer.launch({
    headless: false,
    ignoreHTTPSErrors: true,
    args: [
      `--window-size=1080,720`,
      '--enable-experimental-web-platform-features',
      '--disable-infobars',
      '--enable-usermedia-screen-capturing',
      '--allow-http-screen-capture',
      "--auto-select-desktop-capture-source='Entire screen'",
      // '--use-fake-ui-for-media-stream',
      '--ignore-certificate-errors',
      '--unsafely-treat-insecure-origin-as-secure=' + HOMEPAGE(),
    ],
  });
}
