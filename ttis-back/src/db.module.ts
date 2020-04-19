import { TypeOrmModule } from '@nestjs/typeorm';

const isTest = global["TEST"];
const socket = !isTest && process.platform==='linux';
const sock_path = '/var/run/socks';

export const DBModule = TypeOrmModule.forRoot({
  type: 'postgres',
  host: socket ? sock_path : 'localhost',
  port: isTest ? 15432 : 5432,
  database: 'ttis',
  username: 'ttis',
  password: 'test',
  logging: !isTest,
  synchronize: true,
  autoLoadEntities: true,
  keepConnectionAlive:true
});
