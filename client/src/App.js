import React from 'react';
import PropTypes from 'prop-types';
import { withSnackbar } from 'notistack';
import Dashboard from './components/Dashboard';

function App({ enqueueSnackbar }) {
  const socket = new WebSocket('ws://localhost:8080/api/broadcast-schedules');

  socket.addEventListener('message', function(event) {
    console.log('Message from server ', event.data);
    enqueueSnackbar(event.data, {
      variant: 'info',
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'right'
      }
    });
  });

  return <Dashboard socket={socket} />;
}

App.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired
};

export default withSnackbar(App);
