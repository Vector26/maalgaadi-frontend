import { combineReducers } from "redux";
import { Auth } from "./auth-reducers";
import { User } from "./user-reducers";

export default combineReducers({
    Auth,User
});
