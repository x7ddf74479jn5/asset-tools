export const squooshHelp = {
  base: `
  Usage:
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
      https://github.com/GoogleChromeLabs/squoosh/tree/dev/cli
  `,
  optimize: `
  Usage:
      yarn squoosh--optimize [options]    JPEG/PNG圧縮/Webp変換

  Options:
      --debug         dry-run
      --help, -h      ヘルプ
      -H              CLIのヘルプ
      -w              Webp変換フラグ

  Reference:
      https://github.com/GoogleChromeLabs/squoosh/tree/dev/cli
  `,
  resize: `
  Usage:
      yarn squoosh-resize [options]       アスペクト比を維持したリサイズ

  Options:
      --debug         dry-run
      --help, -h      ヘルプ
      -H              CLIのヘルプ
      -t              リサイズの基準となる軸と目標値(e.g. w720)
      -w              Webp変換フラグ

  Reference:
      https://github.com/GoogleChromeLabs/squoosh/tree/dev/cli
  `,
};
