#!/usr/bin/env node

import dotenv from "dotenv";
import * as lib from "./lib.js";

dotenv.config();

const domains = await lib.fetchTopPicks(process.env.PR);
const categories = domains.reduce((acc, domain) => {
  domain.categories.forEach(cat => acc.add(cat));
  return acc;
}, new Set());

console.log(JSON.stringify(Array.from(categories).sort(), null, 2));
