import fs from "fs";
import { WineInfo } from "../../wine-info";

export class GetWineList {
  public constructor() {}

  run(filePath: string) {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, "utf8");

      if (data) {
        return JSON.parse(data) as WineInfo[];
      }
    }
    return undefined;
  }
}
