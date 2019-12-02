import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { TextField, Button, Grid, Container, Dialog } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withSnackbar } from 'notistack';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 500
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const mapDispatchToProps = dispatch => ({
  onDialogClick: openDialog => dispatch({ type: 'TOGGLE_SAVE_TO_HISTORY', openDialog })
});

function SaveToHistoryDialog({
  schedules,
  selectedScheduleID,
  openDialog,
  onDialogClick,
  enqueueSnackbar
}) {
  const [values, setValues] = React.useState({ scheduleName: '' });
  const [errorMsg, setErrorMsg] = React.useState('');
  const classes = useStyles();

  const handleDialogClose = () => {
    setErrorMsg('');
    onDialogClick(false);
  };

  const handleValueChange = event => {
    const { name, value } = event.target;
    setValues(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleRegisterSubmit = async () => {
    if (values.scheduleName === '') {
      setErrorMsg('Schedule name cannot be empty.');
    } else {
      axios
        .post('/api/save', {
          ...schedules.find(schedule => schedule.id === selectedScheduleID),
          scheduleName: values.scheduleName
        })
        .then(function({ data }) {
          if (data.type === 'ok') {
            handleDialogClose();
            enqueueSnackbar(`${values.scheduleName} Successfully saved to History!`, {
              variant: 'info',
              anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'right'
              }
            });
          }
        });
    }
  };

  return (
    <Dialog aria-labelledby="simple-dialog-title" open={openDialog} onClose={handleDialogClose}>
      <Container component="main">
        <CssBaseline />
        <div className={classes.paper}>
          <Grid container spacing={4} direction="row" alignContent="center" justify="center">
            <Grid item xs={9}>
              <TextField
                error={Boolean(errorMsg)}
                helperText={errorMsg}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Choose a name for the schedule"
                name="scheduleName"
                value={values.scheduleName}
                onChange={handleValueChange}
              />
            </Grid>
            <Grid item xs={3}>
              <Button
                size="large"
                type="submit"
                variant="contained"
                fullWidth
                color="primary"
                className={classes.submit}
                onClick={handleRegisterSubmit}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </div>
      </Container>
    </Dialog>
  );
}

SaveToHistoryDialog.propTypes = {
  schedules: PropTypes.array.isRequired,
  selectedScheduleID: PropTypes.number.isRequired,
  openDialog: PropTypes.bool.isRequired,
  onDialogClick: PropTypes.func.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired
};

export default connect(
  state => state.scheduleControl,
  mapDispatchToProps
)(withSnackbar(SaveToHistoryDialog));
