import { Observable } from 'rxjs';
import 'rxjs/add/observable/fromPromise';
import { AxiosResponse, AxiosRequestConfig } from 'axios';
export default class ApiCore {
    private _apiConfig;
    private _AXIOS;
    private _AXIOS_FORM;
    constructor(apiConfig: AxiosRequestConfig);
    delete(urlPath: string): Observable<AxiosResponse>;
    get(urlPath: string, params: any): Observable<AxiosResponse>;
    patch(urlPath: string, data: any): Observable<AxiosResponse>;
    post(urlPath: string, data: any): Observable<AxiosResponse>;
    postFormData(urlPath: string, data: any): Observable<AxiosResponse>;
    put(urlPath: string, data: any): Observable<AxiosResponse>;
    refreshApiInstance(newConfig: AxiosRequestConfig): void;
}
