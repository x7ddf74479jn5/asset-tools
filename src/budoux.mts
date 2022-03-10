#!/usr/bin/env zx

import "zx/globals";
import { promises as fsp } from "fs";
import path from "path";

$.verbose = false;

import { progressTracker } from "./progress.mjs";
import { REPOSITORY } from "./constants.mjs";

const budoux = "node_modules/budoux/bin/budoux.js";
const prettier = "node_modules/prettier/bin-prettier.js";
const INPUT_DIR = argv.test ? "tests/assets/budoux" : "assets/budoux";
const OUTPUT_DIR = argv.test ? "tests/dist/budoux" : "dist/budoux";
const OUTPUT_FILE = `${OUTPUT_DIR}/output.json`;
const progress = progressTracker();

const includeFiles = async () => {
  progress.setStatus("Including files...");

  const files = await glob(`${INPUT_DIR}/*.txt`);

  if (files.length === 0) {
    console.error(chalk.red(`🌧 Text files are not found in "${INPUT_DIR}"`));
    process.exit(1);
  }

  console.log("Included files: ", files);

  return files;
};

const getPhrases = async (filePath: string) => {
  try {
    const data = await fsp.readFile(filePath);
    const u8 = new Uint8Array(data.buffer);
    const decoded = new TextDecoder().decode(u8);
    const result = decoded.split("\n").filter(Boolean);

    return result;
  } catch (error) {
    console.error(chalk.red(error));
    process.exit(1);
  }
};

const setup = async () => {
  if (!fs.pathExistsSync(INPUT_DIR)) {
    console.error(chalk.red(`🌧 Text files must put in "${INPUT_DIR}"`));
    fs.mkdir(INPUT_DIR);
    process.exit(1);
  }

  if (argv.debug) return;

  progress.setStatus("🧹Cleaning output directory...");
  fs.emptyDirSync(OUTPUT_DIR);
};

const runBudouX = async (files: string[]) => {
  progress.setStatus("BudouX running...");

  let done = 0;

  let result = await Promise.all(
    files.map(async (filePath) => {
      const file = path.basename(filePath);
      const phrases = await getPhrases(filePath);

      if (phrases.length === 0) {
        console.warn(chalk.yellow(`☁️ Texts are not found in "${filePath}"`));
        return;
      }

      if (argv.debug) {
        const cmd = phrases.reduce((acc, phrase, index) => {
          const _cmd = `${budoux} ${phrase} -H`;
          acc[index] = _cmd;
          return acc;
        }, {} as Record<string, string>);

        return { file, cmd };
      }

      const segmentedPhrases = await Promise.all(
        phrases.map(async (phrase) => {
          const processOutput = await $`${budoux} ${phrase} -H`;
          return processOutput.stdout.replace("\n", "");
        })
      );

      progress.setProgress(++done, files.length);

      return { file, phrases: segmentedPhrases };
    })
  );

  if (argv.debug) {
    result = result.filter(Boolean);
    console.log(`[Debug] Input args: ${JSON.stringify(argv)}`);
    console.log(`[Debug] Actual commands: ${JSON.stringify(result)}`);
    progress.finish("🏁 Debug end");
    process.exit(0);
  }

  result = result.filter((r): r is BudouXResult => Boolean(r?.file) && Boolean(r?.phrases));

  return result as BudouXResult[];
};

const formatOutput = async () => {
  progress.setStatus("Formatting...");
  await $`${prettier} --write ${OUTPUT_FILE}`;
};

type BudouXResult = {
  file: string;
  phrases: string[];
};

type OutputData = {
  createdAt: string;
  description: string;
  data: BudouXResult[];
};

const outputJson = async (file: string, list: BudouXResult[]) => {
  progress.setStatus("Outputting into JSON...");

  const data: OutputData = {
    createdAt: new Date().toISOString(),
    description: `This file was auto-generated by ${REPOSITORY}`,
    data: list,
  };

  try {
    await fs.outputJSON(file, data);
    await formatOutput();
  } catch (error) {
    console.error(chalk.red(error));
    process.exit(1);
  }
};

export const main = async () => {
  progress.setStatus("🏁 Start!");

  await setup();
  const files = await includeFiles();
  const result = await runBudouX(files);
  await outputJson(OUTPUT_FILE, result);

  progress.finish("🏁 End with success!");
};

main().catch((e) => {
  console.error(chalk.red(e));
  process.exit(1);
});
