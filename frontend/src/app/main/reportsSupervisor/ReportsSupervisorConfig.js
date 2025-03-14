import ReportsSupervisorApp from "./ReportsSupervisorApp";

const ReportsSupervisorConfig = {
	settings: {
		layout: {},
	},
	routes: [
		{
			path: "reportsSupervisor",
			element: <ReportsSupervisorApp />,
		},
		{
			path: "pendingReports",
			element: <ReportsSupervisorApp />,
		},
	],
};

export default ReportsSupervisorConfig;
