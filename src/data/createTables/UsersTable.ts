import DataBase from '../../database/DataBase'

class UsersTable extends DataBase {
  async create(): Promise<void> {
    try {
      await this.connection.raw(`
              CREATE TABLE users(
                  id VARCHAR(255) PRIMARY KEY,
                  name VARCHAR(255) NOT NULL,
                  password VARCHAR(255) NOT NULL,
                  email VARCHAR(255) NOT NULL UNIQUE,
                  cpf VARCHAR(255) NOT NULL,
                  date_of_birth DATETIME NOT NULL,
                  is_admin ENUM('NORMAL', 'ADMIN') DEFAULT 'NORMAL'
              );
          `)
      console.log('Users table created')
    } catch (error) {
      console.log(error.message)
    }
  }
}

export default new UsersTable()
