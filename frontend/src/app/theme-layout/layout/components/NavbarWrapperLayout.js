import { ThemeProvider } from "@mui/material/styles";
import React, { memo } from "react";
import { useSelector } from "react-redux";
import {
	selectFuseCurrentLayoutConfig,
	selectNavbarTheme,
} from "app/store/fuse/settingsSlice";
import { selectFuseNavbar } from "app/store/fuse/navbarSlice";
import NavbarStyle1 from "./navbar/style-1/NavbarStyle1";
import NavbarToggleFab from "app/shared-components/NavbarToggleFab";
import { selectUser } from "../../../store/userSlice";

function NavbarWrapperLayout(props) {
	const config = useSelector(selectFuseCurrentLayoutConfig);
	const navbar = useSelector(selectFuseNavbar);
	const user = useSelector(selectUser);
	let navbarTheme = useSelector(selectNavbarTheme);

	React.useEffect(() => {
		if (user.data.companies && user.data.companies.length > 0) {
			if (user.data.companies[0].colorNavbar) {
				navbarTheme.palette.background.default =
					user.data.companies[0].colorNavbar;
			}
		}
	}, [user.data]);

	return (
		<>
			<ThemeProvider theme={navbarTheme}>
				<>{config.navbar.style === "style-1" && <NavbarStyle1 />}</>
			</ThemeProvider>

			{config.navbar.display && !config.toolbar.display && !navbar.open && (
				<NavbarToggleFab />
			)}
		</>
	);
}

export default memo(NavbarWrapperLayout);
