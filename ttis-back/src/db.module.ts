import { TypeOrmModule } from '@nestjs/typeorm';
import { Contents } from './contents/contents';
import { User } from './user/user';

const isTest = global["TEST"];
const socket = !isTest && process.platform !== 'win32';
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
 // entities: [Contents, User],
});
