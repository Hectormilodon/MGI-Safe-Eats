import React from "react";
import { ApiLocalAdmin, endpoints_localAdmin } from "src/app/api/localAdminApi";
import { ApiEmpAdmin, endpoints_empAdmin } from "src/app/api/EmpAdminApi";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import { motion } from "framer-motion";
import FuseLoading from "@fuse/core/FuseLoading";
import LocalListItem from "./LocalListItem";

export default function LocalTable() {
	const [locals, setLocals] = React.useState([]);
	const [empAdmins, setEmpAdmins] = React.useState([]);

	const api = new ApiLocalAdmin();
	const apiEmpAdmin = new ApiEmpAdmin();

	const getLocals = async () => {
		try {
			const response = await api.get(endpoints_localAdmin.LOCAL);
			setLocals(response);
		} catch (error) {
			return [];
		}
	};

	const getEmpAdmin = async () => {
		try {
			const response = await apiEmpAdmin.get(endpoints_empAdmin.EMPADMIN);
			setEmpAdmins(response);
		} catch (err) {
			return [];
		}
	};

	React.useEffect(() => {
		getLocals();
		getEmpAdmin();
	}, []);

	if (!locals) {
		return <FuseLoading />;
	}

	return (
		<motion.div
			initial={{ y: 20, opacity: 0 }}
			animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
			className="flex flex-col flex-auto w-full max-h-full"
		>
			{locals.map((local, key) => {
				return (
					<div key={key} className="relative">
						<Divider />
						<List className="w-full m-0 p-0">
							<LocalListItem
								key={local.id}
								local={local}
								empAdmin={empAdmins}
							/>
						</List>
					</div>
				);
			})}
		</motion.div>
	);
}
