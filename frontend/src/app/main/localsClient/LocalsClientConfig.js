
import LocalsClientApp from "./LocalsClientApp"

const LocalsClientConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'localsByClient',
			element: <LocalsClientApp />,
		}
	]
};

export default LocalsClientConfig;
