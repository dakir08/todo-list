import {
  LocalUserInfo,
  Action,
  AuthenticationActionTypes,
} from "../reducers/authentication";

export default (user: LocalUserInfo): Action => ({
  type: AuthenticationActionTypes.USER_LOGIN,
  payload: user,
});
