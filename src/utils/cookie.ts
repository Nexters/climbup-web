import type { RawAxiosRequestHeaders } from "axios";
import cookie from "js-cookie";

const TOKEN_NAME = "HDTK";

export const getHeaderToken = (
  config?: RawAxiosRequestHeaders
): RawAxiosRequestHeaders => {
  const token = cookie.get(TOKEN_NAME);
  if (!token) {
    return {};
  }
  return {
    Authorization: `Bearer ${token}`,
    ...config,
  };
};

export const getToken = () => {
  return cookie.get(TOKEN_NAME);
};

export const setToken = (token: string) => {
  cookie.set(TOKEN_NAME, token);
};
