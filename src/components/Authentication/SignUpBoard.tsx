import React, { useState, Dispatch } from "react";
import { Link as RouterLink } from "react-router-dom";
import { connect } from "react-redux";

import ContainerBoard from "../ContainerBoard";
import useStyled from "../styles/AuthenticationStyled";
import {
  LocalUserInfo,
  AuthenticationStatus,
} from "../../reducers/authentication";

import {
  Avatar,
  Typography,
  Grid,
  TextField,
  FormControlLabel,
  Link,
  Button,
  Checkbox,
} from "@material-ui/core";
import { LockOutlined as LockOutlinedIcon } from "@material-ui/icons";
import addUserActionCreator from "../../actionCreators/addUserActionCreator";
import { Store } from "../../reducers";
import AuthenticationMessage from "./AuthenticationMessage";

export interface RegisterBoardProps {
  registerNewUser: (userInfo: LocalUserInfo) => void;
  authenticationInfo: AuthenticationStatus;
}

const RegisterBoard: React.SFC<RegisterBoardProps> = ({
  registerNewUser,
  authenticationInfo,
}) => {
  const classes = useStyled();

  const [signUpInfo, setSignUpInfo] = useState<LocalUserInfo>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    registerNewUser(signUpInfo!);
  };

  return (
    <ContainerBoard>
      {" "}
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                autoFocus
                label="First Name"
                onChange={(e) =>
                  setSignUpInfo({ ...signUpInfo, firstName: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                autoComplete="lname"
                label="Last Name"
                onChange={(e) =>
                  setSignUpInfo({ ...signUpInfo, lastName: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                autoComplete="email"
                label="Email Address"
                onChange={(e) =>
                  setSignUpInfo({ ...signUpInfo, emailAddress: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                type="password"
                autoComplete="current-password"
                label="Password"
                onChange={(e) =>
                  setSignUpInfo({ ...signUpInfo, password: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          {authenticationInfo ? (
            <AuthenticationMessage userStatus={authenticationInfo} />
          ) : (
            ""
          )}

          <Grid container justify="flex-end">
            <Grid item>
              <Link
                href="#"
                variant="body2"
                component={RouterLink}
                to="/signin"
              >
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </ContainerBoard>
  );
};

const mapStateToProps = (state: Store) => ({
  authenticationInfo: state.user.authenticatorStatus,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  registerNewUser: (userInfo: LocalUserInfo) => {
    dispatch(addUserActionCreator(userInfo));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterBoard);
