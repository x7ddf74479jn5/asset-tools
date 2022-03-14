import { INPUT_DIR, OUTPUT_DIR } from "./config.mjs";

export const svgrHelp = {
  base: `
  Usage:
      Input directory: ${chalk.green(INPUT_DIR)}        Output directory: ${chalk.green(OUTPUT_DIR)}
      Acceptable file formats: ${chalk.green("svg")}
      
      yarn svgr       SVGからReact TypeScript Componentに変換

  Options:
      --debug         dry-run
      --help, -h      ヘルプ
      -H              CLIのヘルプ
 
  Reference:
      https://react-svgr.com/
      https://github.com/gregberge/svgr
  `,
};
