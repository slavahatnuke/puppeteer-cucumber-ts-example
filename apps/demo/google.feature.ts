import {After, Before, Given, Then, When} from '@cucumber/cucumber';
import expect from 'expect';
import {getBrowser} from "@packages/bdd/getBrowser";
import {GOOGLE_HOMEPAGE} from "@packages/bdd/HOMEPAGE";
import {IBrowserWorld} from "@packages/bdd/IBrowserWorld";
import {assertElementPresent, getElement} from "@packages/bdd/getElement";

export type IGoogleWorld = IBrowserWorld;
Before(async function (this: IGoogleWorld) {
});

After(async function (this: IGoogleWorld) {
  if (this.browser) {
    await this.browser.close();
  }
});

Given('I am on the Google search page', async function (this: IGoogleWorld) {
  this.browser = await getBrowser();
  this.page = await this.browser.newPage();
  await this.page.goto(GOOGLE_HOMEPAGE());

  // await delay(5000000);
  // css3 support
  await assertElementPresent(this.page, 'button:contains(Aceitar tudo)');
  (await getElement(this.page, 'button:contains(Aceitar tudo)')).click();

});

async function delay(timeout: number) {
  await new Promise(resolve => setTimeout(resolve, timeout));
}

When('I enter {string} into the search box', async function (this: IGoogleWorld, searchTerm: string) {
  await this.page.waitForSelector('textarea[name="q"]');
  await this.page.click('textarea[name="q"]');
  await this.page.type('textarea[name="q"]', searchTerm);
});

When('I click the Google Search button', async function (this: IGoogleWorld) {
  await assertElementPresent(this.page, 'input[value="Pesquisa Google"]');
  await delay(500);
  (await getElement(this.page, 'input[value="Pesquisa Google"]')).click();
});

Then('I should see search results', async function (this: IGoogleWorld) {
  await this.page.waitForSelector('#search');
  const title = await this.page.title();
  expect(title).toContain('Puppeteer with Cucumber in TypeScript');

  // just for demo
  await delay(5000);
});
