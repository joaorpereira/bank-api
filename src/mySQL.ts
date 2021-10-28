import UsersTable from "./data/createTables/UsersTable";
import TransactionsTable from "./data/createTables/TransactionsTable";
import AccountsTable from "./data/createTables/AccountsTable";

const createTables = async () => {
  await UsersTable.create();
  await TransactionsTable.create();
  await AccountsTable.create();
};

createTables();
