import React, { Fragment, useState } from "react";
import { Link as RouteLink } from "react-router-dom"; // TODO: routing links
import {
  Hidden,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Link,
  Snackbar,
} from "@material-ui/core";
import {
  AccountCircle as AccountCircleIcon,
  GroupAdd as GroupAddIcon,
  LibraryBooks as LibraryBooksIcon,
  NoteAdd as NoteAddIcon,
  SupervisedUserCircle as SupervisedUserCircleIcon,
  Subject as SubjectIcon,
  ExitToApp as ExitToAppIcon,
} from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import GoogleIcon from "./GoogleIcon";
import { useAuth } from "../hooks/useAuth";
import CreateNoteDialog from "../containers/CreateNoteDialog";
import CreateGroupDialog from "../containers/CreateGroupDialog";

const API = process.env.REACT_APP_API_BASEURL;

const drawerWidth = 200;
const snackbarDuration = 5000;

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up("sm")]: {
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
  const auth = useAuth();

  const [createNoteOpen, setCreateNoteOpen] = useState(false);
  const handleCreateNoteOpen = () => {
    setCreateNoteOpen(true);
  };
  const handleCreateNoteClose = () => {
    setCreateNoteOpen(false);
  };

  const [createGroupOpen, setCreateGroupOpen] = useState(false);
  const handleCreateGroupOpen = () => {
    setCreateGroupOpen(true);
  };
  const handleCreateGroupClose = () => {
    setCreateGroupOpen(false);
  };

  const [successMessage, setSuccessMessage] = useState("");
  const [openSuccess, setOpenSuccess] = useState(false);
  const handleSuccessOpen = (message) => {
    setSuccessMessage(message);
    setOpenSuccess(true);
  };
  const handleSuccessClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSuccess(false);
  };

  const [errorMessage, setErrorMessage] = useState("");
  const [openError, setOpenError] = useState(false);
  const handleErrorOpen = (message) => {
    setErrorMessage(message);
    setOpenError(true);
  };
  const handleErrorClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenError(false);
  };

  const drawerContents = (
    <Fragment>
      <div className={classes.toolbar} />
      {/* This adds an offset of the size of the toolbar for aesthetic reasons, before the drawer contents. */}
      <Divider />
      <List>
        {auth.user ? (
          <ListItem button onClick={auth.logout}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        ) : (
          <ListItem button component={Link} href={`${API}/auth/login`}>
            <ListItemIcon>
              <GoogleIcon />
            </ListItemIcon>
            <ListItemText primary="Login" />
          </ListItem>
        )}
      </List>
      <Divider />
      <List>
        <ListItem button onClick={handleCreateNoteOpen}>
          <ListItemIcon>
            <NoteAddIcon />
          </ListItemIcon>
          <ListItemText primary="Create Note" />
        </ListItem>
        <ListItem button onClick={handleCreateGroupOpen}>
          <ListItemIcon>
            <GroupAddIcon />
          </ListItemIcon>
          <ListItemText primary="Create Group" />
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
        <ListItem button component={RouteLink} to="/groups">
          <ListItemIcon>
            <SupervisedUserCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Groups" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button component={RouteLink} to="/notes">
          <ListItemIcon>
            <SubjectIcon />
          </ListItemIcon>
          <ListItemText primary="Notes" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <LibraryBooksIcon />
          </ListItemIcon>
          <ListItemText primary="Notebook" />
        </ListItem>
      </List>
      <Divider />
    </Fragment>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <nav className={classes.drawer}>
      <Hidden smUp implementation="css">
        <Drawer
          container={container}
          variant="temporary"
          anchor="left"
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
          variant="permanent"
          anchor="left"
          open
        >
          {drawerContents}
        </Drawer>
      </Hidden>
      <CreateNoteDialog
        open={createNoteOpen}
        handleClose={handleCreateNoteClose}
        handleSuccess={handleSuccessOpen}
        handleError={handleErrorOpen}
      />
      <CreateGroupDialog
        open={createGroupOpen}
        handleClose={handleCreateGroupClose}
        handleSuccess={handleSuccessOpen}
        handleError={handleErrorOpen}
      />
      <Snackbar
        open={openSuccess}
        autoHideDuration={snackbarDuration}
        onClose={handleSuccessClose}
      >
        <Alert elevation={6} onClose={handleSuccessClose} severity="success">
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
    </nav>
  );
}
