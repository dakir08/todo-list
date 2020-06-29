import { all, put, takeLatest } from "redux-saga/effects";
import { TodoActionTypes, Action } from "../reducers/list";
import businessLogicMW from "./businessLogic";

function* fetchTodoListFromFirebase(action: any) {
  yield put<Action>({
    type: TodoActionTypes.ADD_FETCHED_TASKS,
    payload: action.payload,
  });
}

function* watchActionFromFirebase() {
  yield takeLatest(TodoActionTypes.FETCH_TASKS, fetchTodoListFromFirebase);
}

export default function* rootSaga() {
  yield all([watchActionFromFirebase(), businessLogicMW()]);
}
