import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
} from "@reduxjs/toolkit";
import { ApiUserAdmin,  } from "src/app/api";

const api = new ApiUserAdmin();

export const getUserMenuPage = createAsyncThunk(
	"navigation/getUserMenuPage",
	async (id, { getState }) => {
		try {
			return hola
		} catch (error) {
			console.log("error-->", error);
		}
	}
);

export const selectUserMenuPage = ({ navigation }) => navigation.userMenuPage;

// export const {
//   selectAll: selectUserMenuPage,
//   selectById: selectUserMenuPageById,
// } = userMenuPageAdapter.getSelectors((state) => state.navigation.userMenuPage);

const userMenuPageSlice = createSlice({
	name: "navigation/userMenuPage",
	initialState: null,
	reducers: {},
	extraReducers: {
		[getUserMenuPage.pending]: (state, action) => null,
		[getUserMenuPage.fulfilled]: (state, action) => action.payload,
	},
});

export default userMenuPageSlice.reducer;
