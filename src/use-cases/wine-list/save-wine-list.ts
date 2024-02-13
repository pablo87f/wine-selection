import { WineInfo } from "../../wine-info";
import fs from "fs";

export class SaveWineList {
  public constructor() {}

  run(wineList: WineInfo[], filePath: string) {
    fs.writeFileSync(filePath, JSON.stringify(wineList, null, 2));
  }
}
