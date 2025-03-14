import React from "react";
import { motion } from "framer-motion";
import FusePageSimple from "@fuse/core/FusePageSimple";
import NewReport from "./components/NewReport";
import NewReportModal from "./components/Modal/NewReportModal";
import { Button } from "@mui/material";
import history from "@history";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";

function NewReportApp() {
	const [reportId, setReportId] = React.useState();

	const container = {
		show: {
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	const item = {
		hidden: { opacity: 0, y: 20 },
		show: { opacity: 1, y: 0 },
	};

	const handleBack = () => history.back();

	return (
		<FusePageSimple
			// header={<DashboardAppHeader />}
			content={
				<motion.div
					className="grid grid-cols-1 w-full min-w-0 p-24 gap-24"
					variants={container}
					initial="hidden"
					animate="show"
				>
					<motion.div>
						<Button
							style={{ marginBottom: "10px" }}
							variant="contained"
							color="info"
							onClick={handleBack}
							size="small"
							startIcon={
								<FuseSvgIcon size={20}>material-solid:arrow_back</FuseSvgIcon>
							}
						>
							Volver
						</Button>
					</motion.div>
					<motion.div variants={item}>
						<NewReport reportId={reportId} />
						<NewReportModal setReportId={setReportId} />
					</motion.div>
				</motion.div>
			}
		/>
	);
}

export default NewReportApp;
