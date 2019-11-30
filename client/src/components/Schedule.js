import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import clsx from 'clsx';
import MaterialTable from 'material-table';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, Paper, Box } from '@material-ui/core/';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { parseStateToCalEvents, parseStateToScores } from '../utils';
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
    height: 630
  }
}));

const mapDispatchToProps = dispatch => ({
  onRowClick: selectedScheduleID => dispatch({ type: 'SET_SELECTED_ID', selectedScheduleID })
});

function Schedule({ schedules, selectedScheduleID, onRowClick }) {
  const [selectedRow, setSelectedRow] = React.useState(1);
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

  const handleScoresRowClick = (event, rowData) => {
    onRowClick(rowData.id);
    setSelectedRow(rowData.id);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} lg={4}>
        <Grid container spacing={5} direction="column">
          <Grid item xs={12}>
            <MaterialTable
              data={parseStateToScores(schedules)}
              columns={[
                { title: 'Schedule', field: 'id' },
                { title: 'Total', field: 'total' },
                { title: 'Early', field: 'early' },
                { title: 'Late', field: 'late' },
                { title: 'Interval', field: 'interval' },
                { title: 'Breaks', field: 'breaks' }
              ]}
              options={{
                search: false,
                sorting: false,
                selection: false,
                pageSize: 10,
                pageSizeOptions: [],
                padding: 'dense',
                rowStyle: rowData => ({
                  backgroundColor: selectedRow !== 0 && selectedRow === rowData.id ? '#EEE' : '#FFF'
                })
              }}
              title="Scores"
              onRowClick={handleScoresRowClick}
            />
          </Grid>
          <Grid item xs={12}>
            <Button color="primary" variant="contained" fullWidth>
              Generate Schedules
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={6} lg={8}>
        <Paper className={fixedHeightPaper}>
          <Grid container spacing={5} direction="row">
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
              style={{ height: 530 }}
              toolbar={false}
              min={new Date('1880-10-06 08:00')}
              max={new Date('1880-10-06 20:00')}
              step={15}
              timeslots={2}
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
  schedules: PropTypes.array.isRequired,
  selectedScheduleID: PropTypes.number.isRequired,
  onRowClick: PropTypes.func.isRequired
};

export default connect(state => state.scheduleControl, mapDispatchToProps)(Schedule);
