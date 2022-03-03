#!/usr/bin/env zx

import "zx/globals";

import { PRESET_WIDTH } from "./constant.mjs";

const squoosh = "node_modules/@squoosh/cli/src/index.js";
const INPUT_DIR = "assets/squoosh";
const OUTPUT_DIR = "dist/squoosh";
const encOption = "auto";

const includeImages = async () => {
  console.log("Including images...");

  const images = await glob(`${INPUT_DIR}/*.{jpg,jpeg,png,webp}`);

  if (images.length === 0) {
    console.error(chalk.red(`🌧 Image files are not found in "${INPUT_DIR}"`));
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

  // progress.setStatus("🧹Cleaning output directory...");
  console.log("🧹Cleaning output directory...");
  fs.emptyDirSync(OUTPUT_DIR);
};

const classifyImagesByEncoder = async (includedImages: string[]) => {
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
  const target = t ? t : await question("Type target dimension and value(e.g. w720): ", { choices: PRESET_WIDTH });

  const parseTarget = async (target: string) => {
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

  const parsed = await parseTarget(target);
  const resizeOption = JSON.stringify(parsed);

  if (w) {
    await $`${squoosh} --resize ${resizeOption} --webp ${encOption} -d ${OUTPUT_DIR} ${INPUT_DIR}`;
  } else {
    await Promise.all(
      images.map(async ({ encoder, images }) => {
        if (images.length > 0) {
          await $`${squoosh} --resize ${resizeOption} --${encoder} ${encOption} -d ${OUTPUT_DIR} ${images}`;
        }
      })
    );
  }
};

const optimize = async (images: Array<{ encoder: string; images: string[] }>) => {
  console.log("Optimizing...");

  const { webp: shouldConvertWebp } = argv;

  if (shouldConvertWebp) {
    await $`${squoosh} --webp ${encOption} -d ${OUTPUT_DIR} ${INPUT_DIR}`;
  } else {
    await Promise.all(
      images.map(async ({ encoder, images }) => {
        if (images.length > 0) {
          await $`${squoosh} --${encoder} ${encOption} -d ${OUTPUT_DIR} ${images}`;
        }
      })
    );
  }
};

const main = async () => {
  console.log(chalk.cyan("🏁 Start!"));

  const { mode } = argv;
  await setup();
  const includedImages = await includeImages();
  const classifiedImages = await classifyImagesByEncoder(includedImages);

  switch (mode) {
    case "resize": {
      await resize(classifiedImages);
      break;
    }
    case "optimize": {
      await optimize(classifiedImages);
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
