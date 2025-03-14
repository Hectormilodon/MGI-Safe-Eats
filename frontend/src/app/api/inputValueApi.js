import AxiosApi from "./configApi";

if (process.env.REACT_APP_USERADMIN_URL === undefined)
	throw Error("REACT_APP_USERADMIN_URL is not configured");

const urlInputValue = process.env.REACT_APP_USERADMIN_URL;

const endpoints_inputValue = {
	INPUTVALUE: "inputvalue",
	REPORTQUESTION: "inputvalue/reportQuestion",
	BYREPORT: "inputvalue/report"
};

class ApiInputValue {
	base_url = urlInputValue;
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
	ApiInputValue,
	endpoints_inputValue
};