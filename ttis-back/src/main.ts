import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as os from 'os';
import * as cluster from 'cluster';
import * as fs from 'fs';

const socket = process.platform !== 'win32';
const sock_path = '/var/run/socks/node-back.sock';
const port_number = 3000;

async function bootstrap() {
  const clusterSize = os.cpus().length;

  if (cluster.isMaster) {
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
    const app = await NestFactory.create(AppModule, {
      logger: ['error', 'warn'],
    });

    if (socket) {
      app.listen(sock_path, () => {
        fs.chmodSync(sock_path, '666');
        console.log(`(BACK:${cluster.worker.id}) unix:${sock_path}`);
      });
    } else {
      app.listen(port_number, () => {
        console.log(
          `(BACK:${cluster.worker.id}) http://localhost:${port_number}/graphql`,
        );
      });
    }
  }
}
bootstrap();
