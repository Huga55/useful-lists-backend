import express from "express";
import config from "config";
import swaggerUI from "swagger-ui-express";
import log from "./logger";
import connect from "./db/connect";
import routes from "./routes";
import swaggerDocument from "../swagger.json";

// config variables
const port = config.get("port") as number;
const host = config.get("host") as string;

// app and settings
const app = express();

// swagger
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, host, () => {
  log.info(`Server listening at http://${host}:${port}`);

  connect();

  routes(app);
});
