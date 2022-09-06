import 'dotenv/config';
import { Options } from 'sequelize';

const config: Options = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOSTNAME,
  port: Number(process.env.DB_PORT),
  dialect: 'postgres',
  logging: false,
}

module.exports = config;