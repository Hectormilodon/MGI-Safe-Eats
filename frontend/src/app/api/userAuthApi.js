import AxiosApi from "./configApi";

if (process.env.REACT_APP_USERAUTH_URL === undefined)
	throw Error("REACT_APP_USERAUTH_URL is not configured");

const urlApiUserAuth = process.env.REACT_APP_USERAUTH_URL;

const endpoints_userAuthApi = {
	LOGIN: "login",
	VERIFY: "autorizated",
};

class ApiUserAuth {
	base_url = urlApiUserAuth + "auth/";
	api = new AxiosApi();

	get = async (endpoint, pk) => {
		const items = await this.api.get(endpoint + (pk ? `/${pk}` : ""));

		return items;
	};

	post = async (endpoint, payload) => {
		const items = await this.api.post(this.base_url + endpoint, payload);
		return items;
	};

	put = async (endpoint, pk, payload) => {
		const completeEndpoint = `${endpoint}/${pk}`;

		const items = await this.api.put(completeEndpoint, payload);

		return items;
	};

	delete = async (endpoint, pk) => {
		const completeEndpoint = `${endpoint}/${pk}`;

		const items = await this.api.delete(completeEndpoint);

		return items;
	};

	//   recoveryNewPassword = async (endpoint, payload, token) => {
	//     const config = {
	//       headers: {
	//         reset_token: token,
	//       },
	//     };

	//     const response = await this.api.post(this.base_url + endpoint, payload, config);

	//     return response;
	//   };
}

export { ApiUserAuth, endpoints_userAuthApi };
