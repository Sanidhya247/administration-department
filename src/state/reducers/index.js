import { combineReducers } from "redux";
import AdminReducer from "./AdminReducer";

const reducers = combineReducers({
    Admin: AdminReducer
})

export default reducers;