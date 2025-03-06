import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Divider from "@mui/material/Divider";
import NavLinkAdapter from "@fuse/core/NavLinkAdapter";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { stringAvatar } from "utils/avatarFunctions";

function LocalListItem(props) {
	// const history = history();
	const { local } = props;

	return (
		<>
			<ListItem
				className="px-32 py-16"
				sx={{ bgcolor: "background.paper" }}
				button
				component={NavLinkAdapter}
				to={`/local/${local.id}`}
			>
				<ListItemAvatar>
					<Avatar {...stringAvatar(local.company_name)} />
				</ListItemAvatar>

				<ListItemText
					sx={{ width: "150px" }}
					classes={{ root: "m-0", primary: "font-medium leading-5 truncate" }}
					primary={local.fantasy_name}
					secondary="Nombre"
				/>
				<ListItemText
					sx={{ width: "150px" }}
					classes={{ root: "m-0", primary: "font-medium leading-5 truncate" }}
					primary={local.rut}
					secondary={
						<span className="flex flex-col sm:flex-row sm:items-center -ml-2 mt-8 sm:mt-4 space-y-4 sm:space-y-0 sm:space-x-12">
							<span className="flex items-center">
								<FuseSvgIcon size={20} color="disabled">
									heroicons-solid:credit-card
								</FuseSvgIcon>
								<Typography
									className="inline"
									component="span"
									variant="body2"
									color="text.secondary"
								>
									Rut
								</Typography>
							</span>
						</span>
					}
				/>
				<ListItemText
					sx={{ width: "150px" }}
					classes={{ root: "m-0", primary: "font-medium leading-5 truncate" }}
					primary={local.company_name}
					secondary={
						<span className="flex flex-col sm:flex-row sm:items-center -ml-2 mt-8 sm:mt-4 space-y-4 sm:space-y-0 sm:space-x-12">
							<span className="flex items-center">
								<FuseSvgIcon size={20} color="disabled">
									material-solid:business
								</FuseSvgIcon>
								<Typography
									className="inline"
									component="span"
									variant="body2"
									color="text.secondary"
								>
									Compañia
								</Typography>
							</span>
						</span>
					}
				/>
			</ListItem>
			<Divider />
		</>
	);
}

export default LocalListItem;
