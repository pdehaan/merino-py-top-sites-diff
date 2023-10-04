import { inspect } from "node:util";
import CachedFetch from "@11ty/eleventy-fetch";

const { domains } = await CachedFetch("https://raw.githubusercontent.com/mozilla-services/merino-py/main/dev/top_picks.json", { type: "json", duration: "1d" });

for (const d of domains) {
  console.log(`[${d.rank}] "${d.title}" -- ${d.url}`);
}
