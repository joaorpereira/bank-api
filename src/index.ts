import express, { Express } from "express";
import { AddressInfo } from "net";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import usersRoutes from "./routes/usersRoutes";
import accountsRoutes from "./routes/accountsRoutes";
import transactionsRoutes from "./routes/transactionsRoutes";

import swaggerUI from "swagger-ui-express";
import swaggerDocs from "./swagger.json";

dotenv.config();

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(morgan("combined"));

app.use("/users", usersRoutes);
app.use("/transactions", transactionsRoutes);
app.use("/accounts", accountsRoutes);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs, { explorer: true }));

const server = app.listen(process.env.PORT || 3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Serving running in http://localhost: ${address.port}`);
  } else {
    console.error(`Failure starting server`);
  }
});
