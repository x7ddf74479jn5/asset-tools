# 🧬 Squoosh

>Squoosh CLIは現在のところ、街で一番速い画像圧縮ツールではありませんし、そうなることを目指しているわけではありません。しかし、一度に多くの画像を十分に素早く圧縮することができるほど高速です。

```shell
Usage:
    Input directory: assets/squoosh
    Output directory: dist/squoosh
    Acceptable file formats: jpeg, jpg, png, webp

    yarn squoosh--optimize [options]    JPEG/PNG圧縮/Webp変換
    yarn squoosh-resize [options]       アスペクト比を維持したリサイズ

Options:
    --mode          optimize/resize
    --debug         dry-run
    --help, -h      ヘルプ
    -H              CLIのヘルプ
    -t              リサイズの基準となる軸と目標値(e.g. w720)
    -w              Webp変換フラグ
```

## Reference

Squoosh

- <https://github.com/GoogleChromeLabs/squoosh/tree/dev/cli>
