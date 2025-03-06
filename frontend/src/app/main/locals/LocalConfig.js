import { lazy } from "react";
import LocalReportApp from "../reports/LocalReportApp";
import NewReportApp from "../reports/NewReportApp";
import LocalApp from "./LocalApp"

const LocalConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'local',
			element: <LocalApp />,
		},
		{
			path: "local/:id",
			element: <LocalReportApp />,
		},
		{
			path: "local/:id/new",
			element: <NewReportApp />,
		},
		{
			path: "local/:id/edit/:reportId",
			element: <NewReportApp idEdit={true} />
		}
	]
};

export default LocalConfig;
