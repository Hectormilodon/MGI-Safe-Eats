import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import LocalForm from "./LocalForm";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";

const style = {
	position: "absolute",
	top: "45%",
	left: "50%",
	overflow: "auto",
	maxHeight: "82vh",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	boxShadow: 24,
	borderRadius: "20px",
};

export default function LocalModal(props) {
	const { isEdit, localId } = props;
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			{isEdit === true ? (
				<Button
					onClick={handleOpen}
					color="warning"
					variant="contained"
					size="small"
					startIcon={
						<FuseSvgIcon size={20}>heroicons-solid:pencil-alt</FuseSvgIcon>
					}
				>
					Editar
				</Button>
			) : (
				<Button
					style={{ marginBottom: "10px" }}
					onClick={handleOpen}
					variant="contained"
					color="info"
					size="small"
					startIcon={<FuseSvgIcon size={20}>heroicons-solid:plus</FuseSvgIcon>}
				>
					Agregar
				</Button>
			)}
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="parent-modal-title"
				aria-describedby="parent-modal-description"
			>
				<Box sx={{ ...style, width: 800 }}>
					{isEdit === true ? (
						<LocalForm
							isEdit={true}
							localId={localId}
							handleClose={handleClose}
						/>
					) : (
						<LocalForm handleClose={handleClose} isEdit={false}/>
					)}
				</Box>
			</Modal>
		</div>
	);
}
