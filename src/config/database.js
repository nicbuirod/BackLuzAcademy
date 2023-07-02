import mongoose from "mongoose";
import CONFIG from "./config.js";

class Database {
  constructor() {
    this.connection = null;
  }

  async connect() {
    if (this.connection) return this.connection;

    return mongoose
      .connect(process.env.DB || "")
      .then((connection) => {
        this.connection = connection;
        console.log("Database connected");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async disconnect() {
    return mongoose
      .disconnect()
      .then(() => {
        console.log("database disconnected");
      })
      .catch(() => {
        console.log(error);
      });
  }
}

export default Database;
