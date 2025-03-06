import { combineReducers } from "@reduxjs/toolkit";
import dialog from "./dialogSlice";
import message from "./messageSlice";
import navbar from "./navbarSlice";
import navigation from "./navigationSlice";
import settings from "./settingsSlice";
import menus from "./menuReducers";

const fuseReducers = combineReducers({
  navigation,
  settings,
  navbar,
  message,
  dialog,
  menus,
});

export default fuseReducers;
