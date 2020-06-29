import React, { Dispatch, useEffect } from "react";
import { todosRef, auth } from "../services/firebase";
import { connect } from "react-redux";
import { ListReducer } from "../reducers/list";
import fetchTasksActionCreator from "../actionCreators/fetchTasksActionCreator";
import { User } from "firebase";
import watchUserLoginStatusActionCreator from "../actionCreators/watchUserLoginStatusActionCreator";
import { Store } from "../reducers";
import { LocalUserInfo } from "../reducers/authentication";

export interface FirebaseProps {
  fetchTodos: (data: ListReducer[]) => void;
  watchUserAuthenticateStatus: (user: User | null) => void;
  userInfo: LocalUserInfo;
  userInitialize: boolean;
}

const Firebase: React.SFC<FirebaseProps> = ({
  fetchTodos,
  watchUserAuthenticateStatus,
  userInfo,
  userInitialize,
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

  const setupAuthentication = () => {
    auth.onAuthStateChanged((user: User | null) => {
      if (user) {
        return watchUserAuthenticateStatus(user);
      }
      return watchUserAuthenticateStatus(null);
    });
  };

  useEffect(() => {
    setupTodoListener();
    setupAuthentication();

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
    watchUserAuthenticateStatus: (user: User | null) =>
      dispatch(watchUserLoginStatusActionCreator(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Firebase);
