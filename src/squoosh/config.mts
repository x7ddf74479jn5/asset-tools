import { argv } from "zx";

export const INPUT_DIR = argv.test ? "tests/assets/squoosh" : "assets/squoosh";
export const OUTPUT_DIR = argv.test ? "tests/dist/squoosh" : "dist/squoosh";
