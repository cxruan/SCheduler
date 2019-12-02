import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import clsx from 'clsx';
import MaterialTable from 'material-table';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, Paper, Box } from '@material-ui/core/';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { parseStateToCalEvents, parseStateToScores, parseStatesToGenSchedule } from '../utils';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import CustomCalEvent from './CustomCalEvent';

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
  onRowClick: selectedScheduleID => dispatch({ type: 'SET_SELECTED_ID', selectedScheduleID }),
  onGenSchedules: schedules => dispatch({ type: 'GEN_SCHEDULES', schedules })
});

function Schedule({
  courses,
  preferences,
  schedules,
  selectedScheduleID,
  onRowClick,
  onGenSchedules
}) {
  const [isZoom, setIsZoom] = React.useState(false);
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const localizer = momentLocalizer(moment);

  const getSelectedCalEvents = () => {
    const selected = schedules.find(schedule => schedule.id === selectedScheduleID);
    if (selected) {
      return parseStateToCalEvents(selected.sections);
    }
    return [];
  };

  const handleZoomClick = () => {
    setIsZoom(!isZoom);
  };

  const handleScoresRowClick = (event, rowData) => {
    onRowClick(rowData.id);
  };

  const handleGeneSchedules = async () => {
    axios
      .post('api/generate-schedule', parseStatesToGenSchedule(courses, preferences))
      .then(function({ data }) {
        console.log(data);
        onGenSchedules(data.results);
      })
      .finally(() => {});
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} lg={4}>
        <Grid container spacing={5} direction="column">
          <Grid item xs={12}>
            <MaterialTable
              data={parseStateToScores(schedules)}
              columns={[
                { title: 'Schedule', field: 'id', defaultSort: 'asc' },
                { title: 'Total', field: 'total', defaultSort: 'asc' },
                { title: 'Early', field: 'early', defaultSort: 'asc' },
                { title: 'Late', field: 'late', defaultSort: 'asc' },
                { title: 'Breaks', field: 'breaks', defaultSort: 'asc' },
                { title: 'Reserved', field: 'reserved', defaultSort: 'asc' }
              ]}
              options={{
                search: false,
                sorting: true,
                selection: false,
                pageSize: 10,
                pageSizeOptions: [],
                padding: 'dense',
                rowStyle: rowData => ({
                  backgroundColor:
                    selectedScheduleID !== 0 && selectedScheduleID === rowData.id ? '#EEE' : '#FFF'
                })
              }}
              title="Scores"
              onRowClick={handleScoresRowClick}
            />
          </Grid>
          <Grid item xs={12}>
            <Button color="primary" variant="contained" fullWidth onClick={handleGeneSchedules}>
              Generate Schedules
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={6} lg={8}>
        <Paper className={fixedHeightPaper}>
          <Grid container spacing={4} direction="row">
            <Grid item xs={4}>
              <Button color="primary" variant="contained" fullWidth onClick={handleZoomClick}>
                Zoom {!isZoom ? 'In' : 'Out'}
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button color="primary" variant="contained" fullWidth>
                Save to History
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button color="primary" variant="contained" fullWidth>
                Export
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

Schedule.propTypes = {
  courses: PropTypes.array.isRequired,
  preferences: PropTypes.object.isRequired,
  schedules: PropTypes.array.isRequired,
  selectedScheduleID: PropTypes.number.isRequired,
  onRowClick: PropTypes.func.isRequired,
  onGenSchedules: PropTypes.func.isRequired
};

export default connect(state => {
  const { scheduleControl, coursebinControl, preferenceControl } = state;
  return { ...scheduleControl, courses: coursebinControl.courses, preferences: preferenceControl };
}, mapDispatchToProps)(Schedule);
