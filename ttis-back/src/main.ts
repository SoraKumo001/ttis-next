import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as os from 'os';
import * as cluster from 'cluster';
import * as fs from 'fs';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

const dev = process.env.NODE_ENV !== 'production';
const socket = process.platform !== 'win32';
const sock_path = '/var/run/socks/node-back.sock';
const port_number = 3000;

async function bootstrap() {
  const clusterSize = Math.min(os.cpus().length, 4);

  if (cluster.isMaster && !dev) {
    try {
      fs.unlinkSync(sock_path);
    } catch (error) {}

    for (let i = 0; i < clusterSize; i++) {
      cluster.fork();
    }

    cluster.on('exit', function (worker) {
      console.log(`Worker ${worker.id} has exited.`);
    });
  } else {
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), {
      logger: ['error', 'warn'],
    });

    if (socket) {
      if (!cluster.worker) {
        try {
          fs.unlinkSync(sock_path);
        } catch (error) {}
      }
      app.listen(sock_path, () => {
        fs.chmodSync(sock_path, '666');
        console.log(`(BACK:${cluster.worker?.id || 0}) unix:${sock_path}`);
      });
    } else {
      app.listen(port_number, () => {
        console.log(`(BACK:${cluster.worker?.id || 0}) http://localhost:${port_number}/graphql`);
      });
    }
  }
}
bootstrap();
