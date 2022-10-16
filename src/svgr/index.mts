#!/usr/bin/env zx
import { $, argv, glob, chalk, fs } from "zx";

import { debugOutput, debugRun, createHelpLogger } from "../utils.mjs";
import { progressTracker } from "../progress.mjs";
import { svgrHelp } from "./help.mjs";
import { INPUT_DIR, OUTPUT_DIR } from "./config.mjs";

const svgr = "node_modules/@svgr/cli/bin/svgr";
const TEMPLATE = "src/svgr/template.js";
const INDEX_TEMPLATE = "src/svgr/index-template.js";
const progress = progressTracker();

const includeImages = async () => {
  progress.setStatus("Including files...");

  const images = await glob(`${INPUT_DIR}/**/*.svg`);

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

  if (argv.debug) return;

  progress.setStatus("🧹Cleaning output directory...");
  fs.emptyDirSync(OUTPUT_DIR);
};

const run = async () => {
  progress.setStatus("SVGR running...");

  if (argv.debug) {
    const result = debugRun(
      INPUT_DIR,
      `${svgr} --typescript --template ${TEMPLATE} --index-template ${INDEX_TEMPLATE} -d ${OUTPUT_DIR} -- ${INPUT_DIR}`
    );
    debugOutput(result);
  } else {
    await $`${svgr} --typescript --template ${TEMPLATE} --index-template ${INDEX_TEMPLATE} -d ${OUTPUT_DIR} -- ${INPUT_DIR}`;
  }
};

const showCliHelp = async () => {
  const processOutput = await $`${svgr}} -h`;
  console.log(processOutput.stdout);
  process.exit(0);
};

const main = async () => {
  if (argv.h || argv.help) {
    const showHelp = createHelpLogger(svgrHelp);
    showHelp();
  }

  if (argv.H) {
    await showCliHelp();
  }

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
