import React from "react";

import { IconButton, Drawer, Divider } from "@material-ui/core";
import clsx from "clsx";
import styled from "../styles/GeneralStyled";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import SideNavBarTop from "./SideNavBarMain";
import SideNavBarSetting from "./SideNavBarSetting";
import { Store } from "../../reducers";
import { connect } from "react-redux";

export interface SideNavBarProps {
  open: boolean;
  closeSideNavBar: () => void;
  userInitialize: boolean;
}

const SideNavBar: React.SFC<SideNavBarProps> = ({
  open,
  closeSideNavBar,
  userInitialize,
}) => {
  const classes = styled();

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
      }}
      open={open}
    >
      <div className={classes.toolbarIcon}>
        <IconButton onClick={closeSideNavBar}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      {userInitialize ? (
        <>
          {" "}
          <SideNavBarTop />
          <Divider />
          <SideNavBarSetting />
        </>
      ) : (
        <p>loading...</p>
      )}
    </Drawer>
  );
};

const mapStateToProps = (state: Store) => ({
  userInitialize: state.user.userInitialize,
});

export default connect(mapStateToProps)(SideNavBar);
