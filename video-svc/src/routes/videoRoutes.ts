import express, { Request, Response, NextFunction } from 'express';
import temp from 'temp';
import Busboy from 'busboy';
import ffmpeg from 'fluent-ffmpeg';
import pathToFfmpeg from 'ffmpeg-static';
ffmpeg.setFfmpegPath(pathToFfmpeg);

const router = express.Router();

router.post('/mp4-to-gif', (req: Request, res: Response, next: NextFunction) => {
  const busboy = new Busboy({ headers: req.headers });
  busboy.on('file', (fieldname: string, file: NodeJS.ReadableStream, filename: string, encoding: string, mimetype: string) => {
    console.log(`[INFO] Converting ${fieldname} named ${filename} => encoding: ${encoding}, mimetype: ${mimetype}`);
    temp.track();
    try {
      const fstream = temp.createWriteStream();
      const tempPath = temp.path({ suffix: '.gif' });
      file.pipe(fstream);
      fstream.on('close', () => {
        ffmpeg(String(fstream.path))
          .outputOption("-vf", "scale=320:-1:flags=lanczos,fps=15")
          .save(tempPath)
          .on('end', () => {
            res.download(tempPath);
            temp.cleanup();
          })
      });
    } catch(e) {
      console.error(e)
    }
  });
  return req.pipe(busboy);
});

router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.send(err);
});

export default router;