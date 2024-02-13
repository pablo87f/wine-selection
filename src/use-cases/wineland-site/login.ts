import constants from "../../constants";
import { BrowserService } from "../../services/browser.service";

export class LoginStep {
  public constructor(private service: BrowserService) {}

  async run() {
    // LogUtils.log("Accessing page...");
    await this.service.goToPage(constants.PAGES.PREFERENCIES);

    // LogUtils.log("Making login...");
    this.service.delay(3000);
    const emailInput = await this.service.getElement(
      "#area-restrita > div.box-content > div > div.box-login > div.content > form > div:nth-child(1) > label > input[type=text]"
    );
    await emailInput?.type(process.env.WINELAND_USER as any);

    const senhaInput = await this.service.getElement('input[name="senha"]');
    await senhaInput?.type(process.env.WINELAND_PASSWORD as any);

    await this.service.delay(5000);
    const senhaBox = await senhaInput?.boundingBox();
    if (senhaBox) {
      await this.service.clickOnPage(senhaBox?.x + 43, senhaBox?.y + 100);
    }

    await this.service.delay(20000);
    const button = await this.service.getElement(
      "#area-restrita > div.box-content > div > div.box-login > div.content > form > button"
    );
    await button?.click();

    // LogUtils.log(emailInput, senhaInput, senhaBox, button);
  }
}
