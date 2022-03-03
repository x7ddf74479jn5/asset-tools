#!/usr/bin/env zx

import "zx/globals";
import path from "path";
import dayjs from "dayjs";

import { PRESET_WIDTH } from "./constant.mjs";

const INPUT_DIR = "assets/ffmpeg";
const OUTPUT_DIR = "dist/ffmpeg";
const VIDEO_EXTENSION = ["avi", "mp4", "wmv", "mpg", "mkv", "flv", "mov"];
const AUDIO_EXTENSION = ["mp3", "flac", "wav", "aac"];

const getTime = (hour: string, minute: string, second: string) => {
  return dayjs(`2022-01-01 ${hour}:${minute}:${second}`);
};

const includeVideos = async () => {
  console.log("Including videos...");

  const videos = await glob(`${INPUT_DIR}/*.{${VIDEO_EXTENSION.join(",")}}`);

  if (videos.length === 0) {
    console.error(
      chalk.red(`🌧 
    Video files are not found in "${INPUT_DIR}"`)
    );
    process.exit(1);
  }

  console.log("Included videos: ", videos);

  return videos;
};

const setup = async () => {
  if (!fs.pathExistsSync(INPUT_DIR)) {
    console.error(chalk.red(`🌧 Videos must put in "${INPUT_DIR}"`));
    fs.mkdir(INPUT_DIR);
    process.exit(1);
  }

  console.log("🧹Cleaning output directory...");
  fs.emptyDirSync(OUTPUT_DIR);
};

const resize = async (videos: string[]) => {
  console.log("Resizing...");

  const { t, f } = argv;
  const target = t || (await question("Type target dimension and value(e.g. w720): ", { choices: PRESET_WIDTH }));
  let targetExt = f || (await question("Convert into?(e.g. mp4): "));

  const getScaleOption = async (target: string) => {
    const re = /(?<dimension>[wh])(?<value>1?[0-9]{1,3})/;
    const match = re.exec(target);

    if (!match?.groups?.dimension || !match?.groups?.value) {
      console.error(chalk.red(`🌧 Invalid input: target value format must be like "w720"`));
      process.exit(1);
    }

    const scaleOption =
      match.groups.dimension === "w"
        ? `scale=${match.groups.value}:-1`
        : match.groups.dimension === "h"
        ? `scale=-1:${match.groups.value}`
        : ("" as never);

    return scaleOption;
  };

  const scaleOption = await getScaleOption(target);

  const validateExtension = () => {
    // blank indicates default value
    if (targetExt === "") return true;
    return VIDEO_EXTENSION.includes(targetExt);
  };

  if (!validateExtension()) {
    console.error(chalk.red("Invalid extension"));
    process.exit(1);
  }

  await Promise.all(
    videos.map(async (filePath) => {
      const { name, ext } = path.parse(filePath);
      targetExt ||= ext.slice(1);
      await $`ffmpeg -i ${filePath} -vf ${scaleOption} ${OUTPUT_DIR}/${name}.${targetExt}`;
    })
  );
};

const convert = async (videos: string[]) => {
  console.log("Converting...");

  const { f } = argv;
  const targetExt = f || (await question("Convert into?(e.g. mp4): "));

  const validateExtension = () => {
    return VIDEO_EXTENSION.includes(targetExt);
  };

  if (!validateExtension()) {
    console.error(chalk.red("Invalid extension"));
    process.exit(1);
  }

  await Promise.all(
    videos.map(async (filePath) => {
      const filename = path.basename(filePath, path.extname(filePath));
      await $`ffmpeg -i ${filePath} ${OUTPUT_DIR}/${filename}.${targetExt}`;
    })
  );
};

