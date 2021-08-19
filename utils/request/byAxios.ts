import axios from "axios";

import type { AxiosRequestConfig } from "axios";

const env = process.env.NODE_ENV || "development";

const url = {
  development: "http://47.107.81.99:3000",
  production: "http://47.107.81.99:3000",
};

const baseURL = url[env];
function request(config: AxiosRequestConfig) {
  const instance = axios.create({
    // 公用的网络请求路径
    baseURL: baseURL,
    // 网络请求时间超时会自动断开
    timeout: 10000,
    method: "get",
  });
  instance.interceptors.request.use;
  instance.interceptors.response.use(
    (res) => {
      return res.data;
    },
    (err) => {
      return err;
    }
  );

  if (!config.method || config.method === "get") {
    config.params = config.data;
  }
  config.url = config.url?.replace("/api", "");
  return instance({
    ...config,
  });
}

export default request;
