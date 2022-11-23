import axios, { AxiosInstance } from "axios";

class HttpAxios {
  private http: AxiosInstance;
  baseURL = import.meta.env.VITE_API_URL as string;
  constructor() {
    this.http = axios.create({
      baseURL: this.baseURL,
    });
  }

  setToken(token: string) {
    this.http.defaults.headers.common = { Authorization: `Bearer ${token}` };
  }

  unsetToken() {
    delete this.http.defaults.headers.common["Authorization"];
  }

  post(url: string, body: any) {
    return this.http.post(url, body);
  }

  get(url: string, params?: any) {
    return this.http.get(url, { params });
  }
}

export const HttpAxiosIns = new HttpAxios();
