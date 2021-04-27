import { IUser } from "../../interfaces/ICommon";
import {
  CHECK_SESSION,
  CHECK_SESSION_FAILED,
  CHECK_SESSION_SUCCESS,
  LOGOUT,
  LOGOUT_SUCCESS,
  VERIFY,
  VERIFY_FAILED,
  VERIFY_SUCCESS,
} from "../actionTypes";

export const verifyCode = (params: any) => ({
  type: VERIFY,
  payload: params,
});

export const verifyCodeSuccess = (user: IUser) => ({
  type: VERIFY_SUCCESS,
  payload: user,
});

export const verifyCodeFailed = (error: any) => ({
  type: VERIFY_FAILED,
  payload: error,
});

export const checkSession = () => ({
  type: CHECK_SESSION,
});

export const checkSessionSuccess = (user: IUser) => ({
  type: CHECK_SESSION_SUCCESS,
  payload: user,
});

export const checkSessionFailed = (error: any) => ({
  type: CHECK_SESSION_FAILED,
  payload: error,
});

export const logout = () => ({
  type: LOGOUT,
});

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});
