import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
} from "axios";

const createApiInstance = () => {
  const instance: AxiosInstance = axios.create({
    baseURL: import.meta.env.PROD ? "/api" : "https://dev-api.holdy.kr",
    headers: {
      "Content-Type": "application/json",
    },
  });

  instance.interceptors.response.use(
    (res) => res,
    (err: AxiosError) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          // refresh token 요청
        }
      }
      return Promise.reject(err);
    }
  );
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
