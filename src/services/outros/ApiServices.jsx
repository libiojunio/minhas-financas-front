import axios from 'axios';
import LocalStorageService from './LocalStorageService';
import {_USUARIO_LOGADO} from '../../utils/constantes';

export const urlBase = 'https://minhas-financas-libio.herokuapp.com/';

export const httpClient = axios.create({
  withCredentials: true,
});

export default class ApiServices {

  constructor(apiUrl) {
    this.urlFinal = `${urlBase}${apiUrl}`;
    const _usuario_logado = LocalStorageService.getItemObj(_USUARIO_LOGADO);
    if (_usuario_logado && _usuario_logado.token){
      ApiServices.registrarToken(_usuario_logado.token);
    }
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
