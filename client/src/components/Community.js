import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import clsx from 'clsx';
import MaterialTable from 'material-table';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Button, Box } from '@material-ui/core';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';
import CustomCalEvent from './CustomCalEvent';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { parseStateToCalEvents, parseStateToCommunity, handleCalendarExport } from '../utils';

const useStyles = makeStyles(() => ({
  paper: {
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column'
  },
  fixedHeight: {
    height: 580
  }
}));

const mapDispatchToProps = dispatch => ({
  onRowClick: selectedScheduleID =>
    dispatch({ type: 'SET_COMMUNITY_SELECTED_ID', selectedScheduleID }),
  onCommunityGet: schedules => dispatch({ type: 'GET_COMMUNITY_SCHEDULES', schedules })
});

function Community({ schedules, selectedScheduleID, onRowClick, onCommunityGet }) {
  const [isZoom, setIsZoom] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const localizer = momentLocalizer(moment);

  React.useEffect(() => {
    setIsLoading(true);
    axios
      .get('/api/public-schedules')
      .then(function({ data }) {
        if (!data.error) {
          onCommunityGet(data.results);
          if (data.results.length > 0 && selectedScheduleID === 0) {
            onRowClick(data.results[data.results.length - 1].id);
          }
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [onCommunityGet]);

  const handleZoomClick = () => {
    setIsZoom(!isZoom);
  };

  const getSelectedCalEvents = () => {
    const selected = schedules.find(schedule => schedule.id === selectedScheduleID);
    if (selected) {
      return parseStateToCalEvents(selected.sections.filter(section => section.time !== undefined));
    }
    return [];
  };

  const handleCommunityRowClick = (event, rowData) => {
    onRowClick(rowData.id);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} lg={4}>
        <Grid container spacing={5} direction="column">
          <Grid item xs={12}>
            <Box height={549} mb={1}>
              <MaterialTable
                isLoading={isLoading}
                data={parseStateToCommunity(schedules)}
                columns={[
                  { title: 'Id', field: 'id', defaultSort: 'desc' },
                  { title: 'Username', field: 'username', defaultSort: 'asc' },
                  { title: 'Schedule Name', field: 'scheduleName', defaultSort: 'asc' }
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
                      selectedScheduleID !== 0 && selectedScheduleID === rowData.id
                        ? '#EEE'
                        : '#FFF'
                  })
                }}
                title="Community"
                onRowClick={handleCommunityRowClick}
              />
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={6} lg={8}>
        <Grid container spacing={2} direction="column">
          <Grid item>
            <Paper className={fixedHeightPaper}>
              <Box id="cal">
                <Calendar
                  id="timetable"
                  localizer={localizer}
                  defaultView="work_week"
                  views={['work_week']}
                  defaultDate={new Date(moment('1880-10-06 00:00'))}
                  events={getSelectedCalEvents()}
                  style={{ maxHeight: 2000 }}
                  toolbar={false}
                  min={new Date('1880-10-06 08:00')}
                  max={new Date('1880-10-06 22:00')}
                  step={15}
                  timeslots={isZoom ? 2 : 4}
                  components={{ event: CustomCalEvent }}
                  formats={{ dayFormat: 'ddd' }}
                />
              </Box>
            </Paper>
          </Grid>
          <Grid item container spacing={2} direction="row" justify="center">
            <Grid item xs={4}>
              <Button color="primary" variant="contained" fullWidth onClick={handleZoomClick}>
                Zoom {!isZoom ? 'In' : 'Out'}
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button color="primary" variant="contained" fullWidth onClick={handleCalendarExport}>
                Export
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

Community.propTypes = {
  schedules: PropTypes.array.isRequired,
  selectedScheduleID: PropTypes.number.isRequired,
  onRowClick: PropTypes.func.isRequired,
  onCommunityGet: PropTypes.func.isRequired
};

export default connect(state => state.communityControl, mapDispatchToProps)(Community);
