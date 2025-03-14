import React from "react";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import { motion } from "framer-motion";
import FuseLoading from "@fuse/core/FuseLoading";
import ReportsSupervisorListItem from "./ReportsSupervisorListItem";
import { ApiReport, endpoints_report } from "src/app/api/reportApi";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "app/store/userSlice";
import { useLocation } from "react-router-dom";
import { statusEnum } from "utils/enum";

export default function ReportsSupervisorList() {
	const [reports, setReports] = React.useState([]);

	const location = useLocation();

	const api = new ApiReport();

	const user = useSelector(selectUser);

	const getReports = async () => {
		try {
			let response;

			if (location.pathname === "/pendingReports") {
				response = await api.get(
					endpoints_report.REPORTBYSUPERVISORSTATUS(
						user.data.id,
						statusEnum.EN_ESPERA
					)
				);
			} else {
				response = await api.get(
					endpoints_report.REPORTBYSUPERVISORHISTORICO,
					user.data.id
				);
			}

			setReports(response);
		} catch (error) {
			return [];
		}
	};

	React.useEffect(() => {
		getReports();
	}, [location]);

	if (!reports) {
		return <FuseLoading />;
	}

	return (
		<motion.div
			initial={{ y: 20, opacity: 0 }}
			animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
			className="flex flex-col flex-auto w-full max-h-full"
		>
			<motion.div>
				<h3 style={{ textAlign: "center", margin: "10px auto" }}>
					Mis Reportes
				</h3>
			</motion.div>
			{reports.map((report, key) => {
				return (
					<div key={key} className="relative">
						<Divider />
						<List className="w-full m-0 p-0">
							<ReportsSupervisorListItem
								ListItem
								key={report.id}
								report={report}
							/>
						</List>
					</div>
				);
			})}
		</motion.div>
	);
}
