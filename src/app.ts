import express from "express";
import config from "config";
import i18next from "i18next";
import i18nextMiddleware from "i18next-express-middleware";
import log from "./logger";
import connect from "./db/connect";
import routes from "./routes";
import swaggerConnect from "./swagger/connect";
import deserializeUser from "./middleware/deserializeUser";
import i18n from "./i18n";

// config variables
const port = config.get("port") as number;
const host = config.get("host") as string;

// app and settings
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// swagger
swaggerConnect(app);

// deserialize user data from token
app.use(deserializeUser);

// i18n
i18n();
app.use(i18nextMiddleware.handle(i18next));

app.listen(port, host, () => {
  log.info(`Server listening at http://${host}:${port}`);

  connect();

  routes(app);
});

export default app;
