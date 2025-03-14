import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import LocalModal from "./LocalModal";
import { styled } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { useDeepCompareEffect } from "@fuse/hooks";

import FuseLoading from "@fuse/core/FuseLoading";
import { getLocalsAdmin, selectLocalsAdmin } from "../store/localsAdminSlice";
import { selectEmpAdmins } from "../../empAdmin/store/empAdminsSlice";
import { getEmpAdmins } from "../../empAdmin/store/empAdminsSlice";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

export default function LocalTable() {
	const dispatch = useDispatch();
	const locals = useSelector(selectLocalsAdmin);
	const empAdmins = useSelector(selectEmpAdmins);

	const filterEmpAdmins = (id) => {
		let empAdminFiltered = "";
		empAdmins.forEach((emp) => {
			if (emp.id === id) empAdminFiltered = emp.name;
		});
		return empAdminFiltered;
	};

	useDeepCompareEffect(() => {
		dispatch(getLocalsAdmin());
		dispatch(getEmpAdmins());
	}, [dispatch]);

	if (!locals) {
		return <FuseLoading />;
	}

	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label="customized table">
				<TableHead>
					<TableRow>
						<StyledTableCell>Nombre de fantasia</StyledTableCell>
						<StyledTableCell align="left">Plan</StyledTableCell>
						<StyledTableCell align="left">Sucursal</StyledTableCell>
						<StyledTableCell align="left">Nombre compañia</StyledTableCell>
						<StyledTableCell align="left">
							Empresa administradora
						</StyledTableCell>
						<StyledTableCell align="left">Rut</StyledTableCell>
						<StyledTableCell align="left">
							N° Autorización Sanitaria
						</StyledTableCell>
						<StyledTableCell align="right"></StyledTableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{locals.map((local) => (
						<TableRow
							key={local.fantasy_name}
							sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
						>
							<TableCell component="th" scope="row">
								{local.fantasy_name}
							</TableCell>
							{local.premium === true ? (
								<TableCell align="left">Premium</TableCell>
							) : (
								<TableCell align="left">Basic</TableCell>
							)}
							<TableCell align="left">{local.address}</TableCell>
							<TableCell align="left">{local.company_name}</TableCell>
							<TableCell align="left">
								{filterEmpAdmins(local.id_emp_admin)}
							</TableCell>
							<TableCell align="left">{local.rut}</TableCell>
							<TableCell align="left">{local.num_auth_sani}</TableCell>
							<TableCell align="right">
								<LocalModal isEdit={true} localId={local.id} />
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
