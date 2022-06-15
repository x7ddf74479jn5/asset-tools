import { chalk } from "zx";

import { INPUT_DIR, OUTPUT_DIR } from "./config.mjs";

export const budouxHelp = {
  base: `
  Usage:
      Input directory: ${chalk.green(INPUT_DIR)}
      Output directory: ${chalk.green(OUTPUT_DIR)}
      Acceptable file formats: ${chalk.green("txt")}

      yarn budoux [options]       テキストファイル内の文字列を整形したHTML文字列へ変換し、JSONとして出力

  Options:
      --debug         dry-run
      --help, -h      ヘルプ
      -H              CLIのヘルプ
      -j              JSX形式に整形する
      -p              配列形式

  React example: ./BudouX.tsx

  Reference:
      https://github.com/google/budoux/blob/main/javascript/README.md
  `,
};
