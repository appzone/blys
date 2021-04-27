import * as HttpStatus from "http-status";
import { BaseContext } from "koa";
import koaJwt from "koa-jwt";
import { config } from "../config";
import Response from "./response";

export const protectAuth = koaJwt({ secret: config.jwtSecret }).unless({ path: [/^\/swagger-/] });

export const errorHandler = async (ctx: BaseContext, next: () => Promise<any>) => {
  try {
    await next();
  } catch (err) {
    const response = new Response().fail(err);
    if (err.isKnownError) {
      ctx.status = err.statusCode;
    }
    if (err.message === "Authentication Error") {
      ctx.status = HttpStatus.UNAUTHORIZED;
    }
    ctx.body = response;
  }
};
