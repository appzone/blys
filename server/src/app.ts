import cors from "@koa/cors";
import Koa from "koa";
import bodyParser from "koa-bodyparser";
import helmet from "koa-helmet";
import jwt from "koa-jwt";
import koaLogger from "koa-logger";
import "reflect-metadata";
import winston from "winston";

import { config } from "./config";
import { router } from "./routes";
import { logger } from "./utils/logger";
import { errorHandler, protectAuth } from "./utils/middleware";

const app = new Koa();

// Provides important security headers to make your app more secure
app.use(helmet());

// Enable cors with default options
app.use(cors());

if (!config.isTestMode) {
  app.use(koaLogger());
}

// Serve error in json format
app.use(errorHandler);

// Enable bodyParser with default options
app.use(bodyParser());

app.use(router.routes());

const server = app.listen(config.port, () => logger.info(`Server running on port ${ config.port }`));

export default server;
