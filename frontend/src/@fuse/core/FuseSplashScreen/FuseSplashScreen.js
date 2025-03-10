import { memo } from "react";
import Box from "@mui/material/Box";

function FuseSplashScreen() {
	return (
		<div id="fuse-splash-screen">
			<div className="logo">
				 <img src="assets/images/logo/mgi_asesorias_logo.png" alt="logo"/> 
			</div>
			<Box
				id="spinner"
				sx={{
					"& > div": {
						backgroundColor: "palette.secondary.main",
					},
				}}
			>
				<div className="bounce1" />
				<div className="bounce2" />
				<div className="bounce3" />
			</Box>
		</div>
	);
}

export default memo(FuseSplashScreen);
