import { BrowserService } from "./services/browser.service";
import { GetWineVivinoInfo } from "./use-cases/vivino-site/get-wine-vivino-info";
import { GetWineList } from "./use-cases/wine-list/get-wine-list";
import { GetWineListPath } from "./use-cases/wine-list/get-wine-list-path";
import { SaveWineList } from "./use-cases/wine-list/save-wine-list";
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

  const getWineList = new GetWineList();
  let wineList = getWineList.run(currentMonthWineListPath);

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
      const saveWineList = new SaveWineList();
      saveWineList.run(wineList, currentMonthWineListPath);
    }
  }

  if (wineList && [wineList[0], wineList[1]].length > 0) {
    const wineListWithVivinoScore: WineInfo[] = [];

    for (let i = 0; i < wineList.length; i++) {
      const wineInfo = wineList[i];
      const getWineVivinoScore = new GetWineVivinoInfo(service);
      const wineVivinoInfo = await getWineVivinoScore.run(wineInfo);

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
    if (wineListWithVivinoScore && wineListWithVivinoScore.length > 0) {
      const saveWineList = new SaveWineList();
      saveWineList.run(wineListWithVivinoScore, currentMonthWineListPath);
    }
  }

  LogUtils.log("End");
};

start();
