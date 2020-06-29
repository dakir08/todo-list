import React from "react";

import {
  Toolbar,
  IconButton,
  Typography,
  Badge,
  AppBar,
} from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import useStyled from "./styles/GeneralStyled";
import clsx from "clsx";

export interface ToolBarProps {
  open: boolean;
  handleClick: () => void;
}

const ToolBar: React.SFC<ToolBarProps> = ({
  open,
  handleClick: openSideNavBar,
}) => {
  const classes = useStyled();
  return (
    <AppBar
      position="absolute"
      className={clsx(classes.appBar, open && classes.appBarShift)}
    >
      <Toolbar className={classes.toolbar}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={openSideNavBar}
          className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          className={classes.title}
        >
          My Todo List Board
        </Typography>
        <IconButton color="inherit">
          <Badge badgeContent={2} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default ToolBar;
