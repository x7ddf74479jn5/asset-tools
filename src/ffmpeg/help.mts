import { chalk } from "zx";

import { INPUT_DIR, OUTPUT_DIR } from "./config.mjs";
import { VIDEO_EXTENSIONS } from "../constants.mjs";

const REFERENCE_URL = "https://www.ffmpeg.org/ffmpeg.html";

export const ffmpegHelp = {
  base: `
  Usage:
      brew install ffmpeg (if you have not installed)

      Input directory: ${chalk.green(INPUT_DIR)}
      Output directory: ${chalk.green(OUTPUT_DIR)}
      Acceptable file formats: ${chalk.green(VIDEO_EXTENSIONS.join(", "))}

      yarn ffmpeg-resize [options]
      yarn ffmpeg-convert [options]
      yarn ffmpeg-clip [options]
      yarn ffmpeg-extract-audio [options]
      yarn ffmpeg-git [options]
      yarn ffmpeg-twitter [options]
  
  Options:
      --mode          convert/resize/clip/twitter/extract-audio/gif
      --debug         dry-run
      --help, -h      ヘルプ
      -H              CLIのヘルプ
  [resize]
      -f              変換したい形式拡張子(e.g. mp4)
      -t              リサイズの基準となる軸と目標値(e.g. w720)
  [convert]
      -f              変換したい形式拡張子(e.g. mp4)
  [clip]
      -f              変換したい形式拡張子(e.g. mp4)
      -s              切り抜き開始時間(e.g. [hh:]mm:ss)
      -e              切り抜き終了時間(e.g. [hh:]mm:ss)
  [extract-audio]
      -f              変換したい形式拡張子(e.g. mp3)
  [git]
      -fps            フレームレート(e.g. 40)
  
  Reference:
      ${REFERENCE_URL}
  `,
  convert: `
  Usage:
      brew install ffmpeg (if you have not installed)

      Input directory: ${chalk.green(INPUT_DIR)}
      Output directory: ${chalk.green(OUTPUT_DIR)}
      Acceptable file formats: ${chalk.green(VIDEO_EXTENSIONS.join(", "))}      

      yarn ffmpeg-convert [options]
  
  Options:
      --debug         dry-run
      --help, -h      ヘルプ
      -H              CLIのヘルプ
      -f              変換したい形式拡張子(e.g. mp4)

  Reference:
      ${REFERENCE_URL}
  `,
  resize: `
  Usage:
      brew install ffmpeg (if you have not installed)

      Input directory: ${chalk.green(INPUT_DIR)}
      Output directory: ${chalk.green(OUTPUT_DIR)}
      Acceptable file formats: ${chalk.green(VIDEO_EXTENSIONS.join(", "))}    

      yarn ffmpeg-resize [options]

  Options:
      --debug         dry-run
      --help, -h      ヘルプ
      -H              CLIのヘルプ
      -f              変換したい形式拡張子(e.g. mp4)
      -t              リサイズの基準となる軸と目標値(e.g. w720)

  Reference:
      ${REFERENCE_URL}
  `,
  clip: `
  Usage:
      brew install ffmpeg (if you have not installed)
    
      Input directory: ${chalk.green(INPUT_DIR)}
      Output directory: ${chalk.green(OUTPUT_DIR)}
      Acceptable file formats: ${chalk.green(VIDEO_EXTENSIONS.join(", "))}      

      yarn ffmpeg-clip [options]

  Options:
      --debug         dry-run
      --help, -h      ヘルプ
      -H              CLIのヘルプ
      -f              変換したい形式拡張子(e.g. mp4)
      -s              切り抜き開始時間(e.g. [hh:]mm:ss)
      -e              切り抜き終了時間(e.g. [hh:]mm:ss)

  Reference:
      ${REFERENCE_URL}  
  `,
  "extra-audio": `
  [Caution] This is a experimental mode depended on input movies don't work.
  Input directory: ${chalk.green(INPUT_DIR)}
  Output directory: ${chalk.green(OUTPUT_DIR)}
  Acceptable file formats: mp4

  Usage:
      brew install ffmpeg (if you have not installed)

      yarn ffmpeg-extra-audio [options]

  Options:
      --debug         dry-run
      --help, -h      ヘルプ
      -H              CLIのヘルプ
      -f              変換したい形式拡張子(e.g. mp3)

  Reference:
      ${REFERENCE_URL}   
  `,
  gif: `
  Usage:
      brew install ffmpeg (if you have not installed)

      Input directory: ${chalk.green(INPUT_DIR)}
      Output directory: ${chalk.green(OUTPUT_DIR)}
      Acceptable file formats: ${chalk.green(VIDEO_EXTENSIONS.join(", "))}      

      yarn ffmpeg-gif [options]

  Options:
      --debug         dry-run
      --help, -h      ヘルプ
      -H              CLIのヘルプ
      -fps            フレームレート(e.g. 40)

  Reference:
      ${REFERENCE_URL}  
  `,
  twitter: `
  Usage:
      brew install ffmpeg (if you have not installed)

      Input directory: ${chalk.green(INPUT_DIR)}
      Output directory: ${chalk.green(OUTPUT_DIR)}
      Acceptable file formats: ${chalk.green(VIDEO_EXTENSIONS.join(", "))}      

      yarn ffmpeg-twitter [options]

  Options:
      --debug         dry-run
      --help, -h      ヘルプ
      -H              CLIのヘルプ

  Reference:
      ${REFERENCE_URL}  
  `,
};
