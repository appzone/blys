import jwt from "jsonwebtoken";
import { BaseContext } from "koa";
import { description, request, summary, tagsAll } from "koa-swagger-decorator";
import { config } from "../config";
import { verifyUserByCode } from "../services/authService";
import { ErrorReason, HttpError } from "../utils/httpError";
import Response from "../utils/response";

@tagsAll(["Auth"])
export default class GeneralController {


  @request("post", "/api/auth/verify")
  @summary("Verify")
  @description("Verify by verification code")
  public static async verify(ctx: BaseContext): Promise<void> {
    const { code } = ctx.request.body;
    const user = verifyUserByCode(code);
    if (!user) {
      throw new HttpError("User not found", ErrorReason.NOT_FOUND);
    }
    const accessToken = jwt.sign(user, config.jwtSecret);
    const data = { ...user, accessToken };
    const response = new Response(data);
    ctx.body = response;
  }

  @request("post", "/api/auth/me")
  @summary("Get Me")
  @description("Get my current logged in")
  public static async getMe(ctx: BaseContext): Promise<void> {
    const user = ctx.state.user;
    const response = new Response(user);
    ctx.body = response;
  }

}
