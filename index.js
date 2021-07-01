const express = require("express");
const userRouter = require("./users/users.routes");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const uriDb = process.env.DB_URL;

const PORT = process.env.PORT || 5500;

class Server {
  constructor() {
    this.server = null;
  }

  connectToDb() {
    mongoose
      .connect(uriDb, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      })
      .then(() => {
        console.log(`Server running. Use our API on port: ${PORT}`);
      })
      .catch((err) =>
        console.log(`Server not running. Error message: ${err.message}`),
      );
  }

  start() {
    this.server = express();
    this.initMiddlewares();
    this.connectToDb();
    this.initRoutes();
    this.listen();
  }

  initMiddlewares() {
    this.server.use(express.json());
    app.use(cors());
  }

  initRoutes() {
    this.server.use("/blog", userRouter);
  }

  listen() {
    this.server.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  }
}

const server = new Server();

server.start();
