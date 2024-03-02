import { BrowserService } from "./services/browser.service";
import { GetWineVivinoInfo } from "./use-cases/vivino-site/get-wine-vivino-info";
import { GetWineListJson } from "./use-cases/wine-list/get-wine-list-json";
import { GetWineListPath } from "./use-cases/wine-list/get-wine-list-path";
import { SaveWineListToJson } from "./use-cases/wine-list/save-wine-list-to-json";
import { SaveWineListToCsv } from "./use-cases/wine-list/save-wine-list-to-csv";
import { GetWinesInformation } from "./use-cases/wineland-site/get-wines-information";
import { LoginStep } from "./use-cases/wineland-site/login";
import LogUtils from "./utils/log.utils";
import { WineInfo } from "./wine-info";
import dotenv from "dotenv";

dotenv.config();

const start = async () => {
  LogUtils.log("Start");

  const getWineListPath = new GetWineListPath();
  const currentMonthWineListPath = getWineListPath.run(new Date());

  const getWineListJson = new GetWineListJson();
  let wineList = getWineListJson.run(currentMonthWineListPath);

  const service = new BrowserService({
    defaultViewport: { width: 2000, height: 1000 },
    headless: false,
  });

  if (!wineList) {
    const login = new LoginStep(service);
    await login.run();

    const getWinesInformation = new GetWinesInformation(service);
    wineList = await getWinesInformation.run();

    if (wineList && wineList.length > 0) {
      const saveWineList = new SaveWineListToJson();
      saveWineList.run(wineList, currentMonthWineListPath);
    }
  }

  if (wineList && [wineList[0], wineList[1]].length > 0) {
    const wineListWithVivinoScore: WineInfo[] = [];

    const sitePage = await service.goToPage(
      "https://www.vivino.com/BR/pt-BR/"
    );
    
    for (let i = 0; i < wineList.length; i++) {
      const wineInfo = wineList[i];
      const getWineVivinoScore = new GetWineVivinoInfo(service);
      const wineVivinoInfo = await getWineVivinoScore.run(wineInfo, sitePage);
      console.log("wineVivinoInfo => ", wineVivinoInfo)

      if (wineVivinoInfo !== undefined) {
        wineListWithVivinoScore.push({
          ...wineInfo,
          vivinoInfo: wineVivinoInfo,
        });
      } else {
        wineListWithVivinoScore.push(wineInfo);
      }
    }

    // console.log("wineListWithVivinoScore", wineListWithVivinoScore);
    const saveWineListToJson = new SaveWineListToJson();
    const saveWineListToCsv = new SaveWineListToCsv();

    if (wineListWithVivinoScore && wineListWithVivinoScore.length > 0) {
      saveWineListToJson.run(wineListWithVivinoScore, currentMonthWineListPath);
      saveWineListToCsv.run(wineListWithVivinoScore, currentMonthWineListPath);
    }
  }

  LogUtils.log("End");
};

start();
