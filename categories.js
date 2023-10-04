import CachedFetch from "@11ty/eleventy-fetch";

const { domains } = await CachedFetch("https://raw.githubusercontent.com/mozilla-services/merino-py/main/dev/top_picks.json", { type: "json" });

const categories = domains.reduce((acc, domain) => {
  domain.categories.forEach(cat => acc.add(cat));
  return acc;
}, new Set());
console.log(JSON.stringify(Array.from(categories).sort(), null, 2));
