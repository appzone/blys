import { loadingBarReducer } from "react-redux-loading-bar";
import { combineReducers } from "redux";
import { IUser } from "../../interfaces/ICommon";
import authReducers from "./authReducers";

const reducers = combineReducers({
  auth: authReducers,
  loadingBar: loadingBarReducer,
});

export default reducers;

export interface IAuthState {
  isLoading: boolean;
  isLoggedIn: boolean;
  user?: IUser;
  errorMessage?: string;
}
export interface IToastState {
  show: boolean;
  text: string;
  variant: "success" | "warning" | "info" | "error";
}
