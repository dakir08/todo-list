import { TodoActionTypes, ListReducer, Action } from "../reducers/list";

export default (tasks: ListReducer[]): Action => ({
  type: TodoActionTypes.FETCH_TASKS,
  payload: tasks,
});
