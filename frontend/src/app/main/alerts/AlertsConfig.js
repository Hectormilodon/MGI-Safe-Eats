import AlertsApp from "./AlertsApp";
import AlertsByLocalApp from "./AlertsByLocalApp";

const AlertsConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'alerts',
			element: <AlertsApp />,
		},
		{
			path: 'alerts/:id',
			element: <AlertsByLocalApp />
		}
	]
};

export default AlertsConfig;
