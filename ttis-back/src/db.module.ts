import { TypeOrmModule } from '@nestjs/typeorm';

const isTest = global['TEST'];
const socket = !isTest && process.platform === 'linux';
const sock_path = '/var/run/socks';

//アプリケーション&結合テスト用DB設定
export const DBModule = TypeOrmModule.forRoot({
  type: 'postgres',
  host: socket ? sock_path : 'localhost',
  database: isTest ? 'ttis-combined-test' : 'ttis',
  username: 'ttis',
  password: 'test',
  logging: false,
  synchronize: true,
  autoLoadEntities: true,
  keepConnectionAlive: true,
});

//単体テスト用DB設定
export const DBModule2 = TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  database: isTest ? 'ttis-unit-test' : 'ttis',
  username: 'ttis',
  password: 'test',
  logging: false,
  synchronize: true,
  autoLoadEntities: true,
  keepConnectionAlive: true,
});