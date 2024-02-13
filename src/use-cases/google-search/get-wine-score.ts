import { BrowserService } from "../../services/browser.service";
import { WineInfo } from "../../wine-info";

export class GetWineScore {
  public constructor(private service: BrowserService) {}

  async run(wine: WineInfo) {
    const googlePage = await this.service.goToPage("https://www.google.com.br");
    await googlePage.type(
      '[title="Pesquisar"]',
      `${wine.name} ${String.fromCharCode(13)}`,
      { delay: 20 }
    );
    await googlePage.waitForSelector("::-p-text(Shopping)");
    // await googlePage.waitForSelector(".TbwUpd");
    const shoppingButton = await googlePage.$("::-p-text(Shopping)");
    if (shoppingButton) {
      await shoppingButton.click();
    }
    // #APjFqb
  }
}
