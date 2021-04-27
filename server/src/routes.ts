import { SwaggerRouter } from "koa-swagger-decorator";
import { auth, general } from "./controller";
import { protectAuth } from "./utils/middleware";

const router = new SwaggerRouter();

router.get("/api", general.helloWorld);
router.post("/api/auth/verify", auth.verify);

router.get("/api/auth/me", protectAuth, auth.getMe);

// Swagger endpoint
router.swagger({
  title: "blys-api",
  description: "API REST for Blys Test",
  version: "1.0.0",
});

// mapDir will scan the input dir, and automatically call router.map to all Router Class
router.mapDir(__dirname);

export { router };
