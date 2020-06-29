import { Action, AuthenticationActionTypes } from "../reducers/authentication";

export default (): Action => {
  return {
    type: AuthenticationActionTypes.USER_LOGOUT,
  };
};
