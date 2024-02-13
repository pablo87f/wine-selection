import { WineVivinoInfo } from "./wine-vivino-info";

export type WineInfo = {
  name: string;
  category: string;
  vivinoInfo?: WineVivinoInfo;
};
