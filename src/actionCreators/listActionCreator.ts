import { TodoActionTypes, Action } from "../reducers/list";

export default (
  id: number,
  itemName: string,
  currentTime: string,
  currentDate: string
): Action => {
  return {
    type: TodoActionTypes.ADD_TASK,
    payload: {
      id,
      taskName: itemName,
      isComplete: false,
      createdDate: currentDate,
      updatedTime: currentTime,
    },
  };
};
