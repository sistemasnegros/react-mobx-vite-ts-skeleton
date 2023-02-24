export class BaseAPIRepositoriy {
  API_URL = import.meta.env.VITE_API_URL;
  genURL = (path: string) => `${this.API_URL}${path}`;
}
