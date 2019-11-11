import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import MaterialTable from 'material-table';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
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

function History() {
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
                  name: 'my schedule 1'
                },
                {
                  id: 2,
                  name: 'my schedule 2'
                },
                {
                  id: 3,
                  name: 'my schedule 3'
                }
              ]}
              columns={[
                { title: 'Schedule', field: 'id' },
                { title: 'Schedule Name', field: 'name' }
              ]}
              options={{
                search: false,
                sorting: false,
                selection: false,
                pageSize: 13,
                pageSizeOptions: [],
                padding: 'dense'
              }}
              title="History"
              editable={{
                onRowDelete: () =>
                  new Promise(resolve => {
                    setTimeout(() => {
                      resolve();
                    }, 1000);
                  })
              }}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={6} lg={8}>
        <Paper className={fixedHeightPaper}>
          <Grid container spacing={5} direction="row" justify="center">
            <Grid item xs={6}>
              <Button color="primary" variant="contained" fullWidth>
                Export
              </Button>
            </Grid>
            <Grid item xs={6}>
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

export default History;
