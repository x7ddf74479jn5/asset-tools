#!/usr/bin/env zx

import { $, argv, glob, chalk, fs } from "zx";
import { promises as fsp } from "fs";
import path from "path";

$.verbose = false;

import { progressTracker } from "../progress.mjs";
import { REPOSITORY } from "../constants.mjs";
import { budouxHelp } from "./help.mjs";
import { createHelpLogger } from "../utils.mjs";
import { INPUT_DIR, OUTPUT_DIR, OUTPUT_FILE } from "./config.mjs";

const budoux = "node_modules/budoux/bin/budoux.js";
const progress = progressTracker();

const includeFiles = async () => {
  progress.setStatus("Including files...");

  const files = await glob(`${INPUT_DIR}/**/*.txt`);

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

const setup = () => {
  if (!fs.pathExistsSync(INPUT_DIR)) {
    console.error(chalk.red(`🌧 Text files must put in "${INPUT_DIR}"`));
    fs.mkdir(INPUT_DIR);
    process.exit(1);
  }

  if (argv.debug) return;

  progress.setStatus("🧹Cleaning output directory...");
  fs.emptyDirSync(OUTPUT_DIR);
};

type BudouXResult =
  | {
      file: string;
      phrases: {
        raw: string;
        segmented: string;
      }[];
    }
  | {
      file: string;
      phrases: {
        raw: string;
        segmented: string[];
      }[];
    }
  | {
      file: string;
      cmd: Record<string, string>;
    };

type OutputData = {
  createdAt: string;
  description: string;
  data: BudouXResult[];
};

const runBudouX = async (files: string[]) => {
  progress.setStatus("BudouX running...");

  let done = 0;

  const results = await Promise.all(
    files.map(async (filePath) => {
      const file = path.basename(filePath);
      const phrases = await getPhrases(filePath);

      if (phrases.length === 0) {
        console.warn(chalk.yellow(`☁️ Texts are not found in "${filePath}"`));
        return null;
      }

      if (argv.debug) {
        const cmd = phrases.reduce((acc, phrase, index) => {
          const _cmd = `${budoux} ${phrase} ${argv.p ? "" : "-H"}`;
          acc[index] = _cmd;
          return acc;
        }, {} as Record<string, string>);

        return { file, cmd };
      }

      const segmentedPhrases = argv.p
        ? await buduouXArray(phrases)
        : argv.j
        ? await buoduXJSX(phrases)
        : await budouXHTML(phrases);

      progress.setProgress(++done, files.length);

      return { file, phrases: segmentedPhrases };
    })
  );

  if (argv.debug) {
    const result = results.filter(Boolean);
    console.log(`[Debug] Input args: ${JSON.stringify(argv, null, 2)}`);
    console.log(`[Debug] Actual commands: ${JSON.stringify(result, null, 2)}`);
    progress.finish("🏁 Debug end");
    process.exit(0);
  }

  return results.filter((r): r is BudouXResult => Boolean(r?.file) && Boolean(r?.phrases));
};

const budouXHTML = async (phrases: string[]) => {
  return await Promise.all(
    phrases.map(async (phrase) => {
      const processOutput = await $`${budoux} ${phrase} -H`;
      const segmented = processOutput.stdout
        .replaceAll(/<wbr>/g, "<wbr />")
        .replaceAll('"', "'")
        // 標準出力末尾の\nを取り除く
        .replace("\n", "");
      return { raw: phrase, segmented };
    })
  );
};

const buoduXJSX = async (phrases: string[]) => {
  return await Promise.all(
    phrases.map(async (phrase) => {
      const processOutput = await $`${budoux} ${phrase} -H`;
      const pattern = /<span.*?>/;
      const to = "<span style={{ wordBreak: 'keep-all', overflowWrap: 'break-word' }}>";
      const segmented = processOutput.stdout
        .replaceAll(/<wbr>/g, "<wbr />")
        .replaceAll('"', "'")
        .replace(pattern, to)
        // 標準出力末尾の\nを取り除く
        .replace("\n", "");
      return { raw: phrase, segmented };
    })
  );
};

const buduouXArray = async (phrases: string[]) => {
  return await Promise.all(
    phrases.map(async (phrase) => {
      const processOutput = await $`${budoux} ${phrase}`;

      const segmented = processOutput.stdout.split("\n").filter(Boolean);
      return { raw: phrase, segmented };
    })
  );
};

const outputJson = async (file: string, list: BudouXResult[]) => {
  progress.setStatus("Outputting into JSON...");

  const data: OutputData = {
    createdAt: new Date().toISOString(),
    description: `This file was auto-generated by ${REPOSITORY}`,
    data: list,
  };

  try {
    await fs.outputJSON(file, data, { spaces: 2 });
  } catch (error) {
    console.error(chalk.red(error));
    process.exit(1);
  }
};

const showCliHelp = async () => {
  const processOutput = await $`${budoux} -h`;
  console.log(processOutput.stdout);
  process.exit(0);
};

export const main = async () => {
  if (argv.h || argv.help) {
    const showHelp = createHelpLogger(budouxHelp);
    showHelp();
  }

  if (argv.H) {
    await showCliHelp();
  }

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
