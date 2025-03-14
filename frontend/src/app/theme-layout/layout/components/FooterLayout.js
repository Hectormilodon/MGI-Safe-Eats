import AppBar from "@mui/material/AppBar";
import { ThemeProvider } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import React, { memo } from "react";
import { useSelector } from "react-redux";
import { selectFooterTheme } from "app/store/fuse/settingsSlice";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { selectUser } from "../../../store/userSlice";
import { SocialIcon } from "react-social-icons";
import Tooltip from "@mui/material/Tooltip";

function FooterLayout(props) {
	const footerTheme = useSelector(selectFooterTheme);
	const [t, i18n] = useTranslation("global");
	const user = useSelector(selectUser);

	React.useEffect(() => {
		if (user.data.companies && user.data.companies.length > 0) {
			if (user.data.companies[0].colorFooter) {
				footerTheme.palette.background.default =
					user.data.companies[0].colorFooter;
			}
		}
	}, [user.data]);

	// React.useEffect(() => {
	//   if(user.data.companies[0].colorFooter){
	//     footerTheme.palette.background.default = user.data.companies[0].colorFooter
	//   }
	// }, [user.data])

	return (
		<ThemeProvider theme={footerTheme}>
			<AppBar
				id="fuse-footer"
				className={clsx("relative z-20 shadow-md", props.className)}
				color="default"
				sx={{
					backgroundColor: (theme) =>
						theme.palette.mode === "light"
							? footerTheme.palette.background.paper
							: footerTheme.palette.background.default,
				}}
			>
				<Toolbar className="min-h-48 md:min-h-64 px-8 sm:px-12 py-0 flex items-center justify-between overflow-x-auto">
					<div>
						© {new Date().getFullYear()} - MGI ASESORIAS todos los derechos
						reservados
					</div>
				</Toolbar>
			</AppBar>
		</ThemeProvider>
	);
}

export default memo(FooterLayout);
