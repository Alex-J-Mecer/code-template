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

  //  请求拦截
  instance.interceptors.request.use(
    //  请求前的拦截
    (config: AxiosRequestConfig) => {
      return config;
    },
    // 请求错误前的拦截
    (error) => {
      return Promise.reject(error);
    }
  );

  // ! 响应拦截
  instance.interceptors.response.use(
    (res) => {
      return res.data;
    },
    (err) => {
      return err;
    }
  );
  // 因为axios get 使用的属性名是 params 这里做的兼容
  if (!config.method || config.method === "get") {
    config.params = config.data;
  }
  return instance({
    ...config,
  });
}

export default request;
