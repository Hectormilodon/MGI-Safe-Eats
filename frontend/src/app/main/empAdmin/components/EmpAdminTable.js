import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EmpAdminModal from "./EmpAdminModal";
import FuseLoading from "@fuse/core/FuseLoading";
import { styled } from "@mui/material/styles";

import { useDispatch, useSelector } from "react-redux";
import { useDeepCompareEffect } from "@fuse/hooks";
import { getEmpAdmins, selectEmpAdmins } from "../store/empAdminsSlice";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

export default function EmpAdminTable() {
	const dispatch = useDispatch();
	const empAdmins = useSelector(selectEmpAdmins);

	useDeepCompareEffect(() => {
		dispatch(getEmpAdmins());
	}, [dispatch]);

	if (!empAdmins) {
		return <FuseLoading />;
	}

	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label="customized table">
				<TableHead>
					<TableRow>
						<StyledTableCell>Nombre</StyledTableCell>
						<StyledTableCell></StyledTableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{empAdmins.map((empAdmin) => (
						<TableRow
							key={empAdmin.id}
							sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
						>
							<TableCell component="th" scope="row">
								{empAdmin.name}
							</TableCell>
							<TableCell align="right">
								<EmpAdminModal isEdit={true} empAdmin={empAdmin} />
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
