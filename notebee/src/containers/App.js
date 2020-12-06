import React, { useState, useCallback } from 'react'; // TODO: add state?
import { BrowserRouter as Router, } from 'react-router-dom';
import { AppBar, Toolbar, IconButton } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles'
import MainView from './MainView';
import Sidebar from '../components/SideBar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  drawerButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar, // TODO: maybe use this for a sticky appbar
  content: {
    flexGrow: 1
  },
}));

export default function App() {
  const classes = useStyles();

  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = useCallback(() => {
    setMobileOpen(!mobileOpen);
  }, [mobileOpen]);

  return (
    <Router>
      <div className={classes.root}>
        <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle}/>
        <main className={classes.content}>
          <AppBar position="static">
            <Toolbar>
              <IconButton className={classes.drawerButton} edge='start' color='inherit' aria-label='open drawer' onClick={handleDrawerToggle}>
                <MenuIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <MainView />
        </main>
      </div>
    </Router>
  );
};