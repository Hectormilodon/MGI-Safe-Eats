import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { statusEnum } from "utils/enum";
import Chip from "@mui/material/Chip";
import NavLinkAdapter from "@fuse/core/NavLinkAdapter";
import Tooltip from "@mui/material/Tooltip";
import { useParams } from "react-router-dom";

function ReportsClientListItem(props) {
	const { report } = props;
	const params = useParams();

	const date = new Date(report.created_at);

	return (
		<>
			<ListItem
				className="px-32 py-16"
				sx={{ bgcolor: "background.paper" }}
				button
				component={NavLinkAdapter}
				to={`/local/${params.id}/edit/${report.id}`}
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
			</ListItem>
			<Divider />
		</>
	);
}

export default ReportsClientListItem;
