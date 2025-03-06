import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import NewReportForm from "./NewReportForm";
import { useParams } from "react-router-dom";

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

export default function NewReportModal(props) {
	const { setReportId } = props;
	const [open, setOpen] = React.useState();

	const params = useParams();

	const { reportId } = params;

	React.useEffect(() => {
		if (reportId) {
			setOpen(false);
		} else {
			setOpen(true);
		}
	}, []);

	const handleClose = (event, reason) => {
		if (reason !== 'backdropClick') {
			setOpen(false);
		} 
	};

	return (
		<div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="parent-modal-title"
				aria-describedby="parent-modal-description"
			>
				<Box sx={{ ...style, width: 400 }}>
					<NewReportForm handleClose={handleClose} setReportId={setReportId} />
				</Box>
			</Modal>
		</div>
	);
}
