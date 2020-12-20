import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Button } from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";
import Groups from "./Groups";
import Notes from "./Notes";
import NotFound from "../components/NotFound";
import Welcome from "../components/Welcome";

class MainView extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Welcome}></Route>
        <Route exact path="/notes" component={Notes}></Route>
        <Route exact path="/groups" component={Groups}></Route>
        <Route exact path="*" component={NotFound}></Route>
      </Switch>
    );
  }
}

export default MainView;
