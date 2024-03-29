#!/usr/bin/env zx

import { $, argv, glob, chalk, fs, question } from "zx";

import { INPUT_DIR, OUTPUT_DIR } from "./config.mjs";
import { IMAGE_EXTENSIONS, PRESET_WIDTHS } from "../constants.mjs";
import { debugOutput, debugRun, createHelpLogger } from "../utils.mjs";
import { squooshHelp } from "./help.mjs";

const squoosh = "node_modules/@squoosh/cli/src/index.js";
const encOption = "auto";

const includeImages = async () => {
  console.log("Including images...");

  const images = await glob(`${INPUT_DIR}/**/*.{${IMAGE_EXTENSIONS.join(",")}}`);

  if (images.length === 0) {
    console.error(chalk.red(`🌧 Image files are not found in "${INPUT_DIR}"`));
    process.exit(1);
  }

  console.log("Included images: ", images);

  return images;
};

const setup = () => {
  if (!fs.pathExistsSync(INPUT_DIR)) {
    console.error(chalk.red(`🌧 Images must put in "${INPUT_DIR}"`));
    fs.mkdir(INPUT_DIR);
    process.exit(1);
  }

  if (argv.debug) return;

  console.log("🧹Cleaning output directory...");
  fs.emptyDirSync(OUTPUT_DIR);
};

const classifyImagesByEncoder = (includedImages: string[]) => {
  const jpegImages = includedImages.filter((image) => {
    return image.endsWith(".jpg") || image.endsWith(".jpeg");
  });
  const pngImages = includedImages.filter((image) => {
    return image.endsWith(".png");
  });
  const webpImages = includedImages.filter((image) => {
    return image.endsWith(".webp");
  });

  return [
    {
      encoder: "mozjpeg",
      images: jpegImages,
    },
    {
      encoder: "oxipng",
      images: pngImages,
    },
    {
      encoder: "webp",
      images: webpImages,
    },
  ];
};

const resize = async (images: Array<{ encoder: string; images: string[] }>) => {
  console.log("Resizing...");

  const { t, w } = argv;
  const target = t ? t : await question("Type target dimension and value(e.g. w720): ", { choices: PRESET_WIDTHS });

  const parseTarget = (target: string) => {
    const re = /(?<dimension>[wh])(?<value>1?[0-9]{1,3})/;
    const match = re.exec(target);

    if (!match?.groups?.dimension || !match?.groups?.value) {
      console.error(chalk.red(`🌧 Invalid input: target value format must be like "w720"`));
      process.exit(1);
    }

    const dimension =
      match.groups.dimension === "w" ? "width" : match.groups.dimension === "h" ? "height" : ("" as never);

    return { [dimension]: parseInt(match.groups.value) };
  };

  const parsed = parseTarget(target);
  const resizeOption = JSON.stringify(parsed, null, 2);

  if (w) {
    const _images = images.flatMap(({ images }) => images);
    if (argv.debug) {
      const result = debugRun(
        INPUT_DIR,
        `${squoosh} --resize ${resizeOption} --webp ${encOption} -d ${OUTPUT_DIR} ${_images}`
      );
      debugOutput(result);
    } else {
      await $`${squoosh} --resize ${resizeOption} --webp ${encOption} -d ${OUTPUT_DIR} ${_images}`;
    }
  } else {
    await Promise.all(
      images.map(async ({ encoder, images }) => {
        if (images.length > 0) {
          if (argv.debug) {
            return debugRun(
              INPUT_DIR,
              `${squoosh} --resize ${resizeOption} --${encoder} ${encOption} -d ${OUTPUT_DIR} ${images}`
            );
          }
          await $`${squoosh} --resize ${resizeOption} --${encoder} ${encOption} -d ${OUTPUT_DIR} ${images}`;
        }
      })
    );
  }
};

const optimize = async (images: Array<{ encoder: string; images: string[] }>) => {
  console.log("Optimizing...");

  const { w } = argv;

  if (w) {
    const _images = images.flatMap(({ images }) => images);
    if (argv.debug) {
      const result = debugRun(INPUT_DIR, `${squoosh} --webp ${encOption} -d ${OUTPUT_DIR} ${_images}`);
      debugOutput(result);
    } else {
      await $`${squoosh} --webp ${encOption} -d ${OUTPUT_DIR} ${_images}`;
    }
  } else {
    await Promise.all(
      images.map(async ({ encoder, images }) => {
        if (images.length > 0) {
          if (argv.debug) {
            return debugRun(INPUT_DIR, `${squoosh} --${encoder} ${encOption} -d ${OUTPUT_DIR} ${images}`);
          }
          await $`${squoosh} --${encoder} ${encOption} -d ${OUTPUT_DIR} ${images}`;
        }
      })
    );
  }
};

const showCliHelp = async () => {
  const processOutput = await $`${squoosh} -h`;
  console.log(processOutput.stdout);
  process.exit(0);
};

const main = async () => {
  const { mode } = argv;

  if (argv.h || argv.help) {
    const showHelp = createHelpLogger(squooshHelp);
    showHelp(mode);
  }

  if (argv.H) {
    showCliHelp();
  }

  console.log(chalk.cyan("🏁 Start!"));

  setup();
  const includedImages = await includeImages();
  const classifiedImages = classifyImagesByEncoder(includedImages);

  switch (mode) {
    case "resize": {
      resize(classifiedImages);
      break;
    }
    case "optimize": {
      optimize(classifiedImages);
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
