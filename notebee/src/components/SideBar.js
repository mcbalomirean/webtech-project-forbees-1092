import React, { Fragment } from 'react';
import { Link } from 'react-router-dom'; // TODO: routing links
import { Hidden, Drawer, Divider, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { 
  AccountCircle as AccountCircleIcon,
  GroupAdd as GroupAddIcon,
  LibraryBooks as LibraryBooksIcon,
  NoteAdd as NoteAddIcon,
  SupervisedUserCircle as SupervisedUserCircleIcon,
  Subject as SubjectIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import GoogleIcon from './GoogleIcon';

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
}));

export default function SideBar(props) {
  const { window } = props;
  const classes = useStyles();

  const drawerContents = (
    <Fragment>
      <div className={classes.toolbar} /> {/* This adds an offset of the size of the toolbar for aesthetic reasons, before the drawer contents. */}
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon>
            <GoogleIcon />
          </ListItemIcon>
          <ListItemText primary="Login" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon>
            <NoteAddIcon />
          </ListItemIcon>
          <ListItemText primary="Create Note" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <GroupAddIcon />
          </ListItemIcon>
          <ListItemText primary="Create Group"/>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <SupervisedUserCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Groups"/>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon>
            <SubjectIcon />
          </ListItemIcon>
          <ListItemText primary="Notes"/>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <LibraryBooksIcon />
          </ListItemIcon>
          <ListItemText primary="Notebook"/>
        </ListItem>
      </List>
      <Divider />
    </Fragment>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <nav className={classes.drawer}>
      <Hidden smUp implementation="css">
        <Drawer
          container={container}
          variant='temporary'
          anchor='left'
          open={props.mobileOpen}
          onClose={props.handleDrawerToggle}
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
  );
};