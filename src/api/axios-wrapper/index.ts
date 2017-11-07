import { Observable } from 'rxjs';
import 'rxjs/add/observable/fromPromise';
import axios, { AxiosError, AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios';

export default class ApiCore {
	private _apiConfig: AxiosRequestConfig;
	private _AXIOS: AxiosInstance;
	private _AXIOS_FORM: AxiosInstance;

	constructor(apiConfig: AxiosRequestConfig) {
		this._apiConfig = apiConfig;
		this._AXIOS = generateAxiosInstance(this._apiConfig);
		this._AXIOS_FORM = generateFormDataAxiosInstance(this._apiConfig);
	}

	public  delete(urlPath: string): Observable<AxiosResponse> {
		try {
			const res =  this._AXIOS.delete(urlPath);

			return Observable.fromPromise(res);
		} catch (error) {
			//handleErrors(error);
            throw error;
		}
	}

	public  get(urlPath: string, params:any): Observable<AxiosResponse> {
		try {
			const res =  this._AXIOS.get(urlPath, { params });

			return Observable.fromPromise(res);
		} catch (error) {
			//handleErrors(error);
            throw error;
		}
	}

	public  patch(urlPath: string, data:any): Observable<AxiosResponse> {
		try {
			const res =  this._AXIOS.patch(urlPath, data);

			return Observable.fromPromise(res);
		} catch (error) {
			//handleErrors(error);
            throw error;
		}
	}

	public  post(urlPath: string, data:any): Observable<AxiosResponse> {
		try {
			const res =  this._AXIOS.post(urlPath, data);

			return Observable.fromPromise(res );
		} catch (error) {
			//handleErrors(error);
            throw error;
		}
	}

	public  postFormData(urlPath: string, data:any): Observable<AxiosResponse> {
		try {
			const res =  this._AXIOS_FORM.post(urlPath, getFormData(data));

			return Observable.fromPromise(res );
		} catch (error) {
			//handleErrors(error);
            throw error;
		}
	}

	public  put(urlPath: string, data:any): Observable<AxiosResponse> {
		try {
			const res =  this._AXIOS.put(urlPath, data);

			return Observable.fromPromise( res );
		} catch (error) {
			//handleErrors(error);
            throw error;
		}
	}

	public refreshApiInstance(newConfig: AxiosRequestConfig) {
		this._apiConfig = newConfig;
		this._AXIOS = generateAxiosInstance(this._apiConfig);
		this._AXIOS_FORM = generateFormDataAxiosInstance(this._apiConfig);
	}
}

function generateAxiosInstance(apiConfig: AxiosRequestConfig): AxiosInstance {
	return axios.create(apiConfig);
}

function generateFormDataAxiosInstance(apiConfig: AxiosRequestConfig): AxiosInstance {
	const formDataConfig = apiConfig;

	formDataConfig.headers['Content-Type'] = 'application/x-www-form-urlencoded';

	return generateAxiosInstance(formDataConfig);
}

function getFormData(object:any): FormData {
	const formData: FormData = new FormData();

	Object.keys(object).forEach(key => formData.append(key, object[key]));

	return formData;
}

function handleErrors(error: AxiosError): void {
	if (error.response) {
		console.error(error.response.data);
		console.error(error.response.status);
		console.error(error.response.headers);
	} else if (error.request) {
		console.error(error.request);
	} else {
		console.error('Api Core Error', error.message);
	}

	console.error(error.config);
}