import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SettingsIcon from '@material-ui/icons/Settings';
import PeopleIcon from '@material-ui/icons/People';
import HistoryIcon from '@material-ui/icons/History';
import EventNoteIcon from '@material-ui/icons/EventNote';
import { withSnackbar } from 'notistack';
import LoginDialog from './LoginDialog';
import RegisterDialog from './RegisterDialog';
import Tab from './Tab';
import TABS from '../constants';

const drawerWidth = 280;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: 'none'
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9)
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto'
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column'
  },
  fixedHeight: {
    height: 480
  }
}));

const mapDispatchToProps = dispatch => ({
  onTabClick: (tabId, tabName) => dispatch({ type: 'CHANGE_TAB', tabId, tabName }),
  onDrawerClick: openDrawer => dispatch({ type: 'TOGGLE_DRAWER', openDrawer })
});

function Dashboard({ tabId, tabName, openDrawer, onTabClick, onDrawerClick, enqueueSnackbar }) {
  const classes = useStyles();
  const handleDrawerOpen = () => {
    onDrawerClick(true);
    enqueueSnackbar('Jack just published his schedule!', {
      variant: 'info',
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'right'
      }
    });
  };
  const handleDrawerClose = () => {
    onDrawerClick(false);
  };

  const handleTabClick = (id, name) => {
    onTabClick(id, name);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, openDrawer && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, openDrawer && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            {tabName}
          </Typography>
          <IconButton color="inherit">
            <AccountCircleIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !openDrawer && classes.drawerPaperClose)
        }}
        open={openDrawer}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem
            button
            selected={tabId === TABS.COURSE_BIN}
            onClick={() => {
              handleTabClick(TABS.COURSE_BIN, 'Course Bin');
            }}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Course Bin" />
          </ListItem>
          <ListItem
            button
            selected={tabId === TABS.PREFERENCE}
            onClick={() => {
              handleTabClick(TABS.PREFERENCE, 'Preference');
            }}
          >
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Preference" />
          </ListItem>
          <ListItem
            button
            selected={tabId === TABS.SCHEDULE}
            onClick={() => {
              handleTabClick(TABS.SCHEDULE, 'Schedule');
            }}
          >
            <ListItemIcon>
              <EventNoteIcon />
            </ListItemIcon>
            <ListItemText primary="Schedule" />
          </ListItem>
          <ListItem
            button
            selected={tabId === TABS.HISTORY}
            onClick={() => {
              handleTabClick(TABS.HISTORY, 'History');
            }}
          >
            <ListItemIcon>
              <HistoryIcon />
            </ListItemIcon>
            <ListItemText primary="History" />
          </ListItem>
          <ListItem
            button
            selected={tabId === TABS.COMMUNITY}
            onClick={() => {
              handleTabClick(TABS.COMMUNITY, 'Community');
            }}
          >
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Community" />
          </ListItem>
        </List>
      </Drawer>
      <Tab tabId={tabId} />
      <LoginDialog />
      <RegisterDialog />
    </div>
  );
}

Dashboard.propTypes = {
  tabId: PropTypes.number.isRequired,
  tabName: PropTypes.string.isRequired,
  openDrawer: PropTypes.bool.isRequired,
  onTabClick: PropTypes.func.isRequired,
  onDrawerClick: PropTypes.func.isRequired
};

export default connect(state => state.tabsControl, mapDispatchToProps)(withSnackbar(Dashboard));
