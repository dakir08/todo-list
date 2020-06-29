import { TodoActionTypes, Action } from "../reducers/list";

export default function deleteTaskActionCreator(id: number): Action {
  return {
    type: TodoActionTypes.DELETE_TASK,
    payload: id,
  };
}
