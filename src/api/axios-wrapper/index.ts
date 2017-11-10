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

	public async delete(urlPath: string): Promise<AxiosResponse['data']> {
		try {
			const res = await this._AXIOS.delete(urlPath);

			return res.data;
		} catch (error) {
			//handleErrors(error);
			throw error;
		}
	}

	public async get(urlPath: string, params:any): Promise<AxiosResponse['data']> {
		try {
			const res = await this._AXIOS.get(urlPath, { params });

			return res.data;
		} catch (error) {
			handleErrors(error);
		}
	}

	public async patch(urlPath: string, data:any): Promise<AxiosResponse['data']> {
		try {
			const res = await this._AXIOS.patch(urlPath, data);

			return res.data;
		} catch (error) {
			handleErrors(error);
			throw error;
		}
	}

	public async post(urlPath: string, data:any): Promise<AxiosResponse['data']> {
		try {
			const res = await this._AXIOS.post(urlPath, data);
			return res.data;
		} catch (error) {
			//handleErrors(error);
			throw error;
		}
	}

	public async postFormData(urlPath: string, data:any): Promise<AxiosResponse['data']> {
		try {
			const res = await this._AXIOS_FORM.post(urlPath, getFormData(data));

			return res.data;
		} catch (error) {
			//handleErrors(error);
			throw error;
		}
	}

	public async put(urlPath: string, data:any): Promise<AxiosResponse['data']> {
		try {
			const res = await this._AXIOS.put(urlPath, data);

			return res.data;
		} catch (error) {
			handleErrors(error);
		}
	}

	public refreshApiInstance(newConfig: AxiosRequestConfig) {
		this._apiConfig = newConfig;
		this._AXIOS = generateAxiosInstance(this._apiConfig);
		this._AXIOS_FORM = generateFormDataAxiosInstance(this._apiConfig);
	}


	/* public get axios instance for testing purposes */

	public getAxiosInstance(): AxiosInstance{
		return this._AXIOS;
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
		console.log(error.response.data);
		console.log(error.response.status);
		console.log(error.response.headers);
	} else if (error.request) {
		console.log(error.request);
	} else {
		console.log('Api Core Error', error.message);
	}

	console.log(error.config);
}
