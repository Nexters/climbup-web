import type { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import axios from "axios";

const createApiInstance = () => {
  const instance: AxiosInstance = axios.create({
    baseURL: "https://api.holdy.kr",
    headers: {
      "Content-Type": "application/json",
    },
  });
  // TODO: 토큰 인증 로직 추가
  // instance.interceptors.request.use(
  //   (config) => {
  //     const tokenFromCookie = Cookies.get("token");
  //     if (tokenFromCookie) {
  //       config.headers.Authorization = `Bearer ${tokenFromCookie}`;
  //     }
  //     return config;
  //   },
  //   (error) => {
  //     return Promise.reject(error);
  //   }
  // );
  // instance.interceptors.response.use(
  //   (res) => res,
  //   (err: AxiosError) => {
  //     return Promise.reject(err);
  //   }
  // );
  return instance;
};

const apiInstance = createApiInstance();

export const http = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig
): Promise<T> => {
  const promise = apiInstance({
    ...config,
    ...options,
  }).then(({ data }) => data);

  return promise;
};

export type ErrorType<Error> = AxiosError<Error>;

export type BodyType<BodyData> = BodyData;
