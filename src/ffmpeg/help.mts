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
      https://www.ffmpeg.org/ffmpeg.html
  `,
  convert: `
  Usage:
      brew install ffmpeg (if you have not installed)

      yarn ffmpeg-convert [options]
  
  Options:
      --debug         dry-run
      --help, -h      ヘルプ
      -H              CLIのヘルプ
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
      -H              CLIのヘルプ
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
      -H              CLIのヘルプ
      -f              変換したい形式拡張子(e.g. mp4)
      -s              切り抜き開始時間(e.g. [hh:]mm:ss)
      -e              切り抜き終了時間(e.g. [hh:]mm:ss)

  Reference:
      https://www.ffmpeg.org/ffmpeg.html  
  `,
  "extra-audio": `
  [Caution] This is a experimental mode depended on input movies don't work.
  Input directory: 
  Output directory:
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
      https://www.ffmpeg.org/ffmpeg.html   
  `,
  gif: `
  Usage:
      brew install ffmpeg (if you have not installed)

      yarn ffmpeg-gif [options]

  Options:
      --debug         dry-run
      --help, -h      ヘルプ
      -H              CLIのヘルプ
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
      -H              CLIのヘルプ

  Reference:
      https://www.ffmpeg.org/ffmpeg.html  
  `,
};
