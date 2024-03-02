import { WineInfo } from "../../wine-info";
import fs from "fs";

export class SaveWineListToJson {
  public constructor() {}

  run(wineList: WineInfo[], filePath: string) {
    fs.writeFileSync(`${filePath}.json`, JSON.stringify(wineList, null, 2));
  }
}
