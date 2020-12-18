import React, { useState, useCallback } from "react"; // TODO: add state?
import { BrowserRouter as Router, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import MainAppBar from "../components/MainAppBar";
import MainView from "./MainView";
import Sidebar from "../components/SideBar";
import { ProvideAuth } from "../hooks/useAuth";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawerButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  toolbar: theme.mixins.toolbar, // TODO: maybe use this for a sticky appbar
  content: {
    flexGrow: 1,
  },
}));

export default function App() {
  const classes = useStyles();

  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = useCallback(() => {
    setMobileOpen(!mobileOpen);
  }, [mobileOpen]);

  return (
    <ProvideAuth>
      <Router>
        <div className={classes.root}>
          <Sidebar
            mobileOpen={mobileOpen}
            handleDrawerToggle={handleDrawerToggle}
          />
          <main className={classes.content}>
            <MainAppBar handleDrawerToggle={handleDrawerToggle} />
            <MainView />
          </main>
        </div>
      </Router>
    </ProvideAuth>
  );
}
