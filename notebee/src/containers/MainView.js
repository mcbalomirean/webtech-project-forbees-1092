import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { AppBar, Toolbar, IconButton } from '@material-ui/core';
import { Menu as MenuIcon, Notes } from '@material-ui/icons';

class MainView extends Component {
  render() {
    return(
      <Switch>
        <Route exact path="/">
        TEST TEST TEST TEST TEST TEST
        </Route>
        <Route exact path="/notes">
        </Route>
        <Route exact path="/groups">
        </Route>
      </Switch>
    )
  }
}

export default MainView;