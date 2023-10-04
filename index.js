#!/usr/bin/env node

import { diffString } from "json-diff";
import sortJson from "sort-json";
import _debug from "debug";
import dotenv from "dotenv";
import * as lib from "./lib.js";

dotenv.config();

await diffFiles(
  process.env.HEAD,
  process.env.PR,
);

async function diffFiles(file1, file2) {
  const [ json1, json2 ] = await fetchFiles(file1, file2);
  console.log(`Comparing ${file1}...${file2}`);

  const domains1 = Object.keys(json1);
  const domains2 = Object.keys(json2);

  const deleted = domains1.filter(d1 => !domains2.includes(d1)).map(d => json1[d]);
  for (const d of deleted) {
    const diff = diffString(d, {}, {
      color: process.argv.includes("--color"),
    });
    console.log(diff);
  }

  for (const d of domains2) {
    // Nullish coalesce since some domains might not be in both sets.
    const d1 = json1[d] ?? {};
    const d2 = json2[d] ?? {};

    // We don't care about `rank` changes.
    const rank1 = d1.rank;
    const rank2 = d2.rank;
    delete d1.rank;
    delete d2.rank;

    // We only care about `icon` changes if the latest icon is blank.
    let icon1;
    let icon2;

    if (d2.icon !== "") {
      icon1 = d1.icon;
      icon2 = d2.icon;
      delete d1.icon;
      delete d2.icon;
    }

    let diff = diffString(d1, d2, {
      color: process.argv.includes("--color"),
    });
    if (diff.length) {
      d1.rank = rank1;
      d2.rank = rank2;
      d1.icon = icon1;
      d2.icon = icon2;
      diff = diffString(d1, d2, {
        color: process.argv.includes("--color"),
      });
      console.log(diff);
    }
  }
}

async function fetchFiles(...files) {
  const _files = files.map(fetchTopPicks);
  return Promise.all(_files);
}

async function fetchTopPicks(branchOrUrl = "") {
  const domains = await lib.fetchTopPicks(branchOrUrl);
  return sortJson(domains).reduce((acc, d) => {
    if (!(d.domain in acc)) {
      acc[d.domain] = d;
    } else {
      console.error(`Bad news bears, ${d} is a dupe`);
    }
    return acc;
  }, {});
}
