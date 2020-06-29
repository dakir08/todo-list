import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import ContainerBoard from "./ContainerBoard";

export interface NotFoundProps {}

const NotFound: React.SFC<NotFoundProps> = () => {
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setRedirect(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
  return redirect ? (
    <Redirect to="/" />
  ) : (
    <ContainerBoard>
      <h1>Page Not Found, Return after 3 seconds</h1>
    </ContainerBoard>
  );
};

export default NotFound;
