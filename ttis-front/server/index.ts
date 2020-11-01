import expressSession from 'express-session';
import redis from 'redis';
import redisStore from 'connect-redis';
import express from 'express';
import { parse } from 'url';
import fs from 'fs';
import next from 'next';
import { getFiles } from './getFiles';

const dev = process.env.NODE_ENV !== 'production';
const socket = process.platform !== 'win32' && !dev;
const app = next({ dev });
const handle = app.getRequestHandler();

const port_number = 3001;
const sock_path = '/var/run/socks/node-front.sock';
const redis_path = '/var/run/socks/redis.sock';

const session = expressSession({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  store: new (redisStore(expressSession))({
    client: socket
      ? redis.createClient(redis_path).on('error', (err) => console.error(err))
      : redis.createClient(),
  }),
});

try {
  fs.unlinkSync(sock_path);
} catch (error) {}

app.prepare().then(async () => {
  const server = express();

  const files = (await getFiles('.next/static')).map((file) => file.replace(/^\./, '_'));

  server.use(session);
  server.get('/page/:id/', (req, res) => {
    res.header(
      'link',
      files.map((file) => `</${file}>; rel=preload; as=script`)
    );
    handle(req, res, parse(`/`, true));
  });
  server.get('/', (req, res) => {
    res.header(
      'link',
      files.map((file) => `</${file}>; rel=preload; as=script`)
    );
    handle(req, res);
  });
  server.use((req, res) => {
    handle(req, res, parse(req.url, true));
  });

  if (socket) {
    server
      .listen(sock_path)
      .on('listening', () => {
        fs.chmodSync(sock_path, '666');
        console.log(`> Ready on unix:${sock_path}`);
      })
      .on('error', (err) => {
        if (err) throw err;
      });
  } else {
    server
      .listen(port_number)
      .on('listening', () => {
        console.log(`> Ready on http://localhost:${port_number}/`);
      })
      .on('error', (err: unknown) => {
        if (err) throw err;
      });
  }
});
