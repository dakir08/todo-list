import React from "react";

import { ListItem, ListItemText, ListItemIcon } from "@material-ui/core";
import { NavLink } from "react-router-dom";

export interface ListItemWithNavLinkProps {
  to: string;
  title: string;
}

const ListItemWithNavLink: React.SFC<ListItemWithNavLinkProps> = ({
  to,
  title,
  children,
}): JSX.Element => {
  return (
    <ListItem button component={NavLink} to={to}>
      <ListItemIcon>{children}</ListItemIcon>
      <ListItemText primary={title} />
    </ListItem>
  );
};

export default ListItemWithNavLink;
