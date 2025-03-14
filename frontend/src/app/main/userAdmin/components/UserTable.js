import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ApiUserAdmin, endpoints_userAdmin } from "src/app/api/userAdminApi";
import { getRol } from "utils/getRol";
import UserModal from "./UserModal";
import { styled } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { useDeepCompareEffect } from "@fuse/hooks";

import FuseLoading from "@fuse/core/FuseLoading";
import { getUsers, selectUsers } from "../store/usersSlice";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));


export default function UserTable() {
	const dispatch = useDispatch();
	const users = useSelector(selectUsers);

	useDeepCompareEffect(() => {
		dispatch(getUsers());
	}, [dispatch]);

	if (!users) {
		return <FuseLoading />;
	}

	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label="customized table">
				<TableHead>
					<TableRow>
						<StyledTableCell>Nombre</StyledTableCell>
						<StyledTableCell align="left">Email</StyledTableCell>
						<StyledTableCell align="left">Rol</StyledTableCell>
						<StyledTableCell align="right"></StyledTableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{users.map((user) => (
						<TableRow
							key={user.name}
							sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
						>
							<TableCell component="th" scope="row">
								{user.name}
							</TableCell>
							<TableCell align="left">{user.email}</TableCell>
							<TableCell align="left">{getRol(user.rol_id)}</TableCell>
							<TableCell align="right">
								<UserModal isEdit={true} userId={user.id} />
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
