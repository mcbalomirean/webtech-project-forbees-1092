import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, Typography } from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import SearchBar from "material-ui-search-bar";

const useStyles = makeStyles((theme) => ({
  drawerButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  title: {
    flexGrow: 1,
    marginRight: theme.spacing(2),
  },
}));

export default function SearchAppBar(props) {
  const classes = useStyles();
  const [searchValue, setSearchValue] = useState("");
  const handleChange = (newValue) => {
    setSearchValue(newValue);
    props.handleSearchBarChange(newValue);
  };

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
        <Typography className={classes.title} variant="h6" noWrap>
          {props.name}
        </Typography>
        <SearchBar
          placeholder="Search keywords or tags..."
          value={searchValue}
          onChange={handleChange}
        />
      </Toolbar>
    </AppBar>
  );
}
