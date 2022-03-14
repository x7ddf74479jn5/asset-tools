import { IMAGE_EXTENSIONS } from "src/constants.mjs";
import { INPUT_DIR, OUTPUT_DIR } from "./config.mjs";

const REFERENCE_URL = "https://github.com/GoogleChromeLabs/squoosh/tree/dev/cli";

export const squooshHelp = {
  base: `
  Usage:
      Input directory: ${chalk.green(INPUT_DIR)}
      Output directory: ${chalk.green(OUTPUT_DIR)}
      Acceptable file formats: ${chalk.green(IMAGE_EXTENSIONS.join(", "))}

      yarn squoosh--optimize [options]    JPEG/PNG圧縮/Webp変換
      yarn squoosh-resize [options]       アスペクト比を維持したリサイズ

  Options:
      --mode          optimize/resize
      --debug         dry-run
      --help, -h      ヘルプ
      -H              CLIのヘルプ
      -t              リサイズの基準となる軸と目標値(e.g. w720)
      -w              Webp変換フラグ

  Reference:
      ${REFERENCE_URL}
  `,
  optimize: `
  Usage:
      Input directory: ${chalk.green(INPUT_DIR)}
      Output directory: ${chalk.green(OUTPUT_DIR)}
      Acceptable file formats: ${chalk.green(IMAGE_EXTENSIONS.join(", "))}

      yarn squoosh--optimize [options]    JPEG/PNG圧縮/Webp変換

  Options:
      --debug         dry-run
      --help, -h      ヘルプ
      -H              CLIのヘルプ
      -w              Webp変換フラグ

  Reference:
      ${REFERENCE_URL}
  `,
  resize: `
  Usage:
      Input directory: ${chalk.green(INPUT_DIR)}
      Output directory: ${chalk.green(OUTPUT_DIR)}
      Acceptable file formats: ${chalk.green(IMAGE_EXTENSIONS.join(", "))}

      yarn squoosh-resize [options]       アスペクト比を維持したリサイズ

  Options:
      --debug         dry-run
      --help, -h      ヘルプ
      -H              CLIのヘルプ
      -t              リサイズの基準となる軸と目標値(e.g. w720)
      -w              Webp変換フラグ

  Reference:
      ${REFERENCE_URL}
  `,
};
