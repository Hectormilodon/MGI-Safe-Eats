import {
	AuditorSegment,
	SupervisorSegment,
	ClientSegment,
	AdminSegment,
} from "./menuReducers";

// Action Definition
export const fetchMenusSuccessful = {
	type: "FETCH_MENUS_SUCCESSFUL",
	menuResponse: [],
};
export const fetchMenusFailed = {
	type: "FETCH_MENUS_FAILED",
};

// Union Action Types
export const Action = fetchMenusSuccessful | fetchMenusFailed;

// Action Creators
export const fetchMenusSuccessfulAction = (menuResponse) => {
	return { type: "FETCH_MENUS_SUCCESSFUL", menuResponse };
};

export const fetchMenusFailedAction = () => {
	return { type: "FETCH_MENUS_FAILED" };
};

export const clearMenus = () => {
    return { type: "CLEAR_MENUS" };
};

// thunk action

export const getMenus = () => {
    return async (dispatch) => {
        try {
            const userAuth = localStorage.getItem("sessionApp");
            const auth = JSON.parse(userAuth);

            if (auth && auth.rol_id) {
                switch (auth.rol_id) {
                    case 1:
                        dispatch(fetchMenusSuccessfulAction(AdminSegment.menus));
                        break;
                    case 2:
                        dispatch(fetchMenusSuccessfulAction(SupervisorSegment.menus));
                        break;
                    case 3:
                        dispatch(fetchMenusSuccessfulAction(AuditorSegment.menus));
                        break;
                    case 4:
                        dispatch(fetchMenusSuccessfulAction(ClientSegment.menus));
                        break;
                    default:
                        dispatch(fetchMenusFailedAction('Invalid role ID'));
                        break;
                }
            } else {
                dispatch(fetchMenusFailedAction('No role ID found'));
            }
        } catch (error) {
            dispatch(fetchMenusFailedAction('Error parsing session data'));
        }
    };
};

