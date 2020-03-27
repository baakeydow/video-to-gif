import express, { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import Busboy from 'busboy';
import ffmpeg from 'fluent-ffmpeg';

const router = express.Router();

router.post('/mp4-to-gif', (req: Request, res: Response, next: NextFunction) => {
  const busboy = new Busboy({ headers: req.headers });
  busboy.on('file', (fieldname: string, file: NodeJS.ReadableStream, filename: string, encoding: string, mimetype: string) => {
    console.log(`[INFO] Converting ${fieldname} named ${filename} => encoding: ${encoding}, mimetype: ${mimetype}`);
    const fileSaved = path.join('/tmp', `${new Date().getTime()}-${path.basename(filename)}`);
    const fstream = fs.createWriteStream(fileSaved);
    file.pipe(fstream);
    fstream.on('close', () => {
      const outputFile  = path.join('/tmp', `${new Date().getTime()}-converted-video.gif`);
      ffmpeg(fileSaved)
        .outputOption("-vf", "scale=320:-1:flags=lanczos,fps=15")
        .save(outputFile)
        .on('end', () => {
          res.download(outputFile)
        })
    });
  });
  return req.pipe(busboy);
});

router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.send(err);
});

export default router;