import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { globalStore } from "../ui/context/store.context";

interface IResponse {
  status: number;
  data: any;
  message: string;
  code: string;
}

class HttpAxios {
  private http: AxiosInstance;
  baseURL = import.meta.env.VITE_API_URL as string;
  constructor() {
    this.http = axios.create({
      baseURL: this.baseURL,
    });

    this.http.interceptors.response.use(
      (response) => {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
      },
      (error) => {
        console.log("erro from interceptor", error);
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error

        if (
          error?.response?.data?.message === "Invalid or expired JWT" ||
          error?.response?.data === "invalid token"
        ) {
          globalStore.logout();
          globalStore.setErr({ message: "Session Expirada!" });
        }

        return Promise.reject(error);
      }
    );
  }

  // setToken(token: string) {
  //   this.http.defaults.headers.common = { Authorization: `Bearer ${token}` };
  // }

  // unsetToken() {
  //   delete this.http.defaults.headers.common["Authorization"];
  // }

  delete(url: string, opts?: any) {
    return this.run(() => this.http.delete(url, this.generateConfig(opts)));
  }

  post(url: string, body: any, opts?: any) {
    return this.run(() => this.http.post(url, body, this.generateConfig(opts)));
  }

  setTokenHeader(token: string) {
    return { Authorization: `Bearer ${token}` };
  }

  generateConfig(opts: any) {
    const config: any = {};
    config.params = opts?.params ?? {};
    config.headers = (opts?.token && this.setTokenHeader(opts.token)) ?? {};
    return config;
  }

  get(url: string, opts?: { params?: any; token?: string }) {
    return this.run(() => this.http.get(url, this.generateConfig(opts)));
  }

  put(url: string, body: any, opts?: { params?: any; token?: string }) {
    return this.run(() => this.http.put(url, body, this.generateConfig(opts)));
  }

  async run(command: () => Promise<any>): Promise<[IResponse, any | null]> {
    try {
      const res = await command();

      return [
        {
          status: res.status,
          data: res.data,
          code: res.code,
          message: res.message,
        },
        null,
      ];
    } catch (err: any) {
      console.log("Error in request: ", err);

      if (err.code === "ERR_NETWORK") {
        const res: IResponse = {
          status: err.response.status,
          data: null,
          code: err.code,
          message: err.message,
        };

        return [res, err];
      }

      const res: IResponse = {
        status: err.response.status,
        data: err.response.data,
        code: err.code,
        message: err.message,
      };

      return [res, err];
    }
  }
}

export const HttpAxiosIns = new HttpAxios();
