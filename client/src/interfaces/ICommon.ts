export interface IReduxAction {
  type: string;
  payload: any;
}

export interface IUser {
  name: string;
  accessToken: string;
}
