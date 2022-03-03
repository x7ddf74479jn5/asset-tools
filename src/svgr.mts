#!/usr/bin/env zx

import "zx/globals";

import { progressTracker } from "./progress.mjs";

const svgr = "node_modules/@svgr/cli/bin/svgr";
const INPUT_DIR = "assets/svgr";
const OUTPUT_DIR = "dist/svgr";
const TEMPLATE = "src/templates/template.js";
const INDEX_TEMPLATE = "src/templates/index-template.js";
const progress = progressTracker();

const includeImages = async () => {
  progress.setStatus("Including files...");

  const images = await glob(`${INPUT_DIR}/*.svg`);

  if (images.length === 0) {
    console.error(chalk.red(`🌧 SVG files are not found in "${INPUT_DIR}"`));
    process.exit(1);
  }

  console.log("Included images: ", images);

  return images;
};

const setup = async () => {
  if (!fs.pathExistsSync(INPUT_DIR)) {
    console.error(chalk.red(`🌧 Images must put in "${INPUT_DIR}"`));
    fs.mkdir(INPUT_DIR);
    process.exit(1);
  }

  progress.setStatus("🧹Cleaning output directory...");
  fs.emptyDirSync(OUTPUT_DIR);
};

const run = async () => {
  progress.setStatus("SVGR running...");
  await $`${svgr} --typescript --template ${TEMPLATE} --index-template ${INDEX_TEMPLATE} -d ${OUTPUT_DIR} -- ${INPUT_DIR}`;
};

const main = async () => {
  progress.setStatus("🏁 Start!");

  await setup();
  await includeImages();
  await run();

  progress.finish("🏁 End with success!");
};

main().catch((e) => {
  console.error(chalk.red(e));
  process.exit(1);
});
