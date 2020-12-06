import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

class MainView extends Component {
  render() {
    return(
      <Switch>
        <Route exact path="/">
      
        </Route>
        <Route path="/notes">
      
        </Route>
        <Route path="/groups">
      
        </Route>
      </Switch>
    )
  }
}

export default MainView;