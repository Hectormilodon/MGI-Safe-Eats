import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { lighten } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { ApiUserAdmin, endpoints_userAdmin } from "src/app/api";
import { stringAvatar } from "src/utils/avatarFunctions.js";
import definePagination from "src/utils/definePagination";
import { Pagination, ListItemIcon, Tooltip } from "@mui/material";
import Link from "@mui/material/Link";
import { useTranslation } from "react-i18next";

const AnalistsContainer = () => {
  const [t, i18n] = useTranslation("global");
  const [analist, setAnalist] = useState([]);

  const getAnalist = async () => {
    try {
      const api = new ApiUserAdmin();
      const data = await api.get(endpoints_userAdmin.MYANALISTS);
      setAnalist(data);
    } catch (error) {
      return [];
    }
  };

  useEffect(() => {
    getAnalist();
  }, []);

  let [page, setPage] = useState(1);
  const perPage = 6;
  const count = Math.ceil(analist.length / perPage);
  const analistsPaginated = definePagination(analist, perPage);
  const handleChange = (e, p) => {
    setPage(p);
    analistsPaginated.jump(p);
  };

  return (
    <div className="md:flex">
      <div className="flex flex-col w-full md:ltr md:rtl">
        <Card component={motion.div} className="flex flex-col p-24">
          <div className="flex justify-between items-center">
            <Typography className="text-lg font-medium tracking-tight leading-6 truncate">
              {t("dashboard.analistsContainer.title")}
            </Typography>
          </div>
          <CardContent>
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
                    <ListItemIcon>
                      <Tooltip title="Copy to clipboard">
                        <Link href="">
                          <FuseSvgIcon size={25} color="primary">
                            heroicons-outline:clipboard
                          </FuseSvgIcon>
                        </Link>
                      </Tooltip>
                    </ListItemIcon>
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
          </CardContent>
          <Box>
            <Pagination
              count={count}
              size="small"
              page={page}
              variant="outlined"
              onChange={handleChange}
            />
          </Box>
        </Card>
      </div>
    </div>
  );
};

export default AnalistsContainer;
