# ð¬ FFmpeg

> FFmpeg ã¯ããªã¼ãã£ãªããããªãå­å¹ãé¢é£ããã¡ã¿ãã¼ã¿ãªã©ã®ãã«ãã¡ãã£ã¢ã³ã³ãã³ããå¦çããããã®ã©ã¤ãã©ãªããã¼ã«ã®ã³ã¬ã¯ã·ã§ã³ã§ãã

- ã¢ã¹ãã¯ãæ¯ãç¶­æãã¦ãªãµã¤ãº
- å½¢å¼å¤æ
- é³å£°æ½åºï¼mp4ããï¼
- åãæã
- GIFå¤æ
- Twitteræç¨¿ç¨ã«æé©å¤æ

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
    --help, -h      ãã«ã
    -H              CLIã®ãã«ã
[resize]
    -f              å¤æãããå½¢å¼æ¡å¼µå­(e.g. mp4)
    -t              ãªãµã¤ãºã®åºæºã¨ãªãè»¸ã¨ç®æ¨å¤(e.g. w720)
[convert]
    -f              å¤æãããå½¢å¼æ¡å¼µå­(e.g. mp4)
[clip]
    -f              å¤æãããå½¢å¼æ¡å¼µå­(e.g. mp4)
    -s              åãæãéå§æé(e.g. [hh:]mm:ss)
    -e              åãæãçµäºæé(e.g. [hh:]mm:ss)
[extract-audio]
    -f              å¤æãããå½¢å¼æ¡å¼µå­(e.g. mp3)
[gif]
    -fps            ãã¬ã¼ã ã¬ã¼ã(e.g. 40)
```

## Reference

FFmpeg

- <https://www.ffmpeg.org/ffmpeg.html>
- <https://ffmpeg.org/ffmpeg-utils.html#time-duration-syntax>
