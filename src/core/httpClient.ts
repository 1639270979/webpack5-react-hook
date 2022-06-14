import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse } from "axios"

const SUCCESS_CODE = 0

export interface Response<T> {
  code: number
  data: T
  msg: string
  server_date?: Date
}

export class HTTPClient {
  instance: AxiosInstance;
  successCode: string | number = SUCCESS_CODE
  constructor(config: AxiosRequestConfig = {}, successCode: string | number = SUCCESS_CODE) {
    const defaultConfig: AxiosRequestConfig = { baseURL: __DEV__ ? "http://dbg.weike.fm/api" : '/api' }
    this.instance = axios.create({ ...defaultConfig, ...config })
    this.setupCommonInterceptors();
    this.successCode = successCode
  }

  setupCommonInterceptors() {
    // 请求劫持
    this.instance.interceptors.request.use((config: any) => {
      return new Promise((resolve, reject) => {
        const requestConfig = {
          ...config
        }
        // 向所有的请求中加入 token 参数
        let token = window.session.userInfo?.accessToken
        resolve({
          ...requestConfig, params: {
            ...config.params,
            token
          }
        });
      })
    });
    // 响应劫持
    this.instance.interceptors.response.use((response: AxiosResponse) => {
      const { data, headers } = response
      if (data.code !== this.successCode) {
        return Promise.reject(response)
      }
      const { date } = headers
      if (isNaN(new Date(date).getTime())) {
        return {
          ...response.data,
          server_date: new Date()
        }
      }
      return {
        ...response.data,
        server_date: new Date(date)
      }
    });
  }

  request<T>(config: AxiosRequestConfig) {
    return this.instance.request<T, Response<T>>(config);
  }

  get<T>(url: string, config?: AxiosRequestConfig) {
    return this.instance.get<T, Response<T>>(url, config);
  }

  head<T>(url: string, config?: AxiosRequestConfig) {
    return this.instance.get<T, Response<T>>(url, config);
  }

  delete<T>(url: string, config?: AxiosRequestConfig) {
    return this.instance.delete<T, Response<T>>(url, config);
  }

  post<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.instance.post<T, Response<T>>(url, data, config);
  }

  put<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.instance.put<T, Response<T>>(url, data, config);
  }

  patch<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.instance.patch<T, Response<T>>(url, data, config);
  }

}

export const http = new HTTPClient();
