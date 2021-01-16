import React, { useState, useCallback } from "react"; // TODO: add state?
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import CreateGroup from "./CreateGroup";
import Groups from "./Groups";
import Notes from "./Notes";
import NotFound from "../components/NotFound";
import Sidebar from "../components/SideBar";
import Welcome from "../components/Welcome";
import GenericAppBar from "../components/GenericAppBar";
import SearchAppBar from "../components/SearchAppBar";
import { ProvideAuth } from "../hooks/useAuth";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
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
            <Switch>
              <Route exact path="/">
                <GenericAppBar
                  name="Welcome"
                  handleDrawerToggle={handleDrawerToggle}
                />
                <Welcome />
              </Route>
              <Route exact path="/notes">
                <Notes handleDrawerToggle={handleDrawerToggle} />
              </Route>
              <Route exact path="/groups">
                <GenericAppBar
                  name="Groups"
                  handleDrawerToggle={handleDrawerToggle}
                />
                <Groups />
              </Route>
              <Route exact path="/groups/create">
                <GenericAppBar
                  name="Create Group"
                  handleDrawerToggle={handleDrawerToggle}
                />
                <CreateGroup />
              </Route>
              <Route exact path="*">
                <GenericAppBar
                  name="Not Found"
                  handleDrawerToggle={handleDrawerToggle}
                />
                <NotFound />
              </Route>
            </Switch>
          </main>
        </div>
      </Router>
    </ProvideAuth>
  );
}
