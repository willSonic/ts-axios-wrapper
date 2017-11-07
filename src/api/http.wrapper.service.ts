import { Observable } from 'rxjs';
import 'rxjs/add/observable/fromPromise';
import ApiCore from './axios-wrapper';
import { AxiosRequestConfig } from 'axios';
import { HttpParams } from './interfaces/httpParams.model';

const Config:any = {
  API: 'api',
  HOST: 'http://localhost',
  PORT: '5555'
};

const apiConfig: AxiosRequestConfig = {
    headers: {
         Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    timeout: 15000
};



export class HttpWrapperService {
    /*
      These are the methods that are used in the additional api-services,
      where otherwise they would require importing angular 2 http module.
      This keeps the api-services DRY, easier to test, and scalable.
    */
    _apiCore: ApiCore;
    _basePath: string;

    constructor() {
        this._apiCore = new ApiCore(apiConfig);
    }


  public delete(params: HttpParams) {
    let { apiUrl} = this.configRequest(params.uri, true);

    return this._apiCore.delete(apiUrl)
      .map(res => ({
        type: params.successActionType,
        payload: res.data
      }))
      .catch(res => Observable.of({
        type: params.errorActionType,
        payload: {
          action_type: params.specificErrorType,
          message: res.json().error
        }
      }));
  }

  public get(params: HttpParams) {
    let { apiUrl} = this.configRequest(params.uri, params.auth);
    return  this._apiCore.get(apiUrl, params.payload)
      .map(res => ({
        type: params.successActionType,
        payload: res
      }))
      .catch(res => Observable.of({
        type: params.errorActionType,
        payload: {
          action_type: params.specificErrorType,
          message: res.json()
        }
      }));
  }

  public post(params: HttpParams) {

    let { apiUrl} = this.configRequest(params.uri, params.auth);
    return  this._apiCore.post(apiUrl, params.payload)
      .map(res => ({
        type: params.successActionType,
        payload: res
      }))
      .catch(res => Observable.of({
        type: params.errorActionType,
        payload: {
          action_type: params.specificErrorType,
          message: res.json().error
        }
      }));
  }

  public put(params: HttpParams) {
    let { apiUrl } = this.configRequest(params.uri, true);

    return  this._apiCore.put(apiUrl, params.payload)
      .map(res => ({
        type: params.successActionType,
        payload: res
      }))
      .catch(res => Observable.of({
        type: params.errorActionType,
        payload: {
          action_type: params.specificErrorType,
          message: res.json().error
        }
      }));
  }


  private configRequest(uri: string, authRequired: boolean = false): {apiUrl: string} {
    const apiUrl = `${Config.HOST}/${Config.API}/${uri}`;
    const newConfig = apiConfig;

    if(authRequired && !newConfig.headers.Authorization){
         newConfig.headers.Authorization = `${localStorage['Authorized']}`;
    }else if(!authRequired && newConfig.headers.Authorization){
           newConfig.headers.Authorization = '';
    }

    return {apiUrl};
  }

}
