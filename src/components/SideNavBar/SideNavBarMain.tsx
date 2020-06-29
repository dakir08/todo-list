import React from "react";

import { List } from "@material-ui/core";
import {
  Dashboard as DashboardIcon,
  BarChart as BarChartIcon,
  PersonalVideo as PersonalVideoIcon,
} from "@material-ui/icons";
import ListItemWithNavLink from "./ListItemWithNavLink";
import { Store } from "../../reducers";
import { connect } from "react-redux";
import { LocalUserInfo } from "../../reducers/authentication";

export interface SideNavBarTopProps {
  user: LocalUserInfo;
}

const SideNavBarTop: React.SFC<SideNavBarTopProps> = ({ user }) => {
  return user.uid ? (
    <List>
      <ListItemWithNavLink to="/todo" title="Dashboard">
        <DashboardIcon />
      </ListItemWithNavLink>
      <ListItemWithNavLink to="/test" title="Test Page">
        <BarChartIcon />
      </ListItemWithNavLink>
      <ListItemWithNavLink
        to={`/${Math.random().toString(36).substring(7)}`}
        title="Random page"
      >
        <PersonalVideoIcon />
      </ListItemWithNavLink>
    </List>
  ) : null;
};

const mapStateToProps = (state: Store) => ({
  user: state.user.localUserInfo,
});

export default connect(mapStateToProps)(SideNavBarTop);
