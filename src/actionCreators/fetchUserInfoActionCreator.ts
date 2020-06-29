import {
  LocalUserInfo,
  Action,
  AuthenticationActionTypes,
} from "../reducers/authentication";

export default (user: LocalUserInfo): Action => ({
  type: AuthenticationActionTypes.FETCH_USER,
  payload: user,
});
