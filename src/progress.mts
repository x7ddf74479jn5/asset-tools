import type { Ora } from "ora";
import ora from "ora";

import { chalk } from "zx";

type Tracker = {
  spinner: Ora;
  progressOffset: number;
  totalOffset: number;
  setStatus: (text: string) => void;
  setProgress: (done: number, total: number) => void;
  finish: (text: string) => void;
};

export const progressTracker = () => {
  const spinner = ora();
  let status = "";
  let progress = "";
  const tracker: Tracker = {
    spinner: spinner,
    progressOffset: 0,
    totalOffset: 0,
    setStatus: (text) => {
      status = text || "";
      update();
    },
    setProgress: (done, total) => {
      spinner.prefixText = chalk.dim(`${done}/${total}`);
      const completeness = (tracker.progressOffset + done) / (tracker.totalOffset + total);
      progress = chalk.cyan(`▐${"▨".repeat((completeness * 10) | 0).padEnd(10, "╌")}▌ `);
      update();
    },
    finish: (text) => {
      spinner.succeed(chalk.bold(text));
    },
  };
  const update = () => {
    spinner.text = progress + chalk.bold(status);
  };
  spinner.start();
  return tracker;
};
