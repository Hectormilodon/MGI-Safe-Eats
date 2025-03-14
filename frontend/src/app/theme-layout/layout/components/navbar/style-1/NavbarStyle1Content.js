import FuseScrollbars from "@fuse/core/FuseScrollbars";
import { styled } from "@mui/material/styles";
import clsx from "clsx";
import { memo } from "react";
import Logo from "app/shared-components/Logo";
import NavbarToggleButton from "app/shared-components/NavbarToggleButton";
// import UserNavbarHeader from "../../../../shared-components/UserNavbarHeader";
import UserNavbarHeader from "app/shared-components/UserNavbarHeader";
import Navigation from "app/shared-components/Navigation";

const Root = styled("div")(({ theme }) => ({
	backgroundColor: theme.palette.background.default,
	color: theme.palette.text.primary,
	"& ::-webkit-scrollbar-thumb": {
		boxShadow: `inset 0 0 0 20px ${
			theme.palette.mode === "light"
				? "rgba(0, 0, 0, 0.24)"
				: "rgba(255, 255, 255, 0.24)"
		}`,
	},
	"& ::-webkit-scrollbar-thumb:active": {
		boxShadow: `inset 0 0 0 20px ${
			theme.palette.mode === "light"
				? "rgba(0, 0, 0, 0.37)"
				: "rgba(255, 255, 255, 0.37)"
		}`,
	},
}));

const StyledContent = styled(FuseScrollbars)(({ theme }) => ({
	overscrollBehavior: "contain",
	overflowX: "hidden",
	overflowY: "auto",
	WebkitOverflowScrolling: "touch",
	backgroundRepeat: "no-repeat",
	backgroundSize: "100% 40px, 100% 10px",
	backgroundAttachment: "local, scroll",
}));

function NavbarStyle1Content(props) {
	return (
		<Root
			className={clsx(
				"flex flex-auto flex-col overflow-hidden h-full",
				props.className
			)}
		>
			<div className="flex flex-row items-center shrink-0 h-96 md:h-96 px-20">
				<div className="flex flex-auto mx-4 h-40">
					<Logo />
				</div>

				<NavbarToggleButton className="w-40 h-40 p-0 flex flex-none" />
			</div>

			<StyledContent
				className="flex flex-1 flex-col min-h-0"
				option={{ suppressScrollX: true, wheelPropagation: false }}
			>
				<UserNavbarHeader />

				<Navigation layout="vertical" />

				{/* <div className="flex flex-0 items-center justify-center py-48 opacity-10">
					<img
						className="w-full max-w-256"
						src="assets/images/logo/whale_white.png"
						alt="footer logo"
					/>
				</div> */}
			</StyledContent>
		</Root>
	);
}

export default memo(NavbarStyle1Content);
