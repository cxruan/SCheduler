import React from 'react';
import PropTypes from 'prop-types';
import { withSnackbar } from 'notistack';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import axios from 'axios';
import Dashboard from './components/Dashboard';
import TABS from './constants';

const mapDispatchToProps = dispatch => ({
  onLogIn: username => dispatch({ type: 'USER_LOGIN', username }),
  onTabClick: (tabId, tabName) => dispatch({ type: 'CHANGE_TAB', tabId, tabName }),
  onRowClick: selectedScheduleID =>
    dispatch({ type: 'SET_COMMUNITY_SELECTED_ID', selectedScheduleID })
});

function App({ enqueueSnackbar, onLogIn, onTabClick, onRowClick }) {
  const socket = new WebSocket('/api/broadcast-schedules');
  React.useEffect(() => {
    axios.get('/api/login-status').then(function({ data }) {
      if (data.type === 'true') {
        onLogIn(data.message);
      }
    });
  }, []);

  const action = key => <Button onClick={() => handleButtonClick(key)}>Have a look!</Button>;

  const handleButtonClick = key => {
    onRowClick(key);
    onTabClick(TABS.COMMUNITY, 'Community');
  };

  socket.addEventListener('message', function(event) {
    const data = JSON.parse(event.data);
    console.log(data);
    const { username, scheduleName, scheduleId } = data;
    enqueueSnackbar(`${username} has published a new schedule ${scheduleName}`, {
      key: scheduleId,
      variant: 'info',
      action,
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'right'
      }
    });
  });

  return <Dashboard />;
}

App.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  onLogIn: PropTypes.func.isRequired,
  onTabClick: PropTypes.func.isRequired,
  onRowClick: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(withSnackbar(App));
