import React, { Dispatch, useEffect } from "react";
import { todosRef, auth, userRef } from "../services/firebase";
import { connect } from "react-redux";
import { ListReducer } from "../reducers/list";
import fetchTasksActionCreator from "../actionCreators/fetchTasksActionCreator";
import { User } from "firebase";
import userLoginWatcherActionCreator from "../actionCreators/userLoginWatcherActionCreator";
import { Store } from "../reducers";
import { LocalUserInfo } from "../reducers/authentication";
import fetchUserInfoActionCreator from "../actionCreators/fetchUserInfoActionCreator";

export interface FirebaseProps {
  fetchTodos: (data: ListReducer[]) => void;
  watchUserAuthenticateStatus: (uid: string) => void;
  userInfo: LocalUserInfo;
  userInitialize: boolean;
  fetchUserInfoAction: (user: LocalUserInfo) => void;
}

const Firebase: React.SFC<FirebaseProps> = ({
  fetchTodos,
  watchUserAuthenticateStatus,
  userInfo,
  userInitialize,
  fetchUserInfoAction,
}) => {
  const setupTodoListener = () => {
    if (userInfo.uid) {
      todosRef.child(userInfo.uid).on("value", (snapshot) => {
        if (snapshot.val()) {
          let data: ListReducer[] = Object.values(snapshot.val());
          data = data.sort((a, b) => {
            if (a.createdDate < b.createdDate) return -1;
            if (a.createdDate > b.createdDate) return 1;
            return 0;
          });
          fetchTodos(data);
        } else {
          fetchTodos([]);
        }
      });
    }
  };

  const setupUserInfoListener = () => {
    if (userInfo.uid) {
      userRef.child(userInfo.uid).once("value", (snapshot) => {
        if (!snapshot.val) return;
        fetchUserInfoAction(snapshot.val());
      });
    }
  };

  const setupAuthentication = () => {
    auth.onAuthStateChanged((user: User | null) => {
      if (user) {
        return watchUserAuthenticateStatus(user.uid);
      }
      return watchUserAuthenticateStatus("");
    });
  };

  useEffect(() => {
    setupTodoListener();
    setupAuthentication();
    setupUserInfoListener();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInitialize, userInfo.uid]);
  return null;
};

const mapStateToProps = (state: Store) => ({
  userInfo: state.user.localUserInfo,
  userInitialize: state.user.userInitialize,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    fetchTodos: (data: ListReducer[]) => {
      return setTimeout(() => {
        dispatch(fetchTasksActionCreator(data));
      });
    },
    watchUserAuthenticateStatus: (uid: string) =>
      dispatch(userLoginWatcherActionCreator(uid)),
    fetchUserInfoAction: (user: LocalUserInfo) => {
      dispatch(fetchUserInfoActionCreator(user));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Firebase);
