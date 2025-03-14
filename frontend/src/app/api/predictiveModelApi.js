import AxiosApi from "./configApi";

if (process.env.REACT_APP_PREDICTIVE_MODEL === undefined)
	throw Error("REACT_APP_SITE_URL is not configured");

const url = `${process.env.REACT_APP_SITE_URL}predictive_model/`;

const endpoints_predictive_model = {
	POST_ALERT: "alert",
	GET_REPORT: "get_report"
};

class ApiPredictiveModel {
	base_url = url;
	api = new AxiosApi();

	get = async (endpoint, pk) => {
		const items = await this.api.get(
			this.base_url + endpoint + (pk ? `/${pk}` : "")
		);
		return items;
	};

	post = async (endpoint, payload) => {
		const items = await this.api.post(this.base_url + endpoint, payload);
		return items;
	};

	put = async (endpoint, pk, payload) => {
		const completeEndpoint = `${this.base_url}${endpoint}/${pk}`;
		const items = await this.api.put(completeEndpoint, payload);
		
		return items;
	};

	delete = async (endpoint, pk) => {
		const completeEndpoint = `${this.base_url}${endpoint}/${pk}`;
		const items = await this.api.delete(completeEndpoint);
		return items;
	};
}

export {
	ApiPredictiveModel,
	endpoints_predictive_model
};