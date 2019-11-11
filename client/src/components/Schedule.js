import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import MaterialTable from 'material-table';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Chip from '@material-ui/core/Chip';
import { KeyboardTimePicker } from '@material-ui/pickers';
import Button from '@material-ui/core/Button';

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
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Schedule;
