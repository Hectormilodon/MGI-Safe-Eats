import IconButton from "@mui/material/IconButton";
import { useDispatch } from "react-redux";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { toggleAnalistsPanel } from "./store/stateSlice";
import { useDeepCompareEffect } from "@fuse/hooks";
import { getAnalists } from "./store/analistsSlice";
import Tooltip from "@mui/material/Tooltip";
import { useTranslation } from "react-i18next";

function AnalistsPanelToggleButton(props) {
  const [t, i18n] = useTranslation("global");
  const dispatch = useDispatch();

  useDeepCompareEffect(() => {
    dispatch(getAnalists());
  }, [dispatch]);

  return (
    <Tooltip title={t("dashboard.analistsContainer.title")} placement="bottom">
      <IconButton
        className="w-40 h-40"
        onClick={(ev) => dispatch(toggleAnalistsPanel())}
        size="large"
      >
        {props.children}
      </IconButton>
    </Tooltip>
  );
}

AnalistsPanelToggleButton.defaultProps = {
  children: <FuseSvgIcon>heroicons-outline:user-group</FuseSvgIcon>,
};

export default AnalistsPanelToggleButton;
