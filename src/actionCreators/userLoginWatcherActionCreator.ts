import { Action, AuthenticationActionTypes } from "../reducers/authentication";

export default (uid: string): Action => {
  return {
    type: AuthenticationActionTypes.USER_LOGIN_WATCHER,
    payload: uid,
  };
};
