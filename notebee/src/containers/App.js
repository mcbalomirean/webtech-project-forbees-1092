import React, { useState, useCallback } from "react"; // TODO: add state?
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import Groups from "./Groups";
import Notes from "./Notes";
import NotFound from "../components/NotFound";
import Sidebar from "../components/SideBar";
import Welcome from "../components/Welcome";
import GenericAppBar from "../components/GenericAppBar";
import { ProvideAuth } from "../hooks/useAuth";

const snackbarDuration = 5000;

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
  // We use useCallback so that this function isn't constantly passed in as a prop.
  // Should we not use useCallback, functions would be passed on each render, triggering re-renders
  // of all children in turn. We don't want that.
  const handleDrawerToggle = useCallback(() => {
    setMobileOpen(!mobileOpen);
  }, [mobileOpen]);

  const [successMessage, setSuccessMessage] = useState("");
  const [openSuccess, setOpenSuccess] = useState(false);
  const handleSuccessOpen = useCallback((message) => {
    setSuccessMessage(message);
    setOpenSuccess(true);
  }, []);
  const handleSuccessClose = useCallback((event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSuccess(false);
  }, []);

  const [errorMessage, setErrorMessage] = useState("");
  const [openError, setOpenError] = useState(false);
  const handleErrorOpen = useCallback((message) => {
    setErrorMessage(message);
    setOpenError(true);
  }, []);
  const handleErrorClose = useCallback((event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenError(false);
  }, []);

  return (
    <ProvideAuth>
      <Router>
        <div className={classes.root}>
          <Sidebar
            mobileOpen={mobileOpen}
            handleDrawerToggle={handleDrawerToggle}
            handleSuccess={handleSuccessOpen}
            handleError={handleErrorOpen}
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
                <Notes
                  handleDrawerToggle={handleDrawerToggle}
                  handleSuccess={handleSuccessOpen}
                  handleError={handleErrorOpen}
                />
              </Route>
              <Route exact path="/groups">
                <GenericAppBar
                  name="Groups"
                  handleDrawerToggle={handleDrawerToggle}
                />
                <Groups />
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
          <Snackbar
            open={openSuccess}
            autoHideDuration={snackbarDuration}
            onClose={handleSuccessClose}
          >
            <Alert
              elevation={6}
              onClose={handleSuccessClose}
              severity="success"
            >
              {successMessage}
            </Alert>
          </Snackbar>
          <Snackbar
            open={openError}
            autoHideDuration={snackbarDuration}
            onClose={handleErrorClose}
          >
            <Alert elevation={6} onClose={handleErrorClose} severity="error">
              {errorMessage}
            </Alert>
          </Snackbar>
        </div>
      </Router>
    </ProvideAuth>
  );
}
