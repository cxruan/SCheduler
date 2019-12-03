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
  onTabClick: (tabId, tabName) => dispatch({ type: 'CHANGE_TAB', tabId, tabName })
});

function App({ enqueueSnackbar, onLogIn, onTabClick }) {
  const socket = new WebSocket('ws://localhost:8080/api/broadcast-schedules');

  React.useEffect(() => {
    axios.get('/api/login-status').then(function({ data }) {
      if (data.type === 'true') {
        onLogIn(data.message);
      }
    });
  }, []);

  const action = () => <Button onClick={handleButtonClick}>Have a look!</Button>;

  const handleButtonClick = () => {
    onTabClick(TABS.COMMUNITY, 'Community');
  };

  socket.addEventListener('message', function(event) {
    const data = JSON.parse(event.data);
    console.log(data);
    const { message } = data;
    const msg = JSON.parse(message);
    enqueueSnackbar(`${msg.username} has published a new schedule`, {
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
  onTabClick: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(withSnackbar(App));
