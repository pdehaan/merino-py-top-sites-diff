#!/usr/bin/env node

import dotenv from "dotenv";
import * as lib from "./lib.js";

dotenv.config();

const domains = await lib.fetchTopPicks(process.env.PR);
for (const d of domains) {
  console.log(`[${d.rank}] "${d.title}" -- ${d.url}`);
}
