import { IUser } from "./ICommon";

export interface ILoginResponse {
  data: {
    accessToken: string,
  };
}

export interface IUserResponse {
  data: IUser;
}
