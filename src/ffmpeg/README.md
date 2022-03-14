# 🎬 FFmpeg

> FFmpeg は、オーディオ、ビデオ、字幕、関連するメタデータなどのマルチメディアコンテンツを処理するためのライブラリやツールのコレクションです。

- アスペクト比を維持してリサイズ
- 形式変換
- 音声抽出（mp4から）
- 切り抜き
- GIF変換
- Twitter投稿用に最適変換

```shell
Usage:
    brew install ffmpeg

    Input directory: assets/ffmpeg
    Output directory: dist/ffmpeg
    Acceptable file formats: mp4, avi, wmv, mkv, mov

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
[gif]
    -fps            フレームレート(e.g. 40)
```

## Reference

FFmpeg

- <https://www.ffmpeg.org/ffmpeg.html>
- <https://ffmpeg.org/ffmpeg-utils.html#time-duration-syntax>
