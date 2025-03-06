import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import history from "@history";
import UserModel from "../model/userModel";
import { ApiUserAdmin, endpoints_userAdmin } from "src/app/api/userAdminApi";

const api = new ApiUserAdmin();

export const getUser = createAsyncThunk(
	"usersApp/task/getUser",
	async (id, { dispatch, getState }) => {
		try {
			const data = await api.get(endpoints_userAdmin.ADMINUSERS, id);
			return data;
		} catch (error) {
			history.push({ pathname: `/userAdmin` });

			return null;
		}
	}
);

export const addUser = createAsyncThunk(
	"usersApp/addUser",
	async (user, { dispatch, getState }) => {
		user.active = true;
		const data = await api.post(endpoints_userAdmin.ADMINUSERS, user);
		const idUser = data.id;
		 return data;
	}
);

export const updateUser = createAsyncThunk(
	"usersApp/updateUser",
	async (user, { dispatch, getState }) => {
		try {
			const data = await api.put(endpoints_userAdmin.ADMINUSERS, user.id, user);
			return data;
		} catch (error) {
			return error;
		}
	}
);

export const removeUser = createAsyncThunk(
	"usersApp/removeUser",
	async (user, { dispatch, getState }) => {
		try {
			const deletedUser = {
				id: user.id,
				name: user.name,
				password: user.password,
				email: user.email,
				active: false,
			};
			const data = await api.put(endpoints_userAdmin.ADMINUSERS, user.id, deletedUser);
			return data.id;
		} catch (error) {
      return error;
    }
	}
);

export const selectUser = (usersApp) => usersApp.userSlice;

const initialState = {
	name: "",
	email: "",
	rol_id: "",
	active: true
}

const userSlice = createSlice({
	name: "usersApp/user",
	initialState: initialState,
	reducers: {
		newUser: (state, action) => UserModel(),
		resetUser: () => null,
	},
	extraReducers: {
		[getUser.pending]: (state, action) => null,
		[getUser.fulfilled]: (state, action) => action.payload,
		[updateUser.fulfilled]: (state, action) => action.payload,
		[removeUser.fulfilled]: (state, action) => action.payload
	}
});

export const { resetUser, newUser } = userSlice.actions;

export default userSlice.reducer;
