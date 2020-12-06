import React, { Fragment, useState } from 'react'; // TODO: add state?
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Drawer, Hidden, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Menu as MenuIcon, AccountCircle as AccountCircleIcon } from '@material-ui/icons';
import SideBar from '../components/SideBar';
import MainView from './MainView';
import { makeStyles } from '@material-ui/core/styles'

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1
  },
}));

export default function App(props) {
  const { window } = props;
  const classes = useStyles();

  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContents = (
    <Fragment>
      <List>
        <ListItem button>
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
      </List>
    </Fragment>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Router>
      <div className={classes.root}>
        <nav className={classes.drawer}>
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant='temporary'
            anchor='left'
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile according to Material-UI developers.
            }}
          >
            {drawerContents}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant='permanent'
            anchor='left'
            open
          >
            {drawerContents}
          </Drawer>
        </Hidden>
        </nav>
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