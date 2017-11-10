import { Observable } from 'rxjs';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/from';
import ApiCore from './axios-wrapper';
import { AxiosRequestConfig } from 'axios';
import { HttpParams } from './interfaces/httpParams.model';

const Config: any = {
  API: 'api',
  HOST: 'http://localhost',
  PORT: '8080'
};

const apiConfig: AxiosRequestConfig = {
    headers: {
         Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    timeout: 15000
};



export default class HttpWrapperService {
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


  public delete(params: HttpParams): Observable<any> {
    let { apiUrl } = this.configRequest(params.uri, true);

    return Observable.fromPromise(this._apiCore.delete(apiUrl))
      .map(res => ({
        type: params.successActionType,
        payload: res.data
      }))
      .catch(res => Observable.of({
        type: params.errorActionType,
        payload: {
          action_type: params.specificErrorType,
          message: res.response
        }
      }));
  }

  public get(params: HttpParams): Observable<any> {
    let { apiUrl} = this.configRequest(params.uri, params.auth);
    return  Observable.fromPromise(this._apiCore.get(apiUrl, params.payload))
      .map(res => ({
        type: params.successActionType,
        payload: res
      }))
      .catch(res => Observable.of({
        type: params.errorActionType,
        payload: {
          action_type: params.specificErrorType,
          message:  res.response
        }
      }));
  }

  public post(params: HttpParams): Observable<any> {

    let { apiUrl} = this.configRequest(params.uri, params.auth);
    return  Observable.fromPromise(this._apiCore.post(apiUrl, params.payload))
      .map(res => {
            // console.log("GOT map == res", res)
          return({
              type: params.successActionType,
              payload: res
          })
      })
      .catch(res => {
          //console.log("GOT ERROR == res", res.response)
          return Observable.of({
              type: params.errorActionType,
              payload: {
                  action_type: params.specificErrorType,
                  message: res.response
              }
          })
      });
  }

  public put(params: HttpParams): Observable<any> {
    let { apiUrl } = this.configRequest(params.uri, true);

    return  Observable.fromPromise(this._apiCore.put(apiUrl, params.payload))
      .map(res => ({
        type: params.successActionType,
        payload: res
      }))
      .catch(res => Observable.of({
        type: params.errorActionType,
        payload: {
          action_type: params.specificErrorType,
          message: res.response
        }
      }));
  }


  private configRequest(uri: string, authRequired: boolean = false): { apiUrl: string } {
    const apiUrl = `${Config.HOST}:${Config.PORT}/${Config.API}/${uri}`;
    const newConfig = apiConfig;

    if( authRequired && !newConfig.headers.Authorization) {
         newConfig.headers.Authorization = `${ localStorage['Authorized'] }`;
    } else if(!authRequired && newConfig.headers.Authorization ) {
           newConfig.headers.Authorization = '';
    }

    return {apiUrl};
  }

}
