import React from "react";
import { connect } from "react-redux";

import { List } from "@material-ui/core";
import {
  ExitToApp as ExitToAppIcon,
  VpnKeyOutlined as VpnKeyOutlinedIcon,
  LockOutlined as LockOutlinedIcon,
  Settings as SettingsIcon,
} from "@material-ui/icons";

import ListItemWithNavLink from "./ListItemWithNavLink";
import { Store } from "../../reducers";
import { LocalUserInfo } from "../../reducers/authentication";

export interface SideNavBarSettingProps {
  user: LocalUserInfo;
}

const SideNavBarSetting: React.SFC<SideNavBarSettingProps> = ({ user }) => {
  return (
    <List>
      {!user.uid && (
        <>
          <ListItemWithNavLink to="/signup" title="Register">
            <VpnKeyOutlinedIcon />
          </ListItemWithNavLink>
          <ListItemWithNavLink to="/signin" title="Login">
            <LockOutlinedIcon />
          </ListItemWithNavLink>
        </>
      )}

      {user.uid && (
        <>
          <ListItemWithNavLink to="/setting" title="Account Setting">
            <SettingsIcon />
          </ListItemWithNavLink>
          <ListItemWithNavLink to="/signout" title="Logout">
            <ExitToAppIcon />
          </ListItemWithNavLink>
        </>
      )}
    </List>
  );
};

const mapStateToProps = (state: Store) => ({
  user: state.user.localUserInfo,
});

export default connect(mapStateToProps)(SideNavBarSetting);
