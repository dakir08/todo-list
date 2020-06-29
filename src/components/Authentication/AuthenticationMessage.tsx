import React from "react";
import { AuthenticationStatus } from "../../reducers/authentication";

export interface AuthenticationMessageProps {
  userStatus: AuthenticationStatus;
}

const AuthenticationMessage: React.SFC<AuthenticationMessageProps> = ({
  userStatus,
}) => {
  return (
    <p style={{ color: userStatus.error ? "red" : "green" }}>
      {userStatus.error
        ? userStatus.error
        : userStatus.success
        ? userStatus.success
        : ""}
    </p>
  );
};

export default AuthenticationMessage;
