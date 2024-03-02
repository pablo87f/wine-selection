import fs from "fs";
import { WineInfo } from "../../wine-info";

export class GetWineListJson {
  public constructor() {}

  run(filePath: string) {
    const fullFilePath = `${filePath}.json`;
    if (fs.existsSync(fullFilePath)) {
      const data = fs.readFileSync(fullFilePath, "utf8");
      if (data) {
        return JSON.parse(data) as WineInfo[];
      }
    }
    return undefined;
  }
}
