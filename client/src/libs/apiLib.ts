import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { defer, from, Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { config } from "../config";
import { getAccessToken } from "../services/authService";
interface IArgs {
  url: string;
  method: string;
  body?: object;
  params?: object;
  auth?: boolean;
}

const BASE_API_URL = config.baseApiUrl;

export const buildApiRequestRx = (args: IArgs): Observable<AxiosResponse<any>> => {
  return defer(() => {
    let axiosConfig: AxiosRequestConfig = {
      url: `${BASE_API_URL}${args.url}`,
      method: args.method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (args.body) {
      axiosConfig = { ...axiosConfig, data: args.body };
    }
    if (args.params) {
      axiosConfig = { ...axiosConfig, params: args.params };
    }

    if (args.auth) {
      axiosConfig.headers = {
        ...axiosConfig.headers,
        Authorization: `Bearer ${getAccessToken()}`,
      };
    }

    return from(axios(axiosConfig)).pipe(
      catchError((error) => {
        return throwError(error.response.data || error);
      }),
    );
  });
};

export const buildApiRequest = async (args: IArgs): Promise<AxiosResponse<any>> => {
  let axiosConfig: AxiosRequestConfig = {
    url: `${BASE_API_URL}${args.url}`,
    method: args.method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (args.body) {
    axiosConfig = { ...axiosConfig, data: args.body };
  }
  if (args.params) {
    axiosConfig = { ...axiosConfig, params: args.params };
  }

  if (args.auth) {
    axiosConfig.headers = {
      ...axiosConfig.headers,
      Authorization: `Bearer ${getAccessToken()}`,
    };
  }

  try {
    return await axios(axiosConfig);
  } catch (err) {
    throw err.response.data || err;
  }
};
