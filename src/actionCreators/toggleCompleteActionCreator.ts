import { TodoActionTypes, Action } from "../reducers/list";

export default (
  id: number,
  isComplete: boolean,
  updatedTime: string
): Action => {
  return {
    type: TodoActionTypes.COMPLETE_TASK,
    payload: {
      id,
      isComplete,
      updatedTime,
    },
  };
};
