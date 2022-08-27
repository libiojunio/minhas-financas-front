import axios from 'axios';

export const urlBase = 'http://localhost:8080/';

export const httpClient = axios.create({
  withCredentials: true,
});

export default class ApiServices {

  constructor(apiUrl) {
    this.urlFinal = `${urlBase}${apiUrl}`;
  }

  static registrarToken(token) {
    if (token){
      httpClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }

  post(url, obj) {
    return httpClient.post(`${this.urlFinal}${url}`, obj);
  }

  put(url, obj) {
    return httpClient.put(`${this.urlFinal}${url}`, obj);
  }

  delete(url) {
    return httpClient.delete(`${this.urlFinal}${url}`);
  }

  get(url, options) {
    return httpClient.get(`${this.urlFinal}${url}`, options);
  }
}
