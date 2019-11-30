import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import MaterialTable from 'material-table';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, Paper } from '@material-ui/core/';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { parseStateToTime } from '../utils';
import 'react-big-calendar/lib/css/react-big-calendar.css';

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

function Schedule() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const localizer = momentLocalizer(moment);
  const events = [
    {
      start: 600,
      end: 710,
      title: 'Some title'
    }
  ];
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} lg={4}>
        <Grid container spacing={5} direction="column">
          <Grid item xs={12}>
            <MaterialTable
              data={[
                {
                  id: 1,
                  total: 150.78,
                  early: 0,
                  late: 139.08,
                  interval: 11.7,
                  breaks: 0
                },
                {
                  id: 2,
                  total: 165.54,
                  early: 0,
                  late: 156.18,
                  interval: 9.36,
                  breaks: 0
                },
                {
                  id: 3,
                  total: 165.6,
                  early: 0,
                  late: 139.08,
                  interval: 26.52,
                  breaks: 0
                }
              ]}
              columns={[
                { title: 'Schedule', field: 'id' },
                { title: 'Total', field: 'total' },
                { title: 'Early', field: 'early' },
                { title: 'Late', field: 'late' },
                { title: 'Interval', field: 'interval' },
                { title: 'Breaks', field: 'breaks' }
              ]}
              parentChildData={(row, rows) => rows.find(a => a.id === row.parentId)}
              options={{
                search: false,
                sorting: false,
                selection: false,
                pageSize: 10,
                pageSizeOptions: [],
                padding: 'dense'
              }}
              title="Scores"
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
          <Calendar
            localizer={localizer}
            defaultView="work_week"
            views={['work_week']}
            defaultDate={new Date(moment('1880-10-06 00:00'))}
            events={events}
            startAccessor={({ start }) => {
              return new Date(parseStateToTime(start));
            }}
            endAccessor={({ end }) => new Date(parseStateToTime(end))}
            style={{ height: 700 }}
            toolbar={false}
            min={new Date('1880-10-06 08:00')}
            max={new Date('1880-10-06 20:00')}
            step={15}
            timeslots={8}
          />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Schedule;
