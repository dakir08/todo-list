import React from "react";

import useStyled from "./styles/GeneralStyled";
import { Container, Box } from "@material-ui/core";
import Copyright from "./Copyright";

export interface ContainerBoardProps {}

const ContainerBoard: React.FC = ({ children }) => {
  const classes = useStyled();
  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container}>
        <>{children}</>

        <Box pt={4} style={{ textAlign: "center" }}>
          <Copyright />
        </Box>
      </Container>
    </main>
  );
};

export default ContainerBoard;
