export interface AuthenticationStore {
  localUserInfo: LocalUserInfo;
  authenticatorStatus: AuthenticationStatus;
  userInitialize: boolean;
}

export interface LocalUserInfo {
  uid?: string;
  firstName?: string;
  lastName?: string;
  emailAddress?: string;
  password?: string;
}

export interface AuthenticationStatus {
  error?: string;
  success?: string;
}

export enum AuthenticationActionTypes {
  ADD_NEW_USER = "Add a new user",
  ADD_NEW_USER_SUCCESS = "Add user succesfully",
  ADD_NEW_USER_FAIL = "Display error to user",
  USER_LOGIN = "User login action",
  USER_LOGIN_SUCCESS = "User login successfully",
  USER_LOGIN_FAIL = "User login fail, display error to user",
  USER_LOGIN_STATUS = "The status of the logged user",
  USER_LOGOUT = "User logout action",
}

export type Action =
  | {
      type: AuthenticationActionTypes.ADD_NEW_USER;
      payload: LocalUserInfo;
    }
  | {
      type: AuthenticationActionTypes.ADD_NEW_USER_FAIL;
      payload: AuthenticationStatus;
    }
  | {
      type: AuthenticationActionTypes.ADD_NEW_USER_SUCCESS;
      payload: AuthenticationStatus;
    }
  | {
      type: AuthenticationActionTypes.USER_LOGIN;
      payload: LocalUserInfo;
    }
  | {
      type: AuthenticationActionTypes.USER_LOGIN_SUCCESS;
      payload: AuthenticationStatus;
    }
  | {
      type: AuthenticationActionTypes.USER_LOGIN_FAIL;
      payload: AuthenticationStatus;
    }
  | {
      type: AuthenticationActionTypes.USER_LOGIN_STATUS;
      payload: LocalUserInfo;
    }
  | {
      type: AuthenticationActionTypes.USER_LOGOUT;
    };

export default function reducer(
  state: AuthenticationStore | null = {
    userInitialize: false,
    authenticatorStatus: {},
    localUserInfo: {},
  },
  action: Action
) {
  switch (action.type) {
    case AuthenticationActionTypes.ADD_NEW_USER:
      return { ...state, localUserInfo: action.payload };
    case AuthenticationActionTypes.ADD_NEW_USER_SUCCESS:
      return { ...state, authenticatorStatus: action.payload };
    case AuthenticationActionTypes.ADD_NEW_USER_FAIL:
      return { ...state, authenticatorStatus: action.payload };
    case AuthenticationActionTypes.USER_LOGIN:
      return { ...state, localUserInfo: action.payload };
    case AuthenticationActionTypes.USER_LOGIN_SUCCESS:
      return { ...state, authenticatorStatus: action.payload };
    case AuthenticationActionTypes.USER_LOGIN_FAIL:
      return { ...state, authenticatorStatus: action.payload };
    case AuthenticationActionTypes.USER_LOGIN_STATUS:
      return { ...state, localUserInfo: action.payload, userInitialize: true };
    case AuthenticationActionTypes.USER_LOGOUT:
      return {
        userInitialize: false,
        localUserInfo: {},
        authenticatorStatus: {},
      };
    default:
      return state;
  }
}
