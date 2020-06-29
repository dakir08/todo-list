import React, { useState, Dispatch, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { connect } from "react-redux";

import ContainerBoard from "../ContainerBoard";

import {
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Grid,
  Link,
  Avatar,
} from "@material-ui/core";
import { LockOutlined as LockOutlinedIcon } from "@material-ui/icons";
import useStyled from "../styles/AuthenticationStyled";
import {
  LocalUserInfo,
  AuthenticationStatus,
} from "../../reducers/authentication";
import signInUserActionCreator from "../../actionCreators/signInUserActionCreator";
import { Store } from "../../reducers";
import AuthenticationMessage from "./AuthenticationMessage";

export interface LoginBoardProps {
  authenticationInfo: AuthenticationStatus;
  signInAction: (user: LocalUserInfo) => void;
}

const LoginBoard: React.SFC<LoginBoardProps> = ({
  signInAction,
  authenticationInfo,
}) => {
  const classes = useStyled();

  const [signInInfo, SetSignInInfo] = useState<LocalUserInfo>({
    emailAddress: "minhphuongsony@gmail.com",
    password: "123456789",
  });

  const handleSubmit = () => {
    signInAction(signInInfo!);
  };

  return (
    <ContainerBoard>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form
          className={classes.form}
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={signInInfo?.emailAddress}
            onChange={(e) =>
              SetSignInInfo({ ...signInInfo, emailAddress: e.target.value })
            }
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={signInInfo?.password}
            onChange={(e) =>
              SetSignInInfo({ ...signInInfo, password: e.target.value })
            }
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          {authenticationInfo ? (
            <AuthenticationMessage userStatus={authenticationInfo} />
          ) : (
            ""
          )}
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link
                href="#"
                variant="body2"
                component={RouterLink}
                to="/signup"
              >
                {"Don't have an account? Sign Up"}
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
  signInAction: (user: LocalUserInfo) =>
    dispatch(signInUserActionCreator(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginBoard);
