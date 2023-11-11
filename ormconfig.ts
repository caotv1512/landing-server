/* eslint-disable @typescript-eslint/no-var-requires */
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const SnakeNamingStrategy =
  require('typeorm-naming-strategies').SnakeNamingStrategy;
const config: MysqlConnectionOptions = {
  host: process.env.DB_HOST || 'us-cdbr-east-05.cleardb.net',
  port: 3306,
  username: process.env.DB_USERNAME || 'b5070b3c48134c',
  password: process.env.DB_PASSWORD || 'c01a8ec1',
  type: 'mysql',
  database: process.env.DB_DATABASE || 'heroku_57988a24c569b4e',
  entities: [__dirname + '/**/**/**/*.entity{.ts,.js}'],
  synchronize: false,
  namingStrategy: new SnakeNamingStrategy(),
};

export default config;
