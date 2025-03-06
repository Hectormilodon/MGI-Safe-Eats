import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import history from "@history";
import EmpAdminModel from "../model/empAdminModel";
import { ApiEmpAdmin, endpoints_empAdmin } from "src/app/api"

const api = new ApiEmpAdmin();

export const getEmpAdmin = createAsyncThunk(
  "empAdminApp/getEmpAdmin",
  async (id, { dispatch, getState }) => {
    try {
      const data = await api.get(endpoints_empAdmin.EMPADMIN, id);
      return data;
    } catch (error) {
      history.push({ pathname: `/empAdmin` });
      return null;
    }
  }
);

export const addEmpAdmin = createAsyncThunk(
  "empAdminApp/addEmpAdmin",
  async (empAdmin, { dispatch, getState }) => {
    const data = await api.post(endpoints_empAdmin.EMPADMIN, empAdmin);
    return data;
  }
);

export const updateEmpAdmin = createAsyncThunk(
  "empAdminApp/updateEmpAdmin",
  async (empAdmin, { dispatch, getState }) => {
      const empAdminsArray = getState().empAdminsSlice.entities;

      try {
      const data = await api.put(
        endpoints_empAdmin.EMPADMIN,
        empAdmin.id,
        empAdmin
      );
      return data;
    } catch (error) {
      return error;
    }
  }
);

export const removeEmpAdmin = createAsyncThunk(
  "empAdminApp/removeEmpAdmin",
  async (empAdmin, { dispatch, getState }) => {
    try {
      const data = {
        id: empAdmin.id,
        name: empAdmin.name,
        active: false
      }
      const response = await api.put(endpoints_empAdmin.EMPADMIN, empAdmin.id, data);
      return response.id;
    } catch (error) {
      return error;
    }
  }
);

export const selectEmpAdmin = ({ empAdminApp }) => {
  return empAdminApp.empAdmin
};

const initialState = {
  name: "",
  active: true
}

const empAdminSlice = createSlice({
  name: "empAdminApp/empAdmin",
  initialState,
  reducers: {
    newEmpAdmin: (state, action) => EmpAdminModel(),
    resetEmpAdmin: () => null,
  },
  extraReducers: {
    [getEmpAdmin.pending]: (state, action) => null,
    [getEmpAdmin.fulfilled]: (state, action) => action.payload,
    [updateEmpAdmin.fulfilled]: (state, action) => action.payload,
    [removeEmpAdmin.fulfilled]: (state, action) => action.payload,
  },
});

export const { resetEmpAdmin, newEmpAdmin } = empAdminSlice.actions;

export default empAdminSlice.reducer;
