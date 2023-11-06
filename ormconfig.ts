/* eslint-disable @typescript-eslint/no-var-requires */

import { Product } from 'src/modules/product/database/product.entity';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { User } from './src/modules/users/database/user.entity';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
console.log(__dirname, 'dirname');


const SnakeNamingStrategy =
  require('typeorm-naming-strategies').SnakeNamingStrategy;
const config: MysqlConnectionOptions = {
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USERNAME || '',
  password: process.env.DB_PASSWORD || '',
  type: 'mysql',
  database: process.env.DB_DATABASE || '',
  entities: [ __dirname + '/**/**/**/*.entity{.ts,.js}'],
  synchronize: false, 
  namingStrategy: new SnakeNamingStrategy(),
};

export default config;
