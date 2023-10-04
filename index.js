import CachedFetch from "@11ty/eleventy-fetch";
import { diffString } from "json-diff";
import sortJson from "sort-json";

import * as lib from "./s3-fetcher.js";

const BASE_URL = "https://merino-images.services.mozilla.com";

// const selected = await lib.select(5);
// const base = { key: "https://raw.githubusercontent.com/mozilla-services/merino-py/main/dev/top_picks.json" };

// console.log({selected, base})

await diffFiles(
  // base.key,
  // selected.key,
  // "/1687239409000.0_top_picks.json",
  // "/1687288535000.0_top_picks.json",


  "https://raw.githubusercontent.com/mozilla-services/merino-py/main/dev/top_picks.json",
  "https://raw.githubusercontent.com/mozilla-services/merino-py/chore-update-top-picks-03-10-2023/dev/top_picks.json",
);

async function diffFiles(...files) {
  const [ file1, file2 ] = files;
  const [ json1, json2 ] = await fetchFiles(...files);
  console.log(`Comparing ${file1}...${file2}`);
  for (const d of Object.keys(json2)) {
    // Nullish coalesce since some domains might not be in both sets.
    const d1 = json1[d] ?? {};
    const d2 = json2[d] ?? {};

    // We don't care about `rank` changes.
    delete d1.rank;
    delete d2.rank;

    // We only care about `icon` changes if the latest icon is blank.
    if (d2.icon !== "") {
      delete d1.icon;
      delete d2.icon;
    }

    const diff = diffString(d1, d2, {
      color: process.argv.includes("--color"),
    });
    if (diff.length) {
      console.log(diff);
    }
  }
}

async function fetchFiles(...files) {
  const _files = files.sort().map(fetchTopPicks);
  return Promise.all(_files);
}

async function fetchTopPicks(filename = "") {
  const { href } = new URL(filename, BASE_URL);
  const { domains } = await CachedFetch(href, { type: "json", duration: "1d" });
  return sortJson(domains).reduce((acc, d) => {
    if (!(d.domain in acc)) {
      acc[d.domain] = d;
    } else {
      console.error(`Bad news bears, ${d} is a dupe`);
    }
    return acc;
  }, {});
}
