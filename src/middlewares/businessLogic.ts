import { takeLatest, takeEvery, put, select, take } from "redux-saga/effects";
import { TodoActionTypes } from "../reducers/list";
import { todosRef, userRef, auth } from "../services/firebase";
import {
  AuthenticationActionTypes,
  Action as AuthenticateAction,
} from "../reducers/authentication";
import firebase, { User } from "firebase";
import { Store } from "../reducers";

function* addNewUserToFirebase(action: any) {
  const { emailAddress, firstName, lastName } = action.payload;
  try {
    const { user }: { user: User } = yield auth.createUserWithEmailAndPassword(
      action.payload.emailAddress,
      action.payload.password
    );

    if (user) {
      userRef.child(`${user.uid}`).set({
        id: user.uid,
        emailAddress,
        firstName,
        lastName,
      });

      yield put<AuthenticateAction>({
        type: AuthenticationActionTypes.ADD_NEW_USER_SUCCESS,
        payload: {
          success: "Created user Success ! Please switch to Sign In Page",
        },
      });
    }
  } catch (error) {
    yield put<AuthenticateAction>({
      type: AuthenticationActionTypes.ADD_NEW_USER_FAIL,
      payload: { error: error.message },
    });
  }
}

function* verifyUserFromFirebase(action: any) {
  try {
    const {
      user,
    }: { user: User } = yield firebase
      .auth()
      .signInWithEmailAndPassword(
        action.payload.emailAddress,
        action.payload.password
      );
    if (user) {
      // What should I put in here ???

      yield put<AuthenticateAction>({
        type: AuthenticationActionTypes.USER_LOGIN_SUCCESS,
        payload: {
          success: "Login success!",
        },
      });
    }
  } catch (error) {
    yield put<AuthenticateAction>({
      type: AuthenticationActionTypes.USER_LOGIN_FAIL,
      payload: {
        error: error.message,
      },
    });
  }
}

export default function* businessLogicMW() {
  const { payload } = yield take(AuthenticationActionTypes.USER_LOGIN_STATUS);
  const userUniqueId = payload.uid;

  const currentUserTodos = todosRef.child(`${userUniqueId}`);

  //Todo
  yield takeEvery(TodoActionTypes.ADD_TASK, (action: any) => {
    currentUserTodos.child(`${action.payload.id}`).set({ ...action.payload });
  });
  yield takeLatest(TodoActionTypes.COMPLETE_TASK, (action: any) => {
    const { id, isComplete, updatedTime } = action.payload;

    currentUserTodos.child(`${id}`).update({ isComplete, updatedTime });
  });
  yield takeLatest(TodoActionTypes.UPDATE_TASK, (action: any) => {
    const { id, taskName, updatedTime } = action.payload;

    currentUserTodos.child(`${id}`).update({ taskName, updatedTime });
  });
  yield takeEvery(TodoActionTypes.DELETE_TASK, (action: any) => {
    const id = action.payload;

    currentUserTodos.child(`${id}`).remove();
  });

  //AUTHENTICATION
  yield takeLatest(
    AuthenticationActionTypes.ADD_NEW_USER,
    addNewUserToFirebase
  );
  yield takeLatest(
    AuthenticationActionTypes.USER_LOGIN,
    verifyUserFromFirebase
  );
}
