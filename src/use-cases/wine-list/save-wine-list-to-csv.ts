import { WineInfo } from "../../wine-info";
import fs from "fs";

export class SaveWineListToCsv {
  public constructor() {}

  protected formatToCsv({ name, category, vivinoInfo}: WineInfo) {
    return `${name},${category},${vivinoInfo?.score},${vivinoInfo?.title}, ${vivinoInfo?.link}`.replace(/\n/g, "");
  }
  run(wineList: WineInfo[], filePath: string) {
  
    const header = "Name,Category,VivinoScore,VivinoTitle,VivinoLink";
    const contentList = wineList.map(this.formatToCsv);
    const fullContent = `${header}\n${contentList.join("\n")}`;


    fs.writeFileSync(`${filePath}.csv`, fullContent);
  }
}
