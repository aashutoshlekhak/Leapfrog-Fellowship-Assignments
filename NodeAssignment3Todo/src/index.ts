import express from "express";
import routes from "./routes";
import config from "./config";
import { requestLogger } from "./middlewares/logger";
import { genericErrorHandler, notFoundError } from "./middlewares/errorHandler";
const app = express();
app.use(express.json());

app.use(requestLogger);
app.use(routes);

app.use(notFoundError);

app.use(genericErrorHandler);

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