const clip = async (videos: string[]) => {
  console.log("Clipping...");

  const { f, s, e } = argv;
  const ss: string = s || (await question("Start time(e.g. hh:mm:ss or mm:ss or ss)"));
  const to: string = e || (await question("End time(e.g. hh:mm:ss or mm:ss or ss): "));

  const validateTime = () => {
    const pattern = /([0-5][0-9])+(:[0-5][0-9]){0,2}/;

    const validateStartEndOrder = () => {
      const startTime = ss.split(":");
      const endTime = to.split(":");

      if (startTime.length !== endTime.length) return false;

      if (startTime.length === 3) {
        const a = getTime(startTime[0] || "00", startTime[1] || "00", startTime[2] || "00");
        const b = getTime(endTime[0] || "00", endTime[1] || "00", endTime[2] || "00");
        return b.isAfter(a);
      } else if (startTime.length === 2) {
        const a = getTime("00", startTime[0] || "00", startTime[1] || "00");
        const b = getTime("00", endTime[0] || "00", endTime[1] || "00");
        return b.isAfter(a);
      } else if (startTime.length === 1) {
        const a = getTime("00", "00", startTime[0] || "00");
        const b = getTime("00", "00", endTime[0] || "00");
        return b.isAfter(a);
      }
    };

    return pattern.test(ss) && pattern.test(to) && validateStartEndOrder();
  };

  if (!validateTime()) {
    console.error(chalk.red("Invalid time format(expected like 1:00)"));
    process.exit(1);
  }

  let targetExt =
    f || (await question("Type target extension(e.g. mp4), if blank will not covert: ", { choices: VIDEO_EXTENSION }));

  const validateExtension = () => {
    // blank indicates default value
    if (targetExt === "") return true;
    return VIDEO_EXTENSION.includes(targetExt);
  };

  if (!validateExtension()) {
    console.error(chalk.red("Invalid extension"));
    process.exit(1);
  }

  await Promise.all(
    videos.map(async (filePath) => {
      const { name, ext } = path.parse(filePath);
      targetExt ||= ext.slice(1);
      await $`ffmpeg -i ${filePath} -ss ${ss} -to ${to} ${OUTPUT_DIR}/${name}${targetExt}`;
    })
  );
};

/* 
【公式仕様】
MP4（H264形式、AAC音声）をサポート。
サイズは最大512MB
長さは2分20秒以下
最小解像度: 32 x 32
最大解像度: 1920 x 1200（および1200 x 1900）
縦横比: 1:2.39～2.39:1の範囲（両方の値を含む）
最大フレームレート: 40fps
最大ビットレート: 25Mbps
*/
const twitter = async (videos: string[]) => {
  console.log("Optimizing for Twitter...");

  await Promise.all(
    videos.map(async (filePath) => {
      const filename = path.basename(filePath, path.extname(filePath));
      await $`ffmpeg -i ${filePath} -pix_fmt yuv420p -vcodec h264 -acodec aac -strict experimental ${OUTPUT_DIR}/${filename}.mp4`;
    })
  );
};

const extractAudio = async (videos: string[]) => {
  console.log("Extracting audios...");

  const { f } = argv;
  let targetExt =
    f ||
    (await question("Type target extension(e.g. mp4), if blank will not covert(maybe aac): "),
    { choices: AUDIO_EXTENSION });
  targetExt ||= "aac";

  const validateExtension = () => {
    return AUDIO_EXTENSION.includes(targetExt);
  };

  if (!validateExtension()) {
    console.error(chalk.red("Invalid extension"));
    process.exit(1);
  }

  const format = targetExt === "aac" ? "copy" : targetExt;

  await Promise.all(
    videos.map(async (filePath) => {
      const filename = path.basename(filePath, path.extname(filePath));
      await $`ffmpeg -i ${filePath} -vn -acodec ${format}  ${OUTPUT_DIR}/${filename}.${targetExt}`;
    })
  );
};

const gif = async (videos: string[]) => {
  console.log("Converting...");

  const { fps } = argv;
  const _fps = fps || 10;

  await Promise.all(
    videos.map(async (filePath) => {
      const filename = path.basename(filePath, path.extname(filePath));
      await $`ffmpeg -i ${filePath} -filter_complex "[0:v] fps=${_fps},split [a][b];[a] palettegen [p];[b][p] paletteuse"  ${OUTPUT_DIR}/${filename}.gif`;
    })
  );
};

const main = async () => {
  console.log(chalk.cyan("🏁 Start!"));

  const { mode } = argv;
  await setup();
  const videos = await includeVideos();

  switch (mode) {
    case "resize": {
      await resize(videos);
      break;
    }
    case "convert": {
      await convert(videos);
      break;
    }
    case "twitter": {
      await twitter(videos);
      break;
    }
    case "clip": {
      await clip(videos);
      break;
    }
    case "extract-audio": {
      await extractAudio(videos);
      break;
    }
    case "gif": {
      await gif(videos);
      break;
    }
    default: {
      console.error(chalk.red(`Unexpected option for "--mode" ${mode}`));
      process.exit(1);
    }
  }
  console.log(chalk.cyan("🏁 End with success!"));
};

main().catch((e) => {
  console.error(chalk.red(e));
  process.exit(1);
});
