//run this once to import all data from _data folder into MongoDB, make sure to set DATABASE_URL in .env file before running this script

const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const Component = require("../models/Component");
require("dotenv").config();

async function run() {
  await mongoose.connect(process.env.DATABASE_URL);

  const dir = path.join(__dirname, "../_data");
  const files = fs.readdirSync(dir);

  const components = [];
  const propertiesMap = {};
  const eventsMap = {};
  const examplesMap = {};

  for (const file of files) {
    const data = JSON.parse(fs.readFileSync(path.join(dir, file), "utf-8"));
    if (!Array.isArray(data)) continue;

    if (file.includes("component")) {
      components.push(...data);
    }

    if (file.includes("propert")) {
      for (const item of data) {
        if (!propertiesMap[item.slug]) propertiesMap[item.slug] = [];
        propertiesMap[item.slug].push(item);
      }
    }

    if (file.includes("event")) {
      for (const item of data) {
        if (!eventsMap[item.slug]) eventsMap[item.slug] = [];
        eventsMap[item.slug].push(item);
      }
    }

    if (file.includes("example")) {
      for (const item of data) {
        if (!examplesMap[item.slug]) examplesMap[item.slug] = [];
        examplesMap[item.slug].push(item);
      }
    }
  }

  const finalDocs = components.map((item) => ({
    name: item.name,
    slug: item.slug,
    description: item.description,
    properties: propertiesMap[item.slug] || [],
    events: eventsMap[item.slug] || [],
    examples: examplesMap[item.slug] || [],
  }));

  await Component.deleteMany({});
  await Component.insertMany(finalDocs);

  console.log("Full replace done");
  process.exit();
}

run();
