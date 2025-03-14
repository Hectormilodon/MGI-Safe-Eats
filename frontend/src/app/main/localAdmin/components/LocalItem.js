
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import NavLinkAdapter from "@fuse/core/NavLinkAdapter";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import Typography from "@mui/material/Typography";

function UserItem(props) {
  const { name, email } = props;

  return (
    <div style={{
        display: 'flex', 
        marginTop: '10px', 
        flexDirection: 'row',
        justifyContent: 'space-beetwen'
        }}
        >
			<div style={{margin: '5px'}}>
                {name}
            </div>
            <div style={{margin: '5px'}}>
                {email}
            </div>
		</div>
  );
}

export default UserItem;
