import { combineReducers } from "@reduxjs/toolkit";
import fuse from "./fuse";
import i18n from "./i18nSlice";
import user from "./userSlice";
import empAdminsSlice from "../main/empAdmin/store/empAdminsSlice";
import empAdminSlice from "../main/empAdmin/store/empAdminSlice";
import localAdminSlice from "../main/localAdmin/store/localAdminSlice";
import localsAdminSlice from "../main/localAdmin/store/localsAdminSlice";
import userSlice from "../main/userAdmin/store/userSlice";
import usersSlice from "../main/userAdmin/store/usersSlice";

const createReducer = (asyncReducers) => (state, action) => {
	const combinedReducer = combineReducers({
		fuse,
		i18n,
		user,
		empAdminsSlice,
		empAdminSlice,
		localsAdminSlice,
		localAdminSlice,
		userSlice,
		usersSlice,
		...asyncReducers,
	});

	/*
	Reset the redux store when user logged out
	 */
	if (action.type === "user/userLoggedOut") {
		// state = undefined;
	}

	return combinedReducer(state, action);
};

export default createReducer;
