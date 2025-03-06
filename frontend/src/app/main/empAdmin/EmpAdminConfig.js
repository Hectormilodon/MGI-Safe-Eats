import EmpAdminApp from "./EmpAdminApp"

const EmpAdminConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'empAdmin',
			element: <EmpAdminApp />
		}
	]
};

export default EmpAdminConfig;
