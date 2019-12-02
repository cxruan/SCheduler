import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Dialog from '@material-ui/core/Dialog';
import { withSnackbar } from 'notistack';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 350
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  button: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const mapDispatchToProps = dispatch => ({
  onLoginClick: openLogin => dispatch({ type: 'TOGGLE_LOGIN', openLogin }),
  onRegisterClick: openRegister => dispatch({ type: 'TOGGLE_REGISTER', openRegister }),
  onLogIn: username => dispatch({ type: 'USER_LOGIN', username })
});

function LoginDialog({ openLogin, onLoginClick, onRegisterClick, onLogIn, enqueueSnackbar }) {
  const [values, setValues] = React.useState({ username: '', password: '' });
  const [errorMsg, setErrorMsg] = React.useState('');
  const classes = useStyles();

  const handleLoginClose = () => {
    onLoginClick(false);
  };

  const handleRegisterOpen = () => {
    onLoginClick(false);
    onRegisterClick(true);
  };

  const handleValueChange = event => {
    const { name, value } = event.target;
    setValues(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleLoginSubmit = async () => {
    axios
      .get('/api/login', {
        params: {
          username: values.username,
          password: values.password
        }
      })
      .then(function({ data }) {
        if (data.type === 'error') {
          setErrorMsg(data.message);
        } else if (data.type === 'ok') {
          onLogIn(values.username);
          setValues({ username: '', password: '' });
          setErrorMsg('');
          handleLoginClose();
          enqueueSnackbar('Successfully log in!', {
            variant: 'info',
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'right'
            }
          });
        }
      });
  };

  return (
    <Dialog aria-labelledby="simple-dialog-title" open={openLogin} onClose={handleLoginClose}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <TextField
            error={Boolean(errorMsg)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            value={values.username}
            onChange={handleValueChange}
            autoFocus
          />
          <TextField
            error={Boolean(errorMsg)}
            helperText={errorMsg}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            value={values.password}
            onChange={handleValueChange}
            label="Password"
            type="password"
            id="password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={handleLoginSubmit}
          >
            Sign In
          </Button>
          <Button fullWidth className={classes.button} onClick={handleRegisterOpen}>
            Don&apos;t have an account? Sign Up
          </Button>
        </div>
      </Container>
    </Dialog>
  );
}

LoginDialog.propTypes = {
  openLogin: PropTypes.bool.isRequired,
  onLoginClick: PropTypes.func.isRequired,
  onRegisterClick: PropTypes.func.isRequired,
  onLogIn: PropTypes.func.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired
};

export default connect(state => state.tabsControl, mapDispatchToProps)(withSnackbar(LoginDialog));
