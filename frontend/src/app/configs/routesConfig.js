import FuseUtils from "@fuse/utils";
import FuseLoading from "@fuse/core/FuseLoading";
import { Navigate } from "react-router-dom";
import settingsConfig from "app/configs/settingsConfig";
import { FuseRouteConfigsType, FuseRoutesType } from "@fuse/utils/FuseUtils";
import SignInConfig from "../main/sign-in/SignInConfig";
import SignUpConfig from "../main/sign-up/SignUpConfig";
import SignOutConfig from "../main/sign-out/SignOutConfig";
import Error404Page from "../main/404/Error404Page";
import ExampleConfig from "../main/example/ExampleConfig";
import UserAdminConfig from "../main/userAdmin/UserAdminConfig";
import LocalAdminConfig from "../main/localAdmin/LocalAdminConfig";
import EmpAdminConfig from "../main/empAdmin/EmpAdminConfig";
import LocalConfig from "../main/locals/LocalConfig";
import ReportsAuditorConfig from "../main/reportsAuditor/ReportsAuditorConfig";
import DashboardAppConfig from "../main/dashboard/DashboardAppConfig";
import ReportsSupervisorConfig from "../main/reportsSupervisor/ReportsSupervisorConfig";
import ReportsClientConfig from "../main/reportsClient/ReportsClientConfig";
import LocalsClientConfig from "../main/localsClient/LocalsClientConfig";
import AlertsConfig from "../main/alerts/AlertsConfig";

const routeConfigs = [
	ExampleConfig,
	SignOutConfig,
	SignInConfig,
	SignUpConfig,
	UserAdminConfig,
	LocalAdminConfig,
	EmpAdminConfig,
	LocalConfig,
	ReportsAuditorConfig,
	DashboardAppConfig,
	ReportsSupervisorConfig,
	ReportsClientConfig,
	LocalsClientConfig,
	AlertsConfig,
];

/**
 * The routes of the application.
 */
const routes = [
	...FuseUtils.generateRoutesFromConfigs(
		routeConfigs,
		settingsConfig.defaultAuth
	),
	{
		path: "/",
		element: <Navigate to="/dashboard" />,
		auth: settingsConfig.defaultAuth,
	},
	{
		path: "/userAdmin",
		element: <Navigate to="/userAdmin" />,
		auth: settingsConfig.defaultAuth,
	},
	{
		path: "/localAdmin",
		element: <Navigate to="/localAdmin" />,
		auth: settingsConfig.defaultAuth,
	},
	{
		path: "/empAdmin",
		element: <Navigate to="/empAdmin" />,
		auth: settingsConfig.defaultAuth,
	},
	{
		path: "/local",
		element: <Navigate to="/local" />,
		auth: settingsConfig.defaultAuth,
	},
	{
		path: "/reportsAuditor",
		element: <Navigate to="/reportsAuditor" />,
		auth: settingsConfig.defaultAuth,
	},
	{
		path: "/pendingReports",
		element: <Navigate to="/pendingReports" />,
		auth: settingsConfig.defaultAuth,
	},
	{
		path: "/reportsByClient",
		element: <Navigate to="/reportsByClient" />,
		auth: settingsConfig.defaultAuth,
	},
	{
		path: "/reportsSupervisor",
		element: <Navigate to="/reportsSupervisor" />,
		auth: settingsConfig.defaultAuth,
	},
	{
		path: "/localsByClient",
		element: <Navigate to="/localsByClient" />,
		auth: settingsConfig.defaultAuth,
	},
	{
		path: "/alerts",
		element: <Navigate to="/alerts" />,
		auth: settingsConfig.defaultAuth,
	},
	{
		path: "/",
	},
	{
		path: "loading",
		element: <FuseLoading />,
	},
	{
		path: "404",
		element: <Error404Page />,
	},
	{
		path: "*",
		element: <Navigate to="404" />,
	},
];

export default routes;
