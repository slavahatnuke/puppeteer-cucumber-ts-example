import {Browser, Page} from "puppeteer";

export type IBrowserWorld = {
  browser: Browser;
  page: Page;
};