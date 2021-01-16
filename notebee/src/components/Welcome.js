import React, { Fragment } from "react";
import { Typography } from "@material-ui/core";
import { useAuth } from "../hooks/useAuth";

// Welcome page, checks if the user is logged in and displays the appropiate message.

export default function Welcome() {
  const auth = useAuth();
  return (
    <Fragment>
      <Typography variant="h3" align="center">
        Welcome to NoteBee!
      </Typography>
      {auth.user ? (
        <div>
          <Typography variant="h4" align="center">
            You're logged in,
          </Typography>
          <Typography variant="h4" align="center">
            feel free to explore!
          </Typography>
          <img
            src="logo192.png"
            alt="NoteBee Logo"
            style={{
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          ></img>
        </div>
      ) : (
        <div>
          <Typography variant="h4" align="center">
            You're not logged in :(
          </Typography>
          <Typography variant="h4" align="center">
            Please login by pressing the button in the menu!
          </Typography>
          <img
            src={process.env.PUBLIC_URL + "/logo192.png"}
            alt="NoteBee Logo"
            style={{
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />
        </div>
      )}
    </Fragment>
  );
}
