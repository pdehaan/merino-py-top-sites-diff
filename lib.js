import CachedFetch from "@11ty/eleventy-fetch";

export async function fetchTopPicks(branch = "main", duration = "1d") {
  let href = `https://raw.githubusercontent.com/mozilla-services/merino-py/${branch}/dev/top_picks.json`;
  if (branch.startsWith("http:") || branch.startsWith("https:")) {
    href = branch;
  }
  const { domains } = await CachedFetch(href, { type: "json", duration });
  return domains;
}
