import AxiosApi from "./configApi";

if (process.env.REACT_APP_SITE_URL === undefined)
	throw Error("REACT_APP_SITE_URL is not configured");

const url = process.env.REACT_APP_SITE_URL;

const endpoints_localAdmin = {
	LOCAL: "local",
	LOCAL_NOM: "local/byname",
	LOCAL_BY_ID: (id) => `local/${id}`
};

class ApiLocalAdmin {
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
	ApiLocalAdmin,
	endpoints_localAdmin
};