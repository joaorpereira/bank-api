import DataBase from '../../database/DataBase'
class AccountsTable extends DataBase {
  async create(): Promise<void> {
    try {
      await this.connection.raw(`
              CREATE TABLE accounts(
                  id VARCHAR(255) PRIMARY KEY,
                  user_id VARCHAR(255) NULL,
                  user_name VARCHAR(255) NOT NULL REFERENCES users(name),                
                  balance FLOAT DEFAULT 0,             
                  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
              );
          `)
      console.log('Accounts table created')
    } catch (error) {
      console.log(error.message)
    }
  }
}

export default new AccountsTable()
