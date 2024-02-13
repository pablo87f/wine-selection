import { BrowserService } from "../../services/browser.service";
import LogUtils from "../../utils/log.utils";
import { WineInfo } from "../../wine-info";

export class GetWinesInformation {
  public constructor(private service: BrowserService) {}

  async run() {
    await this.service.waitFor(".produtos-lista");
    const categoryElements =
      (await this.service.getElements(".produtos-lista")) || [];
    LogUtils.log("categoryElements", categoryElements);

    const wines: WineInfo[] = [];

    for (const categoryDiv of categoryElements) {
      const titleDiv = await categoryDiv.$(".titulo-tipo");
      const category =
        (await titleDiv?.evaluate((el) => el.textContent)) || "No category";

      const wineListElements = await categoryDiv.$$(".box-vinho  ");

      for (const wineElement of wineListElements) {
        const nameDiv = await wineElement.$(".nome");
        const wineFullName =
          (await nameDiv?.evaluate((el) => el.textContent)) || "No Name";

        const name = wineFullName.replace(/\(\w+\)/g, "").trim();

        wines.push({
          name,
          category,
        });
      }
    }

    return wines;
  }
}
