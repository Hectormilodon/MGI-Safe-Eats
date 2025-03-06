import { lazy } from "react";
const UserAdminApp = lazy(() => import("./UserAdminApp"));

const UserAdminConfig = {
	settings: {
		layout: {},
	},
	routes: [
		{
			path: "userAdmin",
			element: <UserAdminApp />,
		},
	],
};

export default UserAdminConfig;
