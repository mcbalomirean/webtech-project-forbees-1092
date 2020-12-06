import React, { Component } from 'react'; // TODO: add state?
import { BrowserRouter as Router } from 'react-router-dom';
import SideBar from '../components/SideBar'
import MainView from './MainView'

function App(props) {
  return (
    <Router>
      <SideBar />
      <MainView />
    </Router>
  );
}

export default App;