import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { statusEnum } from "utils/enum";
import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { TextareaAutosize } from '@mui/base';

function ReportsAuditorListItem(props) {
	const { report } = props;
	const params = useParams();

	const [openView, setOpenView] = useState(false);

	const date = new Date(report.created_at);

	const handleClickOpen = () => {
		setOpenView(true);
	};
	
	const handleClickClose = () => {
		setOpenView(false);
	};
	return (
		<>
		
			<ListItem
				className="px-32 py-16"
				sx={{ bgcolor: "background.paper" }}
				button
				//component={NavLinkAdapter}
				//to={`/local/${params.id}/edit/${report.id}`}
			>
				
				<ListItemText
					sx={{ width: "150px" }}
					classes={{ root: "m-0", primary: "font-medium leading-5 truncate" }}
					primary={report.id}
					secondary={
						<span className="flex flex-col sm:flex-row sm:items-center -ml-2 mt-8 sm:mt-4 space-y-4 sm:space-y-0 sm:space-x-12">
							<span className="flex items-center">
								<FuseSvgIcon size={20} color="disabled">
									material-solid:list_alt
								</FuseSvgIcon>
								<Typography display="span" component="div">
									N° Reporte
								</Typography>
							</span>
						</span>
					}
				/>
				<ListItemText
					classes={{ root: "m-0", primary: "font-medium leading-5 truncate" }}
					primary={
						<Typography
							fontWeight="fontWeightMedium"
							key={"cardtypography_" + report.id}
						>
							{date.getDate() +
								" - " +
								date.getMonth() +
								" - " +
								date.getFullYear()}
						</Typography>
					}
					secondary={
						<span className="flex flex-col sm:flex-row sm:items-center -ml-2 mt-8 sm:mt-4 space-y-4 sm:space-y-0 sm:space-x-12">
							<span className="flex items-center">
								<FuseSvgIcon size={20} color="disabled">
									material-solid:calendar_today
								</FuseSvgIcon>
								<Typography display="span" component="div">
									Fecha
								</Typography>
							</span>
						</span>
					}
				/>

				<ListItemText
					sx={{ width: "150px" }}
					classes={{ root: "m-0", primary: "font-medium leading-5 truncate" }}
					primary={
						<Tooltip
							title={report.local.fantasy_name}
							placement="top-start"
							arrow
						>
							<Typography
								fontWeight="fontWeightMedium"
								key={"cardtypography_" + report.id}
							>
								 {report.local.fantasy_name.length <= 15
                  ? report.local.fantasy_name
                  : report.local.fantasy_name.substring(0, 12) + "..."}
							</Typography>
						</Tooltip>
					}
					secondary={
						<span className="flex flex-col sm:flex-row sm:items-center -ml-2 mt-8 sm:mt-4 space-y-4 sm:space-y-0 sm:space-x-12">
							<span className="flex items-center">
								<FuseSvgIcon size={20} color="disabled">
									material-solid:store
								</FuseSvgIcon>
								<Typography display="span" component="div">
									Local
								</Typography>
							</span>
						</span>
					}
				/>
				<ListItemText
					sx={{ width: "150px" }}
					classes={{ root: "m-0", primary: "font-medium leading-5 truncate" }}
					primary={
						report.Auditor ? (
							report.Auditor.name.length <= 20
							? report.Auditor.name
							: report.Auditor.name.substring(0, 20) + "..."
						) : (
							report.administrator.length <= 20
							? report.administrator
							: report.administrator.substring(0, 20) + "..."
						)
					}
					secondary="Auditor"
				/>

				<ListItemText
					sx={{ width: "150px" }}
					classes={{ root: "m-0", primary: "font-medium leading-5 truncate" }}
					primary={report.compliance ? report.compliance : "%"}
					secondary="Cumplimiento"
				/>

				<ListItemText
					sx={{ width: "150px" }}
					classes={{ root: "m-0", primary: "font-medium leading-5 truncate" }}
					primary={
						<span className="flex flex-col sm:flex-row sm:items-center -ml-2 mt-8 sm:mt-4 space-y-4 sm:space-y-0 sm:space-x-12">
							<span className="flex items-center">
								<Typography
									className="inline"
									component="span"
									color="text.secondary"
								>
									<Chip
										size="small"
										variant="outlined"
										sx={{ marginLeft: "3px" }}
										color={
											report.status_id === statusEnum.EN_ESPERA
												? "info"
												: report.status_id === statusEnum.APROBADO
												? "success"
												: report.status_id === statusEnum.RECHAZADO
												? "error"
												: report.status_id === statusEnum.PROCESO && "warning"
										}
										label={
											report.status_id === statusEnum.EN_ESPERA
												? "ESPERA"
												: report.status_id === statusEnum.APROBADO
												? "APROBADO"
												: report.status_id === statusEnum.RECHAZADO
												? "RECHAZADO"
												: report.status_id === statusEnum.PROCESO && "PROCESO"
										}
									/>
								</Typography>
							</span>
						</span>
					}
					secondary="Estado"
				/>

				<Link to={`/local/${params.id}/edit/${report.id}`}>
				<Button
					sx={{ width: "120px", m: 0 }}
					classes={{ root: "", primary: "font-medium leading-5 truncate" }}
					color="info"
					variant="contained"
					size="small"
				>
					Ver Auditoria
				</Button>
				</Link>

				<div style={{ margin: '0 5px' }}></div> 

				<Tooltip
							title="Ver motivo de rechazo"
							placement="top-start"
							arrow>
				{report.status_id === statusEnum.RECHAZADO ? (
				<Button
					sx={{ width: "50px"}}
					color="warning"
					startIcon={
					<FuseSvgIcon size={30}>heroicons-solid:eye</FuseSvgIcon>
					}
					onClick={handleClickOpen}
				>
				</Button>
				) : <Button style = {{
					visibility:"hidden"	
				}}
					sx={{ width: "50px"}}
					startIcon={
						<FuseSvgIcon size={30}>heroicons-solid:eye</FuseSvgIcon>
					}
				>
					</Button>
				}
				</Tooltip>
				<Dialog
                open={openView}
                onClose={handleClickClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  Motivo del rechazo
                </DialogTitle>
                  <TextareaAutosize
                    style={{ 
                       width: '500px'
                      ,margin: '10px'
                      ,fontSize: '1.5rem'
                      ,border: '1px solid #ccc'
                      ,borderRadius: '4px'
                      ,resize: 'vertical'
                      ,minHeight: '100px'
                      ,maxHeight: '200px'
                    }}
                    id = "refused"
                    rowsMin={3}
                    placeholder="Motivo"
					value={report.refused}
					disabled={true}
                  />
                <DialogActions>
                  <Button onClick={handleClickClose}
					sx={{ width: "150px" }}
					classes={{ root: "m-0", primary: "font-medium leading-5 truncate" }}
					color="error"
					variant="contained"
					size="small"
					>Cerrar</Button>
                </DialogActions>
                </Dialog>
			</ListItem>
			<Divider />
		</>
	);
}

export default ReportsAuditorListItem;
