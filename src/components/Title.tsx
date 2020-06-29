import React from "react";

import { Typography } from "@material-ui/core";

const Title: React.SFC = ({ children }) => {
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      {children}
    </Typography>
  );
};

export default Title;
