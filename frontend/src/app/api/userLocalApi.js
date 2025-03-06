import AxiosApi from "./configApi";

if (process.env.REACT_APP_USERADMIN_URL === undefined)
	throw Error("REACT_APP_USERADMIN_URL is not configured");

const urlUserLocal = process.env.REACT_APP_USERADMIN_URL;

const endpoints_userLocal = {
	USERLOCAL: "userlocal",
	USERLOCALBYUSERID: (id) => {
		return "userlocal/byUser/" + id;
	},
	CHART: "chart"
};

class ApiUserLocal {
	base_url = urlUserLocal;
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
	ApiUserLocal,
	endpoints_userLocal
};