import { ThemeProvider } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Hidden from "@mui/material/Hidden";
import Toolbar from "@mui/material/Toolbar";
import clsx from "clsx";
import { memo } from "react";
import { useSelector } from "react-redux";
import {
	selectFuseCurrentLayoutConfig,
	selectToolbarTheme,
} from "app/store/fuse/settingsSlice";
import { selectFuseNavbar } from "app/store/fuse/navbarSlice";
import AdjustFontSize from "app/shared-components/AdjustFontSize";
import FullScreenToggle from "app/shared-components/FullScreenToggle";
import LanguageSwitcher from "app/shared-components/LanguageSwitcher";
import NavigationShortcuts from "app/shared-components/NavigationShortcuts";
import NavbarToggleButton from "app/shared-components/NavbarToggleButton";
import UserMenu from "app/shared-components/UserMenu";
import AnalistsPanelToggleButton from "app/shared-components/analistsPanel/AnalistsPanelToggleButton";
import Chip from "@mui/material/Chip";
import DeleteIcon from "@mui/icons-material/Delete";

import history from "@history";

function ToolbarLayout(props) {
	const config = useSelector(selectFuseCurrentLayoutConfig);
	const navbar = useSelector(selectFuseNavbar);
	const toolbarTheme = useSelector(selectToolbarTheme);

	const sw = localStorage.getItem("logAs");
	const userStr = localStorage.getItem("sessionAppLogAs");
	let userLogAs = null;
	if (userStr) {
		userLogAs = JSON.parse(userStr);
	}

	const handleLogAs = () => {
		localStorage.removeItem("logAs");
		history.push("/");
		window.location.reload();
	};

	return (
		<ThemeProvider theme={toolbarTheme}>
			<AppBar
				id="fuse-toolbar"
				className={clsx("flex relative z-20 shadow-md", props.className)}
				color="default"
				sx={{
					backgroundColor: (theme) =>
						theme.palette.mode === "light"
							? toolbarTheme.palette.background.paper
							: toolbarTheme.palette.background.default,
				}}
				position="static"
			>
				<Toolbar className="p-0 min-h-48 md:min-h-64">
					<div className="flex flex-1 px-16">
						{config.navbar.display && config.navbar.position === "left" && (
							<>
								<Hidden lgDown>
									{(config.navbar.style === "style-3" ||
										config.navbar.style === "style-3-dense") && (
										<NavbarToggleButton className="w-40 h-40 p-0 mx-0" />
									)}

									{config.navbar.style === "style-1" && !navbar.open && (
										<NavbarToggleButton className="w-40 h-40 p-0 mx-0" />
									)}
								</Hidden>

								<Hidden lgUp>
									<NavbarToggleButton className="w-40 h-40 p-0 mx-0 sm:mx-8" />
								</Hidden>
							</>
						)}
					</div>

					<div className="flex items-center px-8 h-full overflow-x-auto">
						<AdjustFontSize />
						<FullScreenToggle />

						{sw === "true" ? (
							// <Tooltip title="Volver a mi Usuario" arrow>
							<Chip
								label={userLogAs.email}
								color="success"
								onClick={handleLogAs}
								icon={<DeleteIcon />}
							/>
						) : (
							// </Tooltip>
							<UserMenu />
						)}
					</div>

					{config.navbar.display && config.navbar.position === "right" && (
						<>
							<Hidden lgDown>
								{!navbar.open && (
									<NavbarToggleButton className="w-40 h-40 p-0 mx-0" />
								)}
							</Hidden>

							<Hidden lgUp>
								<NavbarToggleButton className="w-40 h-40 p-0 mx-0 sm:mx-8" />
							</Hidden>
						</>
					)}
				</Toolbar>
			</AppBar>
		</ThemeProvider>
	);
}

export default memo(ToolbarLayout);
