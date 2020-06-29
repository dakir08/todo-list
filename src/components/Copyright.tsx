import React from "react";
import { Typography, Link } from "@material-ui/core";

export interface CopyrightProps {}

const Copyright: React.SFC<CopyrightProps> = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"From © "}
      <Link color="inherit" href="https://maxphuongle.com/">
        ＼(≧▽≦)／
      </Link>
      {"With Yuuki <3"}
    </Typography>
  );
};

export default Copyright;
