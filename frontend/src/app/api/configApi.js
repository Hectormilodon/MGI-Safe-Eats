import axios, { AxiosRequestConfig } from "axios";

const getToken = () => {
	const sessionApp = localStorage.getItem("jwt_access_token");
	const token = sessionApp !== null ? sessionApp : null;
	return token;
};

const AxiosApiConfig = {
	currentConfig: {},
	getConfig: () => {
		let headers = {};
		headers["Authorization"] = `Bearer ${getToken()}`;
		headers["Access-Control-Allow-Origin"] = "*";
		headers["Access-Control-Allow-Headers"] =
			"Origin, X-Requested-With, Content-Type, Accept, Authorization";
		AxiosApiConfig.currentConfig.headers = headers;
		return AxiosApiConfig.currentConfig;
	},
};

class AxiosApi {
	constructor(url, headers) {
		this.url = url;

		this.client = axios.create({
			baseURL: this.url,
		});
	}

	getDefault = async (endpoint, config) => {
		const { status, data } = await this.client.get(
			endpoint,
			AxiosApiConfig.getConfig()
		);
		if ([200, 201].includes(status)) return data;
		// logService Error posible Error
		else return [];
	};

	get = async (endpoint, config) => {
		const { status, data } = await this.client.get(
			endpoint,
			config ?? AxiosApiConfig.getConfig()
		);
		if ([200, 201].includes(status)) return data;
		else return [];
	};

	post = async (endpoint, payload = "", config) => {
		let response;
		try {
			response = await this.client.post(
				endpoint,
				payload,
				config ?? AxiosApiConfig.getConfig()
			);
		} catch (err) {
			const error = err;
			if (axios.isAxiosError(error)) {
				return error.response?.data;
			} else {
				return "An unexpected error occurred";
			}
		}

		if (response === null) {
			return null;
		}
		const { status, data } = response;

		if ([200, 201].includes(status)) {
			return data;
		} else return response;
	};

	put = async (endpoint, payload) => {
		const { status, data } = await this.client.put(
			endpoint,
			payload,
			AxiosApiConfig.getConfig()
		);
		if ([200, 201].includes(status)) return data;
		else return [];
	};

	delete = async (endpoint) => {
		const { status, data } = await this.client.delete(
			endpoint,
			AxiosApiConfig.getConfig()
		);
		if ([200, 201].includes(status)) return data;
		else return [];
	};
}

export default AxiosApi;
