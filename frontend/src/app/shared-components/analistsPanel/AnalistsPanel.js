import FuseScrollbars from "@fuse/core/FuseScrollbars";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import withReducer from "app/store/withReducer";
import format from "date-fns/format";
import { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
//import { selectAnalistsPanelData } from "./store/dataSlice";
import { selectAnalists } from "./store/analistsSlice";
import reducer from "./store";
import {
  selectAnalistsPanelState,
  toggleAnalistsPanel,
} from "./store/stateSlice";
import AnalistsContainer from "src/app/main/dashboard/widgets/AnalistsContainer";

import definePagination from "src/utils/definePagination";
import { Pagination, Tooltip } from "@mui/material";
import Link from "@mui/material/Link";
import Card from "@mui/material/Card";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import { stringAvatar } from "src/utils/avatarFunctions.js";

const StyledSwipeableDrawer = styled(SwipeableDrawer)(({ theme }) => ({
  "& .MuiDrawer-paper": {
    width: 380,
  },
}));

function AnalistsPanel(props) {
  const dispatch = useDispatch();
  const [t, i18n] = useTranslation("global");

  const analist = useSelector(selectAnalists);
  const state = useSelector(selectAnalistsPanelState);

  const [checked, setChecked] = useState("notifications");

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  let [page, setPage] = useState(1);
  const perPage = 20;
  const count = Math.ceil(analist.length / perPage);
  const analistsPaginated = definePagination(analist, perPage);
  const handleChange = (e, p) => {
    setPage(p);
    analistsPaginated.jump(p);
  };

  return (
    <StyledSwipeableDrawer
      open={state}
      anchor="right"
      onOpen={(ev) => {}}
      onClose={(ev) => dispatch(toggleAnalistsPanel())}
      disableSwipeToOpen
    >
      <FuseScrollbars>
        <ListSubheader component="div">
          {t("dashboard.analistsContainer.title")}
        </ListSubheader>

        <div className="md:flex">
          <div className="flex flex-col w-full md:ltr md:rtl">
            <div component={motion.div} className="flex flex-col">
              {/* <div className="flex justify-between items-center">
                <Typography className="text-lg font-medium tracking-tight leading-6 truncate">
                  {t("dashboard.analistsContainer.title")}
                </Typography>
              </div> */}
              <div className="pb-24 pl-24 pr-24">
                {analistsPaginated && (
                  <List>
                    {analistsPaginated.currentData().map((analist) => (
                      <ListItem key={analist.id} className="px-0 space-x-12">
                        {analist.name && (
                          <Avatar
                            sx={{
                              borderWidth: 4,
                              borderStyle: "solid",
                              borderColor: "background.paper",
                            }}
                            className="w-50 h-50 text-20 font-bold"
                            {...stringAvatar(analist.name, analist.lastname)}
                          ></Avatar>
                        )}
                        <ListItemText
                          className="flex-1"
                          primary={
                            <div className="flex">
                              <Typography
                                className="font-normal whitespace-nowrap"
                                paragraph={false}
                              >
                                {analist.name}
                              </Typography>

                              <Typography
                                className="px-4 truncate"
                                paragraph={false}
                              >
                                {analist.lastname}
                              </Typography>
                            </div>
                          }
                          // secondary={activity.time}
                        />
                        {/* <ListItemIcon>
                          <Tooltip title="Copy to clipboard">
                            <Link href="">
                              <FuseSvgIcon size={25} color="primary">
                                heroicons-outline:clipboard
                              </FuseSvgIcon>
                            </Link>
                          </Tooltip>
                        </ListItemIcon> */}
                        <ListItemIcon>
                          <Tooltip title="Email">
                            <Link href={`mailto:${analist.email}`}>
                              <FuseSvgIcon size={25} color="primary">
                                heroicons-outline:mail
                              </FuseSvgIcon>
                            </Link>
                          </Tooltip>
                        </ListItemIcon>
                      </ListItem>
                    ))}
                  </List>
                )}
                <Box>
                  <Pagination
                    count={count}
                    size="small"
                    page={page}
                    variant="outlined"
                    onChange={handleChange}
                  />
                </Box>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="mb-0 py-16 px-24">
          <Typography className="mb-12 text-32" color="text.secondary">
            {format(new Date(), "eeee")}
          </Typography>
          <div className="flex">
            <Typography className="leading-none text-32" color="text.secondary">
              {format(new Date(), "dd")}
            </Typography>
            <Typography className="leading-none text-16" color="text.secondary">
              th
            </Typography>
            <Typography className="leading-none text-32" color="text.secondary">
              {format(new Date(), "MMMM")}
            </Typography>
          </div>
        </div>
        <Divider />
        <List>
          <ListSubheader component="div">Events</ListSubheader>
          {data &&
            data.events.map((event) => (
              <ListItem key={event.id}>
                <ListItemText primary={event.title} secondary={event.detail} />
              </ListItem>
            ))}
        </List>
        <Divider />
        <List>
          <ListSubheader component="div">Notes</ListSubheader>
          {data &&
            data.notes.map((note) => (
              <ListItem key={note.id}>
                <ListItemText primary={note.title} secondary={note.detail} />
              </ListItem>
            ))}
        </List>
        <Divider />
        <List>
          <ListSubheader component="div">Quick Settings</ListSubheader>
          <ListItem>
            <ListItemIcon className="min-w-40">
              <FuseSvgIcon>material-outline:notifications</FuseSvgIcon>
            </ListItemIcon>
            <ListItemText primary="Notifications" />
            <ListItemSecondaryAction>
              <Switch
                color="primary"
                onChange={handleToggle("notifications")}
                checked={checked.indexOf("notifications") !== -1}
              />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
            <ListItemIcon className="min-w-40">
              <FuseSvgIcon>material-outline:cloud</FuseSvgIcon>
            </ListItemIcon>
            <ListItemText primary="Cloud Sync" />
            <ListItemSecondaryAction>
              <Switch
                color="secondary"
                onChange={handleToggle("cloudSync")}
                checked={checked.indexOf("cloudSync") !== -1}
              />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
            <ListItemIcon className="min-w-40">
              <FuseSvgIcon>material-outline:brightness_high</FuseSvgIcon>
            </ListItemIcon>
            <ListItemText primary="Retro Thrusters" />
            <ListItemSecondaryAction>
              <Switch
                color="primary"
                onChange={handleToggle("retroThrusters")}
                checked={checked.indexOf("retroThrusters") !== -1}
              />
            </ListItemSecondaryAction>
          </ListItem>
        </List> */}
      </FuseScrollbars>
    </StyledSwipeableDrawer>
  );
}

export default withReducer("analistsPanel", reducer)(memo(AnalistsPanel));
