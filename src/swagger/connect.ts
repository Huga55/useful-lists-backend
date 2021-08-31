import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { Express } from "express";

const swaggerConnect = (app: Express) => {
  const swaggerOptions = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "UsefulLists API",
        version: "1.0.0",
      },
    },
    apis: [`./src/swagger/*.swagger.ts`],
  };
  const swaggerDocs = swaggerJsdoc(swaggerOptions);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};

export default swaggerConnect;
