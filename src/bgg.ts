import { JSDOM } from "jsdom";

interface Boardgame {
  id: number;
  name: string;
  year: number;
  link: string;
  status: string; // "Owned", "Prev. Owned", etc..
}

const main = async () => {
  const games = await (
    await fetch("https://boardgamegeek.com/collection/user/TheMartinFamily")
  ).text();

  const { document } = new JSDOM(games).window;

  const table = document.querySelector("#collectionitems");
  const rows = Array.from(table?.querySelectorAll("tr") ?? []);

  rows.shift(); // remove header row

  const bgs = rows.map((row, i) => {
    const rowNumber = (i + 1) * 2 - 1;
    const anchor = row.querySelector(
      `#results_objectname${rowNumber} > a`
    ) as HTMLAnchorElement; // Rows are all odd numbered, for some reason... starting at 1
    const link = anchor.href;
    const id = link.split("/")[2];
    const name = anchor.textContent;
    const year =
      row
        .querySelector(`#results_objectname${rowNumber} > span`)
        ?.textContent?.match(/([0-9]+)/)?.[0] ?? 0;
    const status = row.querySelector(
      `#results_status${rowNumber} > div`
    )?.textContent;

    // console.log({ id, link, name, year, status });
    return { id, link, name, year, status };
  });

  const owned = bgs.filter((game) => game.status == "Owned");
  console.log(rows?.length);
  console.log(owned?.length);
};

main();
