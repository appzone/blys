export interface IConfig {
    baseApiUrl: string;
}

const config: IConfig = {
    baseApiUrl: process.env.BASE_API_URL || "http://localhost:3000",
};

export { config };
