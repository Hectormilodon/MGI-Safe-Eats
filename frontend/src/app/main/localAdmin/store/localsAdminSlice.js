import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
  import { addLocalAdmin, removeLocalAdmin, updateLocalAdmin } from "./localAdminSlice";
  import { ApiLocalAdmin, endpoints_localAdmin } from "../../../api";
  
  const api = new ApiLocalAdmin();
  
  export const getLocalsAdmin = createAsyncThunk(
    "localsAdminApp/getLocalsAdmin",
    async (params, { getState }) => {
      const data = await api.get(endpoints_localAdmin.LOCAL);
      return { data };
    }
  );
  
  const localsAdminAdapter = createEntityAdapter({});
  
  //espacio
  export const { selectAll: selectLocalsAdmin, selectById: selectLocalsAdminById } =
  localsAdminAdapter.getSelectors((state) => state.localsAdminSlice);
  
  const localsAdminSlice = createSlice({
    name: "localsAdminApp/localsAdmin",
    initialState: localsAdminAdapter.getInitialState(),
    extraReducers: {
      [updateLocalAdmin.fulfilled]: localsAdminAdapter.upsertOne,
      [addLocalAdmin.fulfilled]: localsAdminAdapter.addOne,
      [removeLocalAdmin.fulfilled]: (state, action) =>
        localsAdminAdapter.removeOne(state, action.payload),
      [getLocalsAdmin.fulfilled]: (state, action) => {
        const { data } = action.payload;
        localsAdminAdapter.setAll(state, data);
      },
    },
  });
  
  export default localsAdminSlice.reducer;
  