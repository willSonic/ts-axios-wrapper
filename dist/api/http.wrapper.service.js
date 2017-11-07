import { Observable } from 'rxjs';
import 'rxjs/add/observable/fromPromise';
import ApiCore from './axios-wrapper';
var Config = {
    API: 'api',
    HOST: 'http://localhost',
    PORT: '5555'
};
var apiConfig = {
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    timeout: 15000
};
var HttpWrapperService = /** @class */ (function () {
    function HttpWrapperService() {
        this._apiCore = new ApiCore(apiConfig);
    }
    HttpWrapperService.prototype.delete = function (params) {
        var apiUrl = this.configRequest(params.uri, true).apiUrl;
        return this._apiCore.delete(apiUrl)
            .map(function (res) { return ({
            type: params.successActionType,
            payload: res.data
        }); })
            .catch(function (res) { return Observable.of({
            type: params.errorActionType,
            payload: {
                action_type: params.specificErrorType,
                message: res.json().error
            }
        }); });
    };
    HttpWrapperService.prototype.get = function (params) {
        var apiUrl = this.configRequest(params.uri, params.auth).apiUrl;
        return this._apiCore.get(apiUrl, params.payload)
            .map(function (res) { return ({
            type: params.successActionType,
            payload: res
        }); })
            .catch(function (res) { return Observable.of({
            type: params.errorActionType,
            payload: {
                action_type: params.specificErrorType,
                message: res.json()
            }
        }); });
    };
    HttpWrapperService.prototype.post = function (params) {
        var apiUrl = this.configRequest(params.uri, params.auth).apiUrl;
        return this._apiCore.post(apiUrl, params.payload)
            .map(function (res) { return ({
            type: params.successActionType,
            payload: res
        }); })
            .catch(function (res) { return Observable.of({
            type: params.errorActionType,
            payload: {
                action_type: params.specificErrorType,
                message: res.json().error
            }
        }); });
    };
    HttpWrapperService.prototype.put = function (params) {
        var apiUrl = this.configRequest(params.uri, true).apiUrl;
        return this._apiCore.put(apiUrl, params.payload)
            .map(function (res) { return ({
            type: params.successActionType,
            payload: res
        }); })
            .catch(function (res) { return Observable.of({
            type: params.errorActionType,
            payload: {
                action_type: params.specificErrorType,
                message: res.json().error
            }
        }); });
    };
    HttpWrapperService.prototype.configRequest = function (uri, authRequired) {
        if (authRequired === void 0) { authRequired = false; }
        var apiUrl = Config.HOST + "/" + Config.API + "/" + uri;
        var newConfig = apiConfig;
        if (authRequired && !newConfig.headers.Authorization) {
            newConfig.headers.Authorization = "" + localStorage['Authorized'];
        }
        else if (!authRequired && newConfig.headers.Authorization) {
            newConfig.headers.Authorization = '';
        }
        return { apiUrl: apiUrl };
    };
    return HttpWrapperService;
}());
export { HttpWrapperService };
//# sourceMappingURL=http.wrapper.service.js.map