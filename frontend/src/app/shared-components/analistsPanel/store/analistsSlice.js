import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { ApiUserAdmin, endpoints_userAdmin } from "src/app/api";

const api = new ApiUserAdmin();

export const getAnalists = createAsyncThunk(
  "analistsPanel/analists/getAnalists",
  async (params, { getState }) => {
    const data = await api.get(endpoints_userAdmin.MYANALISTS);
    return data;
  }
);

const analistsAdapter = createEntityAdapter({});

export const { selectAll: selectAnalists, selectById: selectAnalistsById } =
  analistsAdapter.getSelectors((state) => state.analistsPanel.analists);

const analistsSlice = createSlice({
  name: "analistsPanel/analists",
  initialState: analistsAdapter.getInitialState([]),
  reducers: {},
  extraReducers: {
    [getAnalists.fulfilled]: analistsAdapter.setAll,
  },
});

export default analistsSlice.reducer;
