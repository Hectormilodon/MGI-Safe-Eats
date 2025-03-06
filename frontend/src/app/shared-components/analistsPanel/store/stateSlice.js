import { createSlice } from "@reduxjs/toolkit";

const stateSlice = createSlice({
  name: "analistsPanel/state",
  initialState: false,
  reducers: {
    toggleAnalistsPanel: (state, action) => !state,
    openAnalistsPanel: (state, action) => true,
    closeAnalistsPanel: (state, action) => false,
  },
});

export const { toggleAnalistsPanel, openAnalistsPanel, closeAnalistsPanel } =
  stateSlice.actions;

export const selectAnalistsPanelState = ({ analistsPanel }) =>
  analistsPanel.state;

export default stateSlice.reducer;
