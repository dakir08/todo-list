import React, { useEffect, useState, Dispatch } from "react";
import { Redirect } from "react-router-dom";

import ContainerBoard from "../ContainerBoard";
import { auth } from "../../services/firebase";
import SignOutActionCreator from "../../actionCreators/SignOutActionCreator";
import { connect } from "react-redux";

export interface LogoutBoardProps {
  signOutAction: () => void;
}

const LogoutBoard: React.SFC<LogoutBoardProps> = ({ signOutAction }) => {
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setRedirect(true);
      auth.signOut();
      signOutAction();
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);
  return redirect ? (
    <Redirect to="/signin" />
  ) : (
    <ContainerBoard>
      <h1>Logging out, see ya :(</h1>
      <h3>This page will be switched after 2 seconds</h3>
    </ContainerBoard>
  );
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  signOutAction: () => dispatch(SignOutActionCreator()),
});

export default connect(null, mapDispatchToProps)(LogoutBoard);
