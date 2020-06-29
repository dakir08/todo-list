export enum TodoActionTypes {
  ADD_TASK = "ADD_TASK",
  ADD_FETCHED_TASKS = "ADD_TASKS",
  UPDATE_TASK = "UPDATE_TASK",
  COMPLETE_TASK = "COMPLETE_TASK",
  DELETE_TASK = "DELETE_TASK",
  FETCH_TASKS = "FETCH_TASKS",
  FIREBASE_FETCHED_TASK = "FIREBASE_FETCHED_TASK",
}

export interface ListReducer {
  id: number;
  taskName: string;
  isComplete: boolean;
  updatedTime: string;
  createdDate: string;
}

export type Action =
  | {
      type: TodoActionTypes.ADD_TASK;
      payload: ListReducer;
    }
  | {
      type: TodoActionTypes.FETCH_TASKS;
      payload: ListReducer[];
    }
  | {
      type: TodoActionTypes.UPDATE_TASK;
      payload: { id: number; taskName: string; updatedTime: string };
    }
  | {
      type: TodoActionTypes.COMPLETE_TASK;
      payload: { id: number; isComplete: boolean; updatedTime: string };
    }
  | {
      type: TodoActionTypes.ADD_FETCHED_TASKS;
      payload: ListReducer[];
    }
  | {
      type: TodoActionTypes.DELETE_TASK;
      payload: number;
    };

export default function listReducer(state: ListReducer[] = [], action: Action) {
  switch (action.type) {
    case TodoActionTypes.ADD_TASK:
      return state;
    case TodoActionTypes.ADD_FETCHED_TASKS:
      return [...action.payload];
    case TodoActionTypes.COMPLETE_TASK:
      return state;
    case TodoActionTypes.DELETE_TASK:
      return state;
    case TodoActionTypes.UPDATE_TASK:
      return state;
    default:
      return state;
  }
}
