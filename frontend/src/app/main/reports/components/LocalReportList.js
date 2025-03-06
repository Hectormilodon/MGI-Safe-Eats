import React from "react";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import { motion } from "framer-motion";
import FuseLoading from "@fuse/core/FuseLoading";
import LocalReportListItem from "./LocalReportListItem";
import { ApiReport, endpoints_report } from "src/app/api/reportApi";
import { ApiLocalAdmin, endpoints_localAdmin } from "src/app/api/localAdminApi";
import { useParams } from "react-router-dom/dist";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import history from "@history";
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/userSlice";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";

export default function LocalReportList() {
	const [reports, setReports] = React.useState([]);
	const [local, setLocal] = React.useState({});

	const api = new ApiReport();
	const apiLocalAdmin = new ApiLocalAdmin();

	const user = useSelector(selectUser);
	const params = useParams();

	const getReports = async () => {
		try {
			const response = await api.get(endpoints_report.REPORTBYLOCAL, params.id);
			setReports(response);
		} catch (error) {
			return [];
		}
	};

	const getApiLocalAdmin = async () => {
		try {
			const response = await apiLocalAdmin.get(
				endpoints_localAdmin.LOCAL,
				params.id
			);
			setLocal(response);
		} catch (err) {
			return [];
		}
	};

	React.useEffect(() => {
		getReports();
		getApiLocalAdmin();
	}, []);

	if (!reports) {
		return <FuseLoading />;
	}

	const handleBack = () => history.back();

	return (
		<motion.div
			initial={{ y: 20, opacity: 0 }}
			animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
			className="flex flex-col flex-auto w-full max-h-full"
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
			<motion.div>
				{local?.fantasy_name ? (
					<h3
						style={{
							textAlign: "center",
							marginBottom: "10px",
							fontWeight: "bold",
						}}
					>
						{local?.fantasy_name}
					</h3>
				) : (
					<></>
				)}
				{user.data.rol_id === 3 ? (
					<Link to={`/local/${params.id}/new`}>
						<Button
							style={{ marginBottom: "10px" }}
							variant="contained"
							color="secondary"
						>
							Nueva Auditoría
						</Button>
					</Link>
				) : (
					<></>
				)}
			</motion.div>
			{reports.map((report, key) => {
				return (
					<div key={key} className="relative">
						<Divider />
						<List className="w-full m-0 p-0">
							<LocalReportListItem key={report.id} report={report} />
						</List>
					</div>
				);
			})}
		</motion.div>
	);
}
