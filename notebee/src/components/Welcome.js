import React, { Fragment } from "react";
import { Typography } from "@material-ui/core";
import { useAuth } from "../hooks/useAuth";

export default function Welcome() {
  const auth = useAuth();
  return (
    <Fragment>
      <Typography variant="h3" align="center">
        Welcome to NoteBee!
      </Typography>
      {auth.user ? (
        <Typography variant="h4" align="center">
          You're logged in! Congratulations!
        </Typography>
      ) : (
        <Typography variant="h4" align="center">
          It seems that you're not logged in. To login, please press the login
          button in the sidebar!
        </Typography>
      )}
    </Fragment>
  );
}
