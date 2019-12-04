import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import {
  CssBaseline,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Tooltip,
  Avatar
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SettingsIcon from '@material-ui/icons/Settings';
import PeopleIcon from '@material-ui/icons/People';
import HistoryIcon from '@material-ui/icons/History';
import EventNoteIcon from '@material-ui/icons/EventNote';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HelpIcon from '@material-ui/icons/Help';
import axios from 'axios';
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
    background:
      'linear-gradient(0deg, rgba(153,0,0,1) 0%, rgba(255,204,0,1) 36%, rgba(255,255,255,1) 56%)',
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
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column'
  },
  fixedHeight: {
    height: 480
  },
  orange: {
    color: theme.palette.secondary.contrastText,
    backgroundColor: theme.palette.secondary.main
  }
}));

const useTooltipStyles = makeStyles(() => ({
  tooltip: {
    fontSize: 15
  }
}));

const mapDispatchToProps = dispatch => ({
  onTabClick: (tabId, tabName) => dispatch({ type: 'CHANGE_TAB', tabId, tabName }),
  onDrawerClick: openDrawer => dispatch({ type: 'TOGGLE_DRAWER', openDrawer }),
  onLoginClick: openLogin => dispatch({ type: 'TOGGLE_LOGIN', openLogin }),
  onLogOut: () => dispatch({ type: 'USER_LOGOUT' })
});

function Dashboard({
  tabId,
  tabName,
  openDrawer,
  onTabClick,
  onDrawerClick,
  onLoginClick,
  user,
  onLogOut
}) {
  const classes = useStyles();
  const tooltipClasses = useTooltipStyles();

  const handleDrawerOpen = () => {
    onDrawerClick(true);
  };
  const handleDrawerClose = () => {
    onDrawerClick(false);
  };

  const handleTabClick = (id, name) => {
    onTabClick(id, name);
  };

  const handleLoginOpen = () => {
    onLoginClick(true);
  };

  const handleLogOut = () => {
    axios.get('/api/logout').finally(function() {
      onLogOut();
      onTabClick(TABS.COURSE_BIN, 'Course Bin');
    });
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={clsx(classes.appBar, openDrawer && classes.appBarShift)}>
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
          {user.status && (
            <Tooltip title={user.username} classes={tooltipClasses}>
              <Avatar className={classes.orange}>{user.username[0]}</Avatar>
            </Tooltip>
          )}
          {user.status ? (
            <Tooltip title="Log Out" classes={tooltipClasses}>
              <IconButton color="inherit" onClick={handleLogOut}>
                <ExitToAppIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Sign In" classes={tooltipClasses}>
              <IconButton color="inherit" onClick={handleLoginOpen}>
                <AccountCircleIcon />
              </IconButton>
            </Tooltip>
          )}
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
            disabled={!user.status}
            selected={tabId === TABS.HISTORY}
            onClick={() => {
              handleTabClick(TABS.HISTORY, 'History');
            }}
          >
            <ListItemIcon>
              <HistoryIcon />
            </ListItemIcon>
            <ListItemText primary="History" />
            {!user.status && openDrawer && (
              <ListItemSecondaryAction>
                <Tooltip title="Please log in to use History." classes={tooltipClasses}>
                  <IconButton>
                    <HelpIcon />
                  </IconButton>
                </Tooltip>
              </ListItemSecondaryAction>
            )}
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
  onDrawerClick: PropTypes.func.isRequired,
  onLoginClick: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  onLogOut: PropTypes.func.isRequired
};

export default connect(
  state => ({ ...state.tabsControl, user: state.userControl }),
  mapDispatchToProps
)(Dashboard);
