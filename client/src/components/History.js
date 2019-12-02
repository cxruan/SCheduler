import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import clsx from 'clsx';
import MaterialTable from 'material-table';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Button, Box } from '@material-ui/core';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import CustomCalEvent from './CustomCalEvent';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { parseStateToCalEvents, parseStateToHistory } from '../utils';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column'
  },
  fixedHeight: {
    height: '80vh'
  }
}));

const mapDispatchToProps = dispatch => ({
  onRowClick: selectedScheduleID =>
    dispatch({ type: 'SET_HISTORY_SELECTED_ID', selectedScheduleID })
});

function History({ schedules, selectedScheduleID, onRowClick }) {
  console.log(schedules);
  const [isZoom, setIsZoom] = React.useState(false);
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const localizer = momentLocalizer(moment);

  const handleZoomClick = () => {
    setIsZoom(!isZoom);
  };

  const getSelectedCalEvents = () => {
    const selected = schedules.find(schedule => schedule.id === selectedScheduleID);
    if (selected) {
      return parseStateToCalEvents(selected.sections);
    }
    return [];
  };

  const handleHistoryRowClick = (event, rowData) => {
    onRowClick(rowData.id);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} lg={4}>
        <Grid container spacing={5} direction="column">
          <Grid item xs={12}>
            <MaterialTable
              data={parseStateToHistory(schedules)}
              columns={[
                { title: 'Schedule', field: 'id' },
                { title: 'Schedule Name', field: 'scheduleName' }
              ]}
              options={{
                search: false,
                sorting: false,
                selection: false,
                pageSize: 13,
                pageSizeOptions: [],
                padding: 'dense',
                rowStyle: rowData => ({
                  backgroundColor:
                    selectedScheduleID !== 0 && selectedScheduleID === rowData.id ? '#EEE' : '#FFF'
                })
              }}
              title="History"
              onRowClick={handleHistoryRowClick}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={6} lg={8}>
        <Paper className={fixedHeightPaper}>
          <Grid container spacing={5} direction="row" justify="center">
            <Grid item xs={4}>
              <Button color="primary" variant="contained" fullWidth onClick={handleZoomClick}>
                Zoom {!isZoom ? 'In' : 'Out'}
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button color="primary" variant="contained" fullWidth>
                Export
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button color="primary" variant="contained" fullWidth>
                Publish
              </Button>
            </Grid>
          </Grid>
          <Box mt={3}>
            <Calendar
              localizer={localizer}
              defaultView="work_week"
              views={['work_week']}
              defaultDate={new Date(moment('1880-10-06 00:00'))}
              events={getSelectedCalEvents()}
              style={{ maxHeight: '65vh' }}
              toolbar={false}
              min={new Date('1880-10-06 08:00')}
              max={new Date('1880-10-06 20:00')}
              step={15}
              timeslots={isZoom ? 2 : 4}
              components={{ event: CustomCalEvent }}
              formats={{ dayFormat: 'ddd' }}
            />
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}

History.propTypes = {
  schedules: PropTypes.array.isRequired,
  selectedScheduleID: PropTypes.number.isRequired,
  onRowClick: PropTypes.func.isRequired
};

export default connect(state => state.historyControl, mapDispatchToProps)(History);
