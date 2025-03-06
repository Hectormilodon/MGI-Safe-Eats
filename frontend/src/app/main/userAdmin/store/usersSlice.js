import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { addUser, removeUser, updateUser } from "./userSlice";
import { ApiUserAdmin, endpoints_userAdmin } from "../../../api";
  
  const api = new ApiUserAdmin();
  
  export const getUsers = createAsyncThunk(
    "usersApp/getUsers",
    async (params, { getState }) => {
      const data = await api.get(endpoints_userAdmin.ADMINUSERS);
      return { data };
    }
  );
  
  const usersAdapter = createEntityAdapter({});
  
  //espacio
  export const { selectAll: selectUsers, selectById: selectUserById } =
  usersAdapter.getSelectors((state) => state.usersSlice );
  
  const usersSlice = createSlice({
    name: "usersApp/users",
    initialState: usersAdapter.getInitialState(),
    extraReducers: {
      [updateUser.fulfilled]: usersAdapter.upsertOne,
      [addUser.fulfilled]: usersAdapter.addOne,
      [removeUser.fulfilled]: (state, action) =>
        usersAdapter.removeOne(state, action.payload),
      [getUsers.fulfilled]: (state, action) => {
        const { data } = action.payload;
        usersAdapter.setAll(state, data);
      },
    },
  });
  
  export default usersSlice.reducer;
  