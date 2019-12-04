import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';
import './index.css';
import App from './App';
import store from './redux/store';

const theme = createMuiTheme({
  typography: {
    fontFamily: '"Lato","Roboto", "Helvetica", "Arial", sans-serif'
  },
  palette: {
    primary: {
      main: '#990000',
      dark: '#990000'
    },
    secondary: {
      main: '#ffcc00',
      dark: '#ffcc00'
    }
  }
});

const useStyles = makeStyles(t => ({
  info: { backgroundColor: t.palette.primary.main }
}));

function SnackBarApp() {
  const classes = useStyles();

  return (
    <SnackbarProvider
      classes={{
        variantInfo: classes.info
      }}
    >
      <App />
    </SnackbarProvider>
  );
}

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <SnackBarApp />
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);
