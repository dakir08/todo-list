import { Action, TodoActionTypes } from "../reducers/list";

export default function updateTaskActionCreator(
  id: number,
  taskName: string,
  updatedTime: string
): Action {
  return {
    type: TodoActionTypes.UPDATE_TASK,
    payload: {
      id,
      taskName,
      updatedTime,
    },
  };
}
