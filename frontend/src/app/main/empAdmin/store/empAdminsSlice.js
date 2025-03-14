import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
} from "@reduxjs/toolkit";
import { addEmpAdmin, removeEmpAdmin, updateEmpAdmin } from "./empAdminSlice";
import { ApiEmpAdmin, endpoints_empAdmin } from "src/app/api";

const api = new ApiEmpAdmin();

export const getEmpAdmins = createAsyncThunk(
	"empAdminsApp/getEmpAdmins",
	async (params, { getState }) => {
		const data = await api.get(endpoints_empAdmin.EMPADMIN);
		return { data };
	}
);

const empAdminsAdapter = createEntityAdapter({});
//espacio
export const { selectAll: selectEmpAdmins, selectById: selectEmpAdminById } =
	empAdminsAdapter.getSelectors((state) => state.empAdminsSlice);

const empAdminsSlice = createSlice({
	name: "empAdminsApp/empAdmins",
	initialState: empAdminsAdapter.getInitialState(),
	extraReducers: {
		[updateEmpAdmin.fulfilled]: empAdminsAdapter.upsertOne,
		[addEmpAdmin.fulfilled]: empAdminsAdapter.addOne,
		[removeEmpAdmin.fulfilled]: (state, action) => {
			const empAdminDeleted = empAdminsAdapter.removeOne(state, action.payload);
			return empAdminDeleted;
		},
		[getEmpAdmins.fulfilled]: (state, action) => {
			return empAdminsAdapter.setAll(state, action.payload.data);
		},
	},
});

export default empAdminsSlice.reducer;
