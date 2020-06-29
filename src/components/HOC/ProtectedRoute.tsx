import React from "react";
import { Redirect } from "react-router-dom";
import { Store } from "../../reducers";
import { connect } from "react-redux";
import { LocalUserInfo } from "../../reducers/authentication";

export interface ProtectedRouteProps {
  userInfo: LocalUserInfo;
}

const ProtectedRoute: React.SFC<ProtectedRouteProps> = ({
  children,
  userInfo,
}) => {
  console.log(userInfo);
  if (!userInfo?.emailAddress || !userInfo.uid)
    return <Redirect to="/signin" />;
  return <>{children}</>;
};

const mapStateToProps = (state: Store) => ({
  userInfo: state.user.localUserInfo,
});

export default connect(mapStateToProps)(ProtectedRoute);
