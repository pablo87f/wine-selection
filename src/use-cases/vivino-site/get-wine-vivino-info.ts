import { ElementHandle, Page } from "puppeteer";
import stringSimilarity from "string-similarity-js";
import { BrowserService } from "../../services/browser.service";
import { WineInfo } from "../../wine-info";
import { WineVivinoInfo } from "../../wine-vivino-info";

const WINE_TITLE_SELECTOR =
  "span.header-smaller.text-block.wine-card__name > a";

export class GetWineVivinoInfo {
  public constructor(private service: BrowserService) {}

  async run(
    wine: WineInfo,
    sitePage: Page
  ): Promise<WineVivinoInfo | undefined> {
    try {
      await sitePage.type(
        "#navigation-container > div > nav > div.navigation_leftNav__KpIIb > div > div > div > form > input",
        `${wine.name} ${String.fromCharCode(13)}`,
        { delay: 20 }
      );

      await sitePage.waitForSelector(".search-results-list");
      const resultList = await sitePage.$(".search-results-list");
      const wineCardList = await resultList?.$$(".default-wine-card");

      if (wineCardList && wineCardList.length > 0) {
        // get top 3 search result
        const top3SearchResults = wineCardList?.slice(0, 3) || [];

        let higherSimuilarValeu = -1;
        let mostSimilarTitle = "";
        let mostSimilarTitleLink: ElementHandle<HTMLAnchorElement> | null =
          null;

        // compare the results title similarity with the wine name to get most similar
        for (const resultCard of top3SearchResults) {
          const titleLink = await resultCard.$(WINE_TITLE_SELECTOR);
          const titleText =
            (await titleLink?.evaluate((el) => el.textContent)) || undefined;

          if (titleText) {
            const currentSimilarValue = stringSimilarity(wine.name, titleText);

            if (currentSimilarValue > higherSimuilarValeu) {
              higherSimuilarValeu = currentSimilarValue;
              mostSimilarTitle = titleText;
              mostSimilarTitleLink = titleLink;
            }
          }
        }

        mostSimilarTitleLink?.click();

        await sitePage.waitForSelector(
          "#wine-location-header > div > div > div > div:nth-child(2) > a > div > div"
        );
        const ratingDiv = await sitePage.$(
          "#wine-location-header > div > div > div > div:nth-child(2) > a > div > div"
        );
        const ratingText =
          (await ratingDiv?.evaluate((el) => el.textContent)) || undefined;
        if (ratingText) {
          const ratingValue = Number.parseFloat(ratingText?.replace(",", "."));
          return {
            score: ratingValue,
            link: sitePage.url(),
            title: mostSimilarTitle,
          };
        }
      }
    } catch (err) {
      console.log("ERROR => ", wine, err);
    }

    return undefined;
  }
}
