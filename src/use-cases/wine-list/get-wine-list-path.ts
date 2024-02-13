import { format } from "date-fns";

const DEFAULT_FILE_NAME = "wines.json";
const DEFAULT_FOLDER = "./wine-list-results";

export class GetWineListPath {
  public constructor() {}

  run(date: Date) {
    const monthAndYear = format(date, "yyyy-MM");
    return `${DEFAULT_FOLDER}/${monthAndYear}-${DEFAULT_FILE_NAME}`;
  }
}
