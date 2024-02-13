import puppeteer, {
  Browser,
  ElementHandle,
  Page,
  PuppeteerLaunchOptions,
} from "puppeteer";

export class BrowserService {
  private browser?: Browser;
  private currentPage?: Page;
  private options?: PuppeteerLaunchOptions;

  public constructor(options?: PuppeteerLaunchOptions | undefined) {
    this.browser = undefined;
    this.currentPage = undefined;
    this.options = options;
  }

  async getBrowser(): Promise<Browser> {
    if (!this.browser) {
      this.browser = await puppeteer.launch(this.options);
    }
    return this.browser;
  }

  async goToPage(url: string) {
    const browser = await this.getBrowser();
    this.currentPage = await browser.newPage();
    await this.currentPage.goto(url, { waitUntil: "load" });
    await this.currentPage.setViewport({ width: 2000, height: 1000 });
    return this.currentPage;
  }

  async waitFor(selector: string, timeout = 5000) {
    await this.currentPage?.waitForSelector(selector, { timeout });
  }

  async close() {
    await this.browser?.close();
  }

  async getElement(selector: string): Promise<ElementHandle<Element> | null> {
    if (this.currentPage) {
      return await this.currentPage.$(selector);
    }
    return null;
  }

  async getElements(
    selector: string
  ): Promise<ElementHandle<Element>[] | null> {
    if (this.currentPage) {
      return await this.currentPage.$$(selector);
    }
    return [] as ElementHandle<Element>[];
  }

  async clickOnPage(x: number, y: number) {
    if (this.currentPage) {
      await this.currentPage.mouse.click(x, y);
    }
  }

  delay = (ms: number) => new Promise((_) => setTimeout(_, ms));
}
