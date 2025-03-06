import React from "react";
import WarningIcon from "@mui/icons-material/Warning";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Divider from "@mui/material/Divider";
import { ListItem } from "@mui/material";

import Box from "@mui/material/Box";

import ListItemButton from "@mui/material/ListItemButton";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";

function AlertListItem(props) {
  const [open, setOpen] = React.useState(false);

  const { alert } = props;
  console.log("🚀 ~ AlertListItem ~ alert:", alert);

  return (
    <>
      <Box
        sx={{
          bgcolor: "background.paper",
          pb: open ? 2 : 0,
        }}
      >
        <ListItemButton
          alignItems="flex-start"
          onClick={() => setOpen(!open)}
          sx={{
            px: 3,
            pt: 2.5,
            pb: 2.5,
          }}
        >
          <ListItemAvatar>
            <WarningIcon />
          </ListItemAvatar>

          <ListItemText
            primary={alert.threashold_alert}
            primaryTypographyProps={{
              fontWeight: "medium",
              lineHeight: "20px",
              mb: "2px",
            }}
            secondary="Gravedad"
            secondaryTypographyProps={{
              noWrap: true,
              lineHeight: "16px",
            }}
            sx={{ my: 0 }}
          />

          <ListItemText
            sx={{ width: "150px" }}
            classes={{ root: "m-0", primary: "font-medium leading-5 truncate" }}
            primary={alert.breach_alert}
            secondary="Infracción"
          />

          <KeyboardArrowDown
            sx={{
              mr: -1,
              opacity: 0,
              transform: open ? "rotate(-180deg)" : "rotate(0)",
              transition: "0.2s",
            }}
          />
        </ListItemButton>
        {open ? (
          alert.suggestions.map((suggestion) => (
            <ListItem
              key={alert}
              className="px-32 py-16"
              sx={{ bgcolor: "background.paper" }}
            >
              <ListItemText
                sx={{ width: "150px" }}
                classes={{
                  root: "m-0",
                  primary: "font-medium leading-5 truncate",
                }}
                secondary={suggestion.suggestion}
                primaryTypographyProps={{ fontWeight: "medium" }}
              />
            </ListItem>
          ))
        ) : (
          <></>
        )}
      </Box>
      <Divider />
    </>
  );
}

export default AlertListItem;
