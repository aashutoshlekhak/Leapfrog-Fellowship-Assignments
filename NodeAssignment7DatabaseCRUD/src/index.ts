import express from "express";
import routes from "./routes";
import config from "./config";
import { requestLogger } from "./middlewares/logger";
import { genericErrorHandler, notFoundError } from "./middlewares/errorHandler";
import helmet from "helmet";
import rateLimiter from "express-rate-limit";
import cors from "cors";
const app = express();
const limiter = rateLimiter({
  windowMs: 60 * 1000,
  limit: 10,
  message: "Too many request",
});
app.use(helmet());

app.use(limiter);
const allowedOrigins = ["https://www.google.com", "http://localhost:3000"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, origin);
      } else {
        callback(new Error("Not allowed"));
      }
    },
  })
);

app.use(express.json());

app.use(requestLogger);

app.use(routes);

app.use(notFoundError);

app.use(genericErrorHandler);

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
