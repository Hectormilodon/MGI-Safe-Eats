import ReportsClientApp from "./ReportsClientApp";

const ReportsClientConfig = {
	settings: {
		layout: {},
	},
	routes: [
		{
			path: "reportsByClient",
			element: <ReportsClientApp />,
		},
	],
};

export default ReportsClientConfig;
