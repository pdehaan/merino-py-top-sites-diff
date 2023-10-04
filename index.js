import CachedFetch from "@11ty/eleventy-fetch";
import { diffString } from "json-diff";
import sortJson from "sort-json";
import _debug from "debug";

const debugAdd = _debug("top_picks:added");
const debugDel = _debug("top_picks:deleted");


import * as lib from "./s3-fetcher.js";

const BASE_URL = "https://merino-images.services.mozilla.com";

// const selected = await lib.select(5);
// const base = { key: "https://raw.githubusercontent.com/mozilla-services/merino-py/main/dev/top_picks.json" };

await diffFiles(
  // base.key,
  // selected.key,

  "https://raw.githubusercontent.com/mozilla-services/merino-py/main/dev/top_picks.json",
  "https://raw.githubusercontent.com/mozilla-services/merino-py/chore-update-top-picks-03-10-2023/dev/top_picks.json",
);

async function diffFiles(file1, file2) {
  const [ json1, json2 ] = await fetchFiles(file1, file2);
  console.log(`Comparing ${file1}...${file2}`);

  const domains1 = Object.keys(json1);
  const domains2 = Object.keys(json2);

  const deleted = domains1.filter(domain => !domains2.includes(domain)).sort();
  const added = domains2.filter(domain => !domains1.includes(domain)).sort();
  debugAdd(JSON.stringify(added));
  debugDel(JSON.stringify(deleted));

  for (const d of domains2) {
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
  const _files = files.map(fetchTopPicks);
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
