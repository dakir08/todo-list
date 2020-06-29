import {
  Action,
  AuthenticationActionTypes,
  LocalUserInfo,
} from "../reducers/authentication";

export default (userInfo: LocalUserInfo): Action => {
  return {
    type: AuthenticationActionTypes.ADD_NEW_USER,
    payload: userInfo,
  };
};
