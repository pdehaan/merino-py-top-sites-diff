import CachedFetch from "@11ty/eleventy-fetch";
import _bytes from "bytes";
import cliSelect from "cli-select";
import { XMLParser } from "fast-xml-parser";

const BASE_URL = "https://merino-images.services.mozilla.com";

export async function select(count = 5) {
  const topPicks = await fetchTopPicks(count);
  const { value: selected } = await cliSelect({
    values: topPicks,
    valueRenderer(v) {
      return `${v.key} (${v.lastModified.toLocaleDateString()}; ${v.size})`;
    },
  });
  return selected;
}

function bytes(size) {
  return _bytes(size, {
    decimalPlaces: 0,
    unitSeparator: " ",
  });
}

async function fetchTopPicks(limit = 10, url = BASE_URL) {
  const xmlStr = await CachedFetch(url, { type: "text", duration: "1d" });
  const parser = new XMLParser();
  const { ListBucketResult } = parser.parse(xmlStr);

  return ListBucketResult.Contents.filter((obj) =>
    obj.Key.endsWith(".0_top_picks.json")
  )
    .slice(-Math.abs(limit))
    .reverse()
    .map(({ Key, LastModified, Size }) => {
      return {
        key: Key,
        lastModified: new Date(LastModified),
        sizeBytes: Size,
        size: bytes(Size),
      };
    });
}
