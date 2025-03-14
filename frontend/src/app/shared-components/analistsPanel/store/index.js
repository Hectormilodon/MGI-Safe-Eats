import { combineReducers } from "@reduxjs/toolkit";
import analists from "./analistsSlice";
import state from "./stateSlice";

const reducer = combineReducers({
  analists,
  state,
});
export default reducer;
