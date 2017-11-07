import { Observable } from 'rxjs';
import 'rxjs/add/observable/fromPromise';
import axios from 'axios';
var ApiCore = /** @class */ (function () {
    function ApiCore(apiConfig) {
        this._apiConfig = apiConfig;
        this._AXIOS = generateAxiosInstance(this._apiConfig);
        this._AXIOS_FORM = generateFormDataAxiosInstance(this._apiConfig);
    }
    ApiCore.prototype.delete = function (urlPath) {
        try {
            var res = this._AXIOS.delete(urlPath);
            return Observable.fromPromise(res);
        }
        catch (error) {
            //handleErrors(error);
            throw error;
        }
    };
    ApiCore.prototype.get = function (urlPath, params) {
        try {
            var res = this._AXIOS.get(urlPath, { params: params });
            return Observable.fromPromise(res);
        }
        catch (error) {
            //handleErrors(error);
            throw error;
        }
    };
    ApiCore.prototype.patch = function (urlPath, data) {
        try {
            var res = this._AXIOS.patch(urlPath, data);
            return Observable.fromPromise(res);
        }
        catch (error) {
            //handleErrors(error);
            throw error;
        }
    };
    ApiCore.prototype.post = function (urlPath, data) {
        try {
            var res = this._AXIOS.post(urlPath, data);
            return Observable.fromPromise(res);
        }
        catch (error) {
            //handleErrors(error);
            throw error;
        }
    };
    ApiCore.prototype.postFormData = function (urlPath, data) {
        try {
            var res = this._AXIOS_FORM.post(urlPath, getFormData(data));
            return Observable.fromPromise(res);
        }
        catch (error) {
            //handleErrors(error);
            throw error;
        }
    };
    ApiCore.prototype.put = function (urlPath, data) {
        try {
            var res = this._AXIOS.put(urlPath, data);
            return Observable.fromPromise(res);
        }
        catch (error) {
            //handleErrors(error);
            throw error;
        }
    };
    ApiCore.prototype.refreshApiInstance = function (newConfig) {
        this._apiConfig = newConfig;
        this._AXIOS = generateAxiosInstance(this._apiConfig);
        this._AXIOS_FORM = generateFormDataAxiosInstance(this._apiConfig);
    };
    return ApiCore;
}());
export default ApiCore;
function generateAxiosInstance(apiConfig) {
    return axios.create(apiConfig);
}
function generateFormDataAxiosInstance(apiConfig) {
    var formDataConfig = apiConfig;
    formDataConfig.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    return generateAxiosInstance(formDataConfig);
}
function getFormData(object) {
    var formData = new FormData();
    Object.keys(object).forEach(function (key) { return formData.append(key, object[key]); });
    return formData;
}
function handleErrors(error) {
    if (error.response) {
        console.error(error.response.data);
        console.error(error.response.status);
        console.error(error.response.headers);
    }
    else if (error.request) {
        console.error(error.request);
    }
    else {
        console.error('Api Core Error', error.message);
    }
    console.error(error.config);
}
//# sourceMappingURL=index.js.map