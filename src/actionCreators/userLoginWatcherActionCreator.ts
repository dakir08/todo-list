import { Action, AuthenticationActionTypes } from "../reducers/authentication";
import { User } from "firebase";

export default (user: User | null): Action => {
  if (!user)
    return { type: AuthenticationActionTypes.USER_LOGIN_WATCHER, payload: {} };
  return {
    type: AuthenticationActionTypes.USER_LOGIN_WATCHER,
    payload: {
      uid: user.uid,
      emailAddress: user.email!,
    },
  };
};
