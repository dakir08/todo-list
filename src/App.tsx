import React, { useState } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import TodoListApp from "./components/ToDoListBoard";
import NotFound from "./components/NotFound";

//MATERIAL UI
import { CssBaseline } from "@material-ui/core";

// COMPONENT
import ToolBar from "./components/ToolBar";
import SideNavBar from "./components/SideNavBar/SideNavBar";
import useStyled from "./components/styles/GeneralStyled";
import Test from "./components/test";
import LogoutBoard from "./components/Authentication/SignOutBoard";
import RegisterBoard from "./components/Authentication/SignUpBoard";
import ProtectedRoute from "./components/HOC/ProtectedRoute";
import SignInBoard from "./components/Authentication/SignInBoard";
import Firebase from "./components/Firebase";
import { Store } from "./reducers";
import { connect } from "react-redux";

export interface AppProps {
  userInitialize: boolean;
}

const App: React.SFC<AppProps> = ({ userInitialize }) => {
  const classes = useStyled();

  const [open, setOpen] = useState(true);

  return (
    <div className={classes.root}>
      <Firebase />

      <CssBaseline />
      <ToolBar open={open} handleClick={() => setOpen(true)} />
      <SideNavBar open={open} closeSideNavBar={() => setOpen(false)} />

      {userInitialize && (
        <Switch>
          <Route
            path="/todo"
            render={() => (
              <ProtectedRoute>
                <TodoListApp />
              </ProtectedRoute>
            )}
          />
          <Route
            path="/test"
            render={() => (
              <ProtectedRoute>
                <Test />
              </ProtectedRoute>
            )}
          />
          <Route path="/signin" component={SignInBoard} />
          <Route path="/signout" component={LogoutBoard} />
          <Route path="/signup" component={RegisterBoard} />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" exact to="/todo" />
          <Redirect to="not-found" />
        </Switch>
      )}
    </div>
  );
};

const mapStateToProps = (state: Store) => ({
  userInitialize: state.user.userInitialize,
});

export default connect(mapStateToProps)(App);
