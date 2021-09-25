import knex from "knex";

export default class DataBase {
  protected static connection = knex({
    client: "mysql",
    connection: {
      host: "localhost",
      port: 3308,
      user: "root",
      password: "password",
      database: "bank_database",
    },
  });
}
