import dotenv from "dotenv";

dotenv.config({ path: ".env" });

export interface IConfig {
  port: number;
  debugLogging: boolean;
  jwtSecret: string;
  isTestMode: boolean;
}

const isDevMode = process.env.NODE_ENV === "development";

const config: IConfig = {
  port: +(process.env.PORT || 3000),
  debugLogging: isDevMode,
  isTestMode: process.env.NODE_ENV === "test",
  jwtSecret: process.env.JWT_SECRET || "your-secret-whatever",
};

export { config };
