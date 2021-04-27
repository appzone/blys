import { IUserResponse } from "../interfaces/IApi";
import { IUser } from "../interfaces/ICommon";
import { buildApiRequest } from "../libs/apiLib";

const verifyCode = async (code: string): Promise<IUserResponse> => {
  const response = await buildApiRequest({
    url: "/api/auth/verify",
    method: "post",
    body: {
      code,
    },
    auth: true,
  });
  return response.data;
};

const getMe = async (): Promise<IUserResponse> => {
  const response = await buildApiRequest({
    url: "/api/auth/me",
    method: "get",
    auth: true,
  });
  return response.data;
};

export const saveSession = (user: IUser) => {
  localStorage.setItem("USER_SESSION", JSON.stringify(user));
  if (user.accessToken) {
    localStorage.setItem("ACCESS_TOKEN", user.accessToken);
  }
};

export const removeSession = () => {
  localStorage.removeItem("USER_SESSION");
  localStorage.removeItem("ACCESS_TOKEN");
};

export const getSession = () => {
  let user;
  try {
    user = JSON.parse(localStorage.getItem("USER_SESSION") || "");
  } catch (error) {
    user = null;
  }
  return user;
};

export const getAccessToken = () => {
  return localStorage.getItem("ACCESS_TOKEN");
};

export default {
  verifyCode,
  saveSession,
  getSession,
  getMe,
  removeSession,
  getAccessToken,
};
