import mongoose from "mongoose";
import config from "config";
import log from "../logger";

async function connect() {
  const databaseUri = config.get("dbUri") as string;
  try {
    await mongoose.connect(databaseUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    log.info("Database connected");
  } catch (error) {
    log.error("db error", error);
    process.exit(1);
  }
}

export default connect;
