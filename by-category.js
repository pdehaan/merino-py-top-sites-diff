#!/usr/bin/env node

import dotenv from "dotenv";
import * as lib from "./lib.js";

dotenv.config();

const domains = await lib.fetchTopPicks(process.env.PR);
const argvCategories = process.argv.slice(2).map(c => c.toLowerCase());
const matches = domains.filter(d => d.categories.some(c => argvCategories.includes(c.toLowerCase())));

console.log(matches);
