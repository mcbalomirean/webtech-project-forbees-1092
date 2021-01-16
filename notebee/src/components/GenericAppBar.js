import React from "react";
import { AppBar, Toolbar, IconButton, Typography } from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  drawerButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
}));

export default function MainAppBar(props) {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          className={classes.drawerButton}
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={props.handleDrawerToggle}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6">{props.name}</Typography>
      </Toolbar>
    </AppBar>
  );
}
