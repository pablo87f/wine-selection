import { BrowserService } from "../../services/browser.service";
import { WineInfo } from "../../wine-info";

export class GetWineScore {
  public constructor(private service: BrowserService) {}

  async run(wine: WineInfo) {
    const sitePage = await this.service.goToPage(
      "https://www.vinhoscollection.com.br"
    );
    await this.service.delay(2000);
    await sitePage.waitForSelector("#AcessoRestritoIdade");
    const modal = await sitePage.$("#AcessoRestritoIdade");
    const confirm = await modal?.$("::-p-text(Sim)");
    await confirm?.click();

    const searchInput = await sitePage.$("#auto-complete");
    searchInput?.type(
      `${wine.name.replace(/(.+?)/g, "")} ${String.fromCharCode(13)}`
    );
    // await sitePage.waitForSelector(".busca");
    // await sitePage.type(
    //   ".busca > input",
    //   `${wine.name} ${String.fromCharCode(13)}`,
    //   {
    //     delay: 20,
    //   }
    // );
    // await sitePage.waitForSelector("::-p-text(Shopping)");

    // // await googlePage.waitForSelector(".TbwUpd");
    // const shoppingButton = await sitePage.$("::-p-text(Sim)");
    // if (shoppingButton) {
    //   await shoppingButton.click();
    // }
    // #APjFqb
  }
}
