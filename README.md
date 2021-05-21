<h1 align="center">
    Bank API
</h1>

<p align="center">
  <a href="https://www.linkedin.com/in/joaorpereira">
    <img 
        alt="Made by Joao Paulo Pereira" 
        src="https://img.shields.io/badge/MADE%20BY-Joao%20Paulo-%230077b5?style=flat-square&logo=linkedin">
  </a>

  <img alt="License" src="https://img.shields.io/badge/license-MIT-%20brightgreen?style=flat-square&logo=">

  <a href="https://www.typescript.com/">
    <img 
        alt="TypeScript" 
        src="https://img.shields.io/badge/Stack-TypeScript-%230077b5?style=flat-square&logo=TypeScript">
  </a>
  <a href="">
    <img 
        alt="server Node.js" 
        src="https://img.shields.io/badge/Server-Node.js-%23339933?style=flat-square&logo=node.js">
  </a>
</p>

<p align="center">
 <a href="#about">About</a> • 
 <a href="#technologies">Technologies</a> • 
 <a href="#how-to-start-the-project">How to start the project</a> • 
  <a href="#mysql-database">MySQL database</a> • 
 <a href="#license">License</a> • 
 <a href="#developer">Developer</a>
</p>

---
### About

The project **Bank API** were made to start my journey learning backend using **NodeJS** and **Typescript**.

---

### Technologies

- [Typescript](https://www.typescriptlang.org);
- [Node.js](https://nodejs.org/en/);
    * [express](https://expressjs.com/);
    * [bcryptjs](https://www.npmjs.com/package/bcryptjs);
    * [cors](https://www.npmjs.com/package/cors);
    * [dotenv](https://www.npmjs.com/package/dotenv);
    * [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken);
    * [uuid](https://www.npmjs.com/package/uuid);
    * [knex](https://www.npmjs.com/package/knex);
- [Mysql](https://www.mysql.com)
- [Git](https://git-scm.com/);
- [VSCode](https://code.visualstudio.com/);

---

### How to start the project

##### Clone repository:
```bash
$ git clone https://github.com/joaorpereira/bank-api.git
```
##### Get inside folder:
```bash
$ cd bank-api
```
##### Install dependencies:
```bash
$ npm install
```
##### Create MySQL database:
```bash
$ create database as bank_database at MySQL 
```
##### Get inside folder:
```bash
$ create database as bank_database at MySQL 
```
##### Create database connection:
```bash
  client: 'mysql',
  connection: {
    host: proccess.env.HOST,
    port: 3306,
    user: proccess.env.DB_NAME,
    password: proccess.env.DB_PASSWORD,
    database: proccess.env.DB_DATABASE,
  },
```
##### Create MySQL tables:
```bash
$ npm create-tables
```
##### Start project:
```bash
$ npm run dev
```
##### The endpoints of this API are at the file .rest in this repository

---

### MySQL database

##### Users Table
```bash
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    cpf VARCHAR(255) NOT NULL,
    date_of_birth DATETIME NOT NULL,
    is_admin ENUM('NORMAL', 'ADMIN') DEFAULT 'NORMAL'
```
##### Transactions Table
```bash
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) NULL,
    value FLOAT NOT NULL,
    type VARCHAR(50) NOT NULL,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
```
##### Accounts Table
```bash
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) NULL,
    user_name VARCHAR(255) NOT NULL REFERENCES users(name),                
    balance FLOAT DEFAULT 0,             
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
```
---

### License

This project is under <a href="https://opensource.org/licenses/MIT">MIT</a> license

---

### Developer

<p align="center">
    <a href="https://github.com/joaorpereira">
        <img 
            style="border-radius: 50%;" 
            src="https://media-exp1.licdn.com/dms/image/C4D03AQGEHyoBgJ7tNQ/profile-displayphoto-shrink_200_200/0/1597502062146?e=1617235200&v=beta&t=n4EVd2fDroZ4tR3DiY6iXIs-27xhiGXwwoRuZh10ElQ" 
            width="120px;" 
            alt="Foto">
        <br/>
        <sub><b>Joao Paulo</b></sub>
    </a>
</p>
<h6 align="center">
    Desenvolvido por Joao Paulo.
</h6>
<p align="center">
    <a href="https://www.linkedin.com/in/joaorpereira">
    <img 
        alt="Linkedin Joao Paulo Rodrigues" 
        src="https://img.shields.io/badge/-Joao%20Paulo-%230077b5?style=flat-square&logo=linkedin">
    </a>
    <a href="mailto:rpjoaopaulo28@gmail.com">
        <img 
            alt="gmail Joao Paulo" 
            src="https://img.shields.io/badge/-Gmail-%23c14438?style=flat-square&logo=gmail&logoColor=white">
    </a>
</p>
