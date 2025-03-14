import LocalAdminApp from "./LocalAdminApp"

const LocalAdminConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'localAdmin',
			element: <LocalAdminApp />
		}
	]
};

export default LocalAdminConfig;
