import DataBase from "../../database/DataBase";

class TransactionsTable extends DataBase {
  async create(): Promise<void> {
    try {
      await DataBase.connection.raw(`
              CREATE TABLE transactions(
                  id VARCHAR(255) PRIMARY KEY,
                  user_id VARCHAR(255) NULL,
                  value FLOAT NOT NULL,
                  type VARCHAR(50) NOT NULL,
                  description TEXT,
                  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
              );
          `);
      console.log("Transactions table created");
    } catch (error) {
      console.log(error.message);
    }
  }
}

export default new TransactionsTable();
