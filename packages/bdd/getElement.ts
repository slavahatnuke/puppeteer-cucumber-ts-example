import {ElementHandle, Page} from 'puppeteer';
import {waitForAssertion} from '@packages/bdd/wait-for';

const select = require('puppeteer-select');

export async function getElement<ElementType extends Element = Element>(
  page: Page,
  selector: string,
): Promise<ElementHandle<ElementType>> {
  return await select(page).getElement(selector);
}

export async function assertElementPresent(
  page: Page,
  selector: string,
): Promise<void> {
  await waitForAssertion(async () => {
    await select(page).assertElementPresent(selector);
  });
}
