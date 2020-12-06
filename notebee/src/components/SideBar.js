import React from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import SubjectIcon from '@material-ui/icons/Subject';
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import { makeStyles, useTheme } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
}));

function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
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
              <SupervisedUserCircleIcon/>
            </ListItemIcon>
            <ListItemText primary="Groups"/>
          </ListItem>
        <Divider />
          <ListItem button>
            <ListItemIcon>
              <SubjectIcon/>
            </ListItemIcon>
            <ListItemText primary="Notes"/>
          </ListItem>

          <ListItem button>
            <ListItemIcon>
         <LibraryBooksIcon/>
            </ListItemIcon>
            <ListItemText primary="Notebook"/>
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemIcon>
              <NoteAddIcon/>
            </ListItemIcon>
            <ListItemText primary="New Note"/>
          </ListItem>
        </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;
  
  return (
    <div className={classes.root}>
      <CssBaseline />  
      <nav className={classes.drawer} aria-label="notebee sidebar">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
}
export default ResponsiveDrawer;
