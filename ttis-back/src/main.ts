import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from "fs";

const socket = process.platform !== "win32";
const sock_path = "/var/run/socks/node-back.sock";
const port_number = 3000;

async function bootstrap() {

  try {
    fs.unlinkSync(sock_path);
  } catch (error) {}

  const app = await NestFactory.create(AppModule);

  if (socket) {
    app.listen(sock_path, () => {
      fs.chmodSync(sock_path, "666");
      console.log(`> Ready on unix:${sock_path}`);
    });
  } else {
    app.listen(port_number, () => {
      console.log(`> Ready on http://localhost:${port_number}/`);
    });
  }
}
bootstrap();
