export const initialFirstSegment = {
	menus: [{}],
};

export const AuditorSegment = {
	menus: [
		{
			id: "dashboard",
			title: "Dashboard",
			type: "item",
			url: "dashboard",
			icon: "material-outline:home",
		},
		{
			id: "reportsByAuditor",
			title: "Auditorias",
			type: "item",
			url: "reportsAuditor",
			icon: "material-solid:edit_calendar",
		},
		{
			id: "local",
			title: "Locales",
			type: "item",
			url: "Local",
			translate: "Locales",
			icon: "material-solid:store",
		},
		{
			id: "alert",
			title: "Alertas",
			type: "item",
			url: "alerts",
			icon: "material-solid:feed",
		}
	],
};

export const SupervisorSegment = {
	menus: [
		{
			id: "dashboard",
			title: "Dashboard",
			type: "item",
			url: "dashboard",
			icon: "material-outline:home",
		},
		{
			id: "pendingReports",
			title: "Auditorias Pendientes",
			type: "item",
			url: "pendingReports",
			icon: "material-solid:edit_calendar",
		},
		{
			id: "reportsBySupervisor",
			title: "Histórico Auditorias",
			type: "item",
			url: "reportsSupervisor",
			icon: "material-solid:history",
		},
		{
			id: "alert",
			title: "Alertas",
			type: "item",
			url: "alerts",
			icon: "material-solid:feed",
		}
	],
};

export const ClientSegment = {
	menus: [
		{
			id: "dashboard",
			title: "Dashboard",
			type: "item",
			url: "dashboard",
			icon: "material-outline:home",
		},
		{
			id: "reportsByClient",
			title: "Mis Informes",
			type: "item",
			url: "reportsByClient",
			icon: "material-solid:feed",
		},
		{
			id: "local",
			title: "Locales",
			type: "item",
			url: "localsByClient",
			icon: "material-solid:store",
		},
		{
			id: "alert",
			title: "Alertas",
			type: "item",
			url: "alerts",
			icon: "material-solid:feed",
		}
	],
};

export const AdminSegment = {
	menus: [
		{
			id: "dashboard",
			title: "Dashboard",
			type: "item",
			url: "dashboard",
			icon: "material-outline:home",
		},
		{
			id: "Administración",
			title: "Administración",
			type: "collapse",
			icon: "material-solid:build",
			children: [
				{
					id: "userAdmin",
					title: "Mant. Users",
					type: "item",
					url: "userAdmin",
				},
				{
					id: "localAdmin",
					title: "Mant. Locales",
					type: "item",
					url: "localAdmin",
				},
				{
					id: "empAdmin",
					title: "Mant. Emp. Administradora",
					type: "item",
					url: "empAdmin",
				},
			],
		},
		{
			id: "reports",
			title: "Informes",
			type: "item",
			url: "Local",
			icon: "material-outline:dashboard",
		},
	],
};

const initialState = initialFirstSegment;

const menuReducer = (state = initialState, action) => {
	switch (action.type) {
		case "FETCH_MENUS_SUCCESSFUL":
			return {
				...state,
				menus: state.menus.concat(action.menuResponse),
			};
		case "FETCH_MENUS_FAILED":
			return state;
		case 'CLEAR_MENUS':
			return {
				...state,
				menus: []
			};
		default:
			return state;
	}
};
export default menuReducer;
