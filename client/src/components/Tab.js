import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TABS from '../constants';
import CourseBin from './CourseBin';
import Preference from './Preference';
import Schedule from './Schedule';
import History from './History';
import Community from './Community';

const useStyles = makeStyles(theme => ({
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto'
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  }
}));

function Tab({ tabId }) {
  const classes = useStyles();
  function getTab() {
    switch (tabId) {
      case TABS.COURSE_BIN:
        return <CourseBin />;
      case TABS.PREFERENCE:
        return <Preference />;
      case TABS.SCHEDULE:
        return <Schedule />;
      case TABS.HISTORY:
        return <History />;
      case TABS.COMMUNITY:
        return <Community />;
      default:
        return '';
    }
  }
  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="xl" className={classes.container}>
        {getTab()}
      </Container>
    </main>
  );
}

Tab.propTypes = {
  tabId: PropTypes.number.isRequired
};

export default Tab;
