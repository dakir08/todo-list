import React from "react";

import ContainerBoard from "./ContainerBoard";

export interface TestProps {}

const Test: React.SFC<TestProps> = () => {
  return (
    <ContainerBoard>
      <h1>HELLO THIS IS A TEST 2</h1>
    </ContainerBoard>
  );
};

export default Test;
