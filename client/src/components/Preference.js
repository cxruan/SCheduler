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
  fixedHeight1: {
    height: 630
  },
  fixedHeight2: {
    height: 193
  }
}));

function Preference() {
  const classes = useStyles();
  const fixedHeightPaper1 = clsx(classes.paper, classes.fixedHeight1);
  const fixedHeightPaper2 = clsx(classes.paper, classes.fixedHeight2);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} lg={6}>
        <Grid container spacing={3} direction="column">
          <Grid item xs={12}>
            <Paper className={fixedHeightPaper2}>
              <Grid container spacing={2} direction="column">
                <Grid item>
                  <Typography component="h2" variant="h6" color="primary" gutterBottom>
                    I love getting up early.
                  </Typography>
                </Grid>
                <Grid item>
                  <Grid container spacing={2}>
                    <Grid item>
                      <Chip color="primary" label="Yes" />
                    </Grid>
                    <Grid item xs>
                      <Slider step={0.1} marks min={0} max={1} />
                    </Grid>
                    <Grid item>
                      <Chip color="primary" label="No" />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container spacing={2}>
                    <Grid item>
                      <Typography component="h2" variant="h6" color="primary" gutterBottom>
                        How early is early?
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <KeyboardTimePicker
                        ampm={false}
                        value={new Date('December 17, 1995 00:00:00')}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={fixedHeightPaper2}>
              <Grid container spacing={2} direction="column">
                <Grid item>
                  <Typography component="h2" variant="h6" color="primary" gutterBottom>
                    I love getting home late.
                  </Typography>
                </Grid>
                <Grid item>
                  <Grid container spacing={2}>
                    <Grid item>
                      <Chip color="primary" label="Yes" />
                    </Grid>
                    <Grid item xs>
                      <Slider step={0.1} marks min={0} max={1} />
                    </Grid>
                    <Grid item>
                      <Chip color="primary" label="No" />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container spacing={2}>
                    <Grid item>
                      <Typography component="h2" variant="h6" color="primary" gutterBottom>
                        How late is late?
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <KeyboardTimePicker
                        ampm={false}
                        value={new Date('December 17, 1995 00:00:00')}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={fixedHeightPaper2}>
              <Grid container spacing={2} direction="column">
                <Grid item>
                  <Typography component="h2" variant="h6" color="primary" gutterBottom>
                    I love long breaks between classes.
                  </Typography>
                </Grid>
                <Grid item>
                  <Grid container spacing={2}>
                    <Grid item>
                      <Chip color="primary" label="Yes" />
                    </Grid>
                    <Grid item xs>
                      <Slider step={0.1} marks min={0} max={1} />
                    </Grid>
                    <Grid item>
                      <Chip color="primary" label="No" />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container spacing={2}>
                    <Grid item>
                      <Typography component="h2" variant="h6" color="primary" gutterBottom>
                        How long is long?
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <KeyboardTimePicker
                        ampm={false}
                        value={new Date('December 17, 1995 00:00:00')}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <Paper className={fixedHeightPaper1}>
          <Grid container spacing={2} direction="column">
            <Grid item>
              <Typography component="h2" variant="h6" color="primary" gutterBottom>
                I need a break.
              </Typography>
            </Grid>
            <Grid item>
              <Grid container spacing={2}>
                <Grid item>
                  <Chip color="primary" label="From around" />
                </Grid>
                <Grid item xs={3}>
                  <KeyboardTimePicker ampm={false} value={new Date('December 17, 1995 00:00:00')} />
                </Grid>
                <Grid item>
                  <Chip color="primary" label="To" />
                </Grid>
                <Grid item xs={3}>
                  <KeyboardTimePicker ampm={false} value={new Date('December 17, 1995 00:00:00')} />
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container spacing={2}>
                <Grid item>
                  <Typography component="h2" variant="h6" color="primary" gutterBottom>
                    Don't care
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Slider step={0.1} marks min={0} max={1} />
                </Grid>
                <Grid item>
                  <Typography component="h2" variant="h6" color="primary" gutterBottom>
                    I mean it
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Button fullWidth variant="outlined" color="primary">
                Add
              </Button>
            </Grid>
            <Grid item>
              <MaterialTable
                data={[
                  {
                    id: 1,
                    start: '12:00',
                    end: '13:00',
                    cost: 15.0
                  }
                ]}
                columns={[
                  { title: 'Start', field: 'start' },
                  { title: 'End', field: 'end' },
                  { title: 'Cost', field: 'cost' }
                ]}
                parentChildData={(row, rows) => rows.find(a => a.id === row.parentId)}
                options={{
                  search: false,
                  sorting: false,
                  selection: false,
                  toolbar: false,
                  pageSizeOptions: [],
                  pageSize: 7,
                  padding: 'dense'
                }}
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Preference;
