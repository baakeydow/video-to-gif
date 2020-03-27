import http from 'http';
import helmet from 'helmet';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import videoRoutes from './routes/videoRoutes';

const server = express();

server.use(cookieParser());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(helmet());
server.disable('x-powered-by');

server.use('/api/v1/video', videoRoutes)
server.get('/hello', (req, res) => res.send('Hello World !!! Dopeness !!!'));

http.createServer(server).listen(9999, () => {
  console.log(`[INFO] VideoSvc\'API is running in ${process.env.NODE_ENV} mode on port :9999 !\n\n\n\n`);
})
