import { useTimeout } from "@fuse/hooks";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import { useState } from "react";
import clsx from "clsx";
import Box from "@mui/material/Box";
import { useTranslation } from "react-i18next";

function FuseLoading(props) {
	const [showLoading, setShowLoading] = useState(!props.delay);
	useTimeout(() => {
		setShowLoading(true);
	}, props.delay);

	return (
		<div
			className={clsx(
				"flex flex-1 flex-col items-center justify-center p-24",
				!showLoading && "hidden"
			)}
		>
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

FuseLoading.propTypes = {
	delay: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
};

FuseLoading.defaultProps = {
	delay: false,
};

export default FuseLoading;
