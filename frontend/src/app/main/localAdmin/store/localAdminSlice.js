import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import history from "@history";
import LocalAdminModel from "../model/localAdminModel";
import { ApiLocalAdmin, ApiUserLocal, endpoints_localAdmin, endpoints_userLocal } from "src/app/api";


const api = new ApiLocalAdmin();
const apiUserLocal = new ApiUserLocal();

export const getLocalAdmin = createAsyncThunk(
  "localAdminApp/getLocalAdmin",
  async (id, { dispatch, getState }) => {
    try {
      const data = await api.get(endpoints_localAdmin.LOCAL, id);
      return data;
    } catch (error) {
      history.push({ pathname: `/localAdmin` });
      return null;
    }
  }
);

export const addLocalAdmin = createAsyncThunk(
  "localAdminApp/addLocalAdmin",
  async (localAdmin, { dispatch, getState }) => {
    localAdmin.active = true;
    const data = await api.post(endpoints_localAdmin.LOCAL, localAdmin);
    return data;
  }
);

export const updateLocalAdmin = createAsyncThunk(
  "localAdminApp/updateLocalAdmin",
  async (localAdmin, { dispatch, getState }) => {
      try {
      const data = await api.put(
        endpoints_localAdmin.LOCAL,
        localAdmin.id,
        localAdmin
      );
      return data;
    } catch (error) {
      return error;
    }
  }
);

export const removeLocalAdmin = createAsyncThunk(
  "localAdminApp/removeLocalAdmin",
  async (localAdmin, { dispatch, getState }) => {
    try {
      const data = {
        id: localAdmin.id,
        fantasy_name: localAdmin.name,
        num_auth_sani: localAdmin.num_auth_sani,
        company_name: localAdmin.company_name,
        rut: localAdmin.rut,
        id_emp_admin: localAdmin.id_emp_admin,
        active: false,
        premium: localAdmin.premium
      }
      const response = await api.put(endpoints_localAdmin.LOCAL, localAdmin.id, data);
      return response.id;
    } catch (error) {
      return error;
    }
  }
);

export const selectLocalAdmin = (localAdminApp) => localAdminApp.localAdminSlice;

const initialState = {
  fantasy_name: "",
  num_auth_sani: "",
  company_name: "",
  rut: "",
  id_emp_admin: "",
  active: true,
  premium: false
}

const localAdminSlice = createSlice({
  name: "localAdminApp/localAdmin",
  initialState,
  reducers: {
    newLocalAdmin: (state, action) => LocalAdminModel(),
    resetLocalAdmin: () => null,
  },
  extraReducers: {
    [getLocalAdmin.pending]: (state, action) => null,
    [getLocalAdmin.fulfilled]: (state, action) => action.payload,
    [updateLocalAdmin.fulfilled]: (state, action) => action.payload,
    [removeLocalAdmin.fulfilled]: (state, action) => action.payload,
  },
});

export const { resetLocalAdmin, newLocalAdmin } = localAdminSlice.actions;

export default localAdminSlice.reducer;
