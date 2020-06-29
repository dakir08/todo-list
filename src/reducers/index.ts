import { combineReducers } from "redux";
import listReducer, { ListReducer } from "./list";
import userInfoReducer, { AuthenticationStore } from "./authentication";

export interface Store {
  todoList: ListReducer[];
  user: AuthenticationStore;
}

export default combineReducers({
  todoList: listReducer,
  user: userInfoReducer,
});
