import dotenv from "dotenv";
import knex from "knex";

dotenv.config();
export default class DataBase {
  protected static connection = knex({
    client: "mysql",
    connection: {
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_LOCAL_PORT),
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_ROOT_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    },
  });
}
