export const squooshHelp = {
  base: `
  Usage:
      yarn squoosh--optimize [options]    JPEG/PNG圧縮/Webp変換
      yarn squoosh-resize [options]       アスペクト比を維持したリサイズ

  Options:
      --mode          optimize/resize
      --debug         dry-run
      --help, -h      ヘルプ
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
      -t              リサイズの基準となる軸と目標値(e.g. w720)
      -w              Webp変換フラグ

  Reference:
      https://github.com/GoogleChromeLabs/squoosh/tree/dev/cli
  `,
};

export const svgrHelp = {
  base: `
  Usage:
      yarn svgr       SVGからReact TypeScript Componentに変換

  Options:
      --debug         dry-run
      --help, -h      ヘルプ
  
  Reference:
      https://react-svgr.com/
      https://github.com/gregberge/svgr
  `,
};

export const budouxHelp = {
  base: `
  Usage:
      yarn budoux [options]       テキストファイル内の文字列を整形したHTML文字列へ変換し、JSONとして出力

  Options:
      --debug         dry-run
      --help, -h      ヘルプ

  Reference:
      https://github.com/google/budoux/blob/main/javascript/README.md
  `,
};

export const ffmpegHelp = {
  base: `
  Usage:
      brew install ffmpeg (if you have not installed)

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
      https://www.ffmpeg.org/ffmpeg.html
  `,
  convert: `
  Usage:
      brew install ffmpeg (if you have not installed)

      yarn ffmpeg-convert [options]
  
  Options:
      --debug         dry-run
      --help, -h      ヘルプ
      -f              変換したい形式拡張子(e.g. mp4)

  Reference:
      https://www.ffmpeg.org/ffmpeg.html
  `,
  resize: `
  Usage:
      brew install ffmpeg (if you have not installed)

      yarn ffmpeg-resize [options]

  Options:
      --debug         dry-run
      --help, -h      ヘルプ
      -f              変換したい形式拡張子(e.g. mp4)
      -t              リサイズの基準となる軸と目標値(e.g. w720)

  Reference:
      https://www.ffmpeg.org/ffmpeg.html
  `,
  clip: `
  Usage:
      brew install ffmpeg (if you have not installed)

      yarn ffmpeg-clip [options]

  Options:
      --debug         dry-run
      --help, -h      ヘルプ
      -f              変換したい形式拡張子(e.g. mp4)
      -s              切り抜き開始時間(e.g. [hh:]mm:ss)
      -e              切り抜き終了時間(e.g. [hh:]mm:ss)

  Reference:
      https://www.ffmpeg.org/ffmpeg.html  
  `,
  "extra-audio": `
  Usage:
      brew install ffmpeg (if you have not installed)

      yarn ffmpeg-extra-audio [options]

  Options:
      --debug         dry-run
      --help, -h      ヘルプ
      -f              変換したい形式拡張子(e.g. mp3)

  Reference:
      https://www.ffmpeg.org/ffmpeg.html   
  `,
  gif: `
  Usage:
      brew install ffmpeg (if you have not installed)

      yarn ffmpeg-gif [options]

  Options:
      --debug         dry-run
      --help, -h      ヘルプ
      -fps            フレームレート(e.g. 40)

  Reference:
      https://www.ffmpeg.org/ffmpeg.html  
  `,
  twitter: `
  Usage:
      brew install ffmpeg (if you have not installed)

      yarn ffmpeg-twitter [options]

  Options:
      --debug         dry-run
      --help, -h      ヘルプ

  Reference:
      https://www.ffmpeg.org/ffmpeg.html  
  `,
};
