import i18next from "i18next";
import es from "../../translations/es/navigation.json";
import en from "../../translations/en/navigation.json";

i18next.addResourceBundle("en", "navigation", en);
i18next.addResourceBundle("es", "navigation", es);

const navigationConfig = [
	{
		id: "example-component",
		title: "Example",
		translate: "EXAMPLE",
		type: "item",
		icon: "heroicons-outline:star",
		url: "example",
	},
	{
		id: "dashboard",
		title: "Dashboard",
		translate: "DASHBOARD",
		type: "item",
		icon: "heroicons-outline:chart-pie",
		url: "dashboard",
	},
	{
		id: "userAdmin",
		title: "UserAdmin",
		translate: "DASHBOARD",
		type: "item",
		icon: "heroicons-outline:chart-pie",
		url: "userAdmin",
	},
	{
		id: "apps.administration",
		title: "Administration",
		type: "collapse",
		icon: "heroicons-outline:adjustments",

		translate: "ADMINISTRATION",
		children: [
			{
				id: "administration-users",
				title: "Users",
				type: "item",
				url: "administration/userAdmin",
				end: true,
				translate: "USERS",
			},
			{
				id: "administration-companies",
				title: "Companies",
				type: "item",
				url: "administration/companies",
				end: true,
				translate: "COMPANIES",
			},
			{
				id: "administration-tags",
				title: "Tags",
				type: "item",
				url: "administration/companies-tags",
				end: true,
				translate: "COMPANIES-TAGS",
			},
			{
				id: "administration-tags-reports",
				title: "Tags companies reports",
				type: "item",
				url: "administration/companies-tags-reports",
				end: true,
				translate: "COMPANIES-TAGS-REPORTS",
			},
			{
				id: "administration-tags-users",
				title: "Tags companies users",
				type: "item",
				url: "administration/companies-tags-users",
				end: true,
				translate: "COMPANIES-TAGS-USERS",
			},
			{
				id: "administration-alerts",
				title: "Alerts",
				type: "item",
				url: "administration/alerts",
				end: true,
				translate: "ADMINISTRATION-ALERTS",
			},
		],
	},
];

export default navigationConfig;
