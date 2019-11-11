import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  button: {
    margin: theme.spacing(1)
  }
}));

function CourseBin() {
  const classes = useStyles();
  return (
    <MaterialTable
      data={[
        {
          id: 1,
          name: 'CSCI-201',
          time: '',
          days: '',
          instructor: '',
          location: '',
          penalized: true,
          type: 'adult'
        },
        {
          id: 2,
          name: 'Lecture',
          time: '',
          days: '',
          instructor: '',
          location: '',
          penalized: true,
          type: 'child',
          parentId: 1
        },
        {
          id: 3,
          name: 'Lab',
          time: '',
          days: '',
          instructor: '',
          location: '',
          penalized: true,
          type: 'child',
          parentId: 1
        },
        {
          id: 4,
          name: 'Quiz',
          time: '',
          days: '',
          instructor: '',
          location: '',
          penalized: true,
          type: 'child',
          parentId: 1
        },
        {
          id: 5,
          name: '29929R',
          time: '3:30-5:20pm',
          days: 'Tuesday',
          instructor: '',
          location: 'SAL 109',
          penalized: true,
          type: 'child',
          parentId: 3
        },
        {
          id: 6,
          name: '29930R',
          time: '10:00-11:50am',
          days: 'Wednesday',
          instructor: '',
          location: 'SAL 109',
          penalized: true,
          type: 'child',
          parentId: 3
        },
        {
          id: 7,
          name: '29931R',
          time: '5:30-7:20pm',
          days: 'Tuesday',
          instructor: '',
          location: 'SAL 109',
          penalized: true,
          type: 'child',
          parentId: 3
        },
        {
          id: 8,
          name: 'CSCI-270',
          time: '',
          days: '',
          instructor: '',
          location: '',
          penalized: true,
          type: 'adult'
        },
        {
          id: 9,
          name: 'Lecture',
          time: '',
          days: '',
          instructor: '',
          location: '',
          penalized: true,
          type: 'child',
          parentId: 8
        },
        {
          id: 10,
          name: 'Discussion',
          time: '',
          days: '',
          instructor: '',
          location: '',
          penalized: true,
          type: 'child',
          parentId: 8
        },
        {
          id: 11,
          name: 'Quiz',
          time: '',
          days: '',
          instructor: '',
          location: '',
          penalized: true,
          type: 'child',
          parentId: 8
        },
        {
          id: 12,
          name: '29956R',
          time: '4:30-5:50pm',
          days: 'Mon, Wed',
          instructor: 'Shahriar Shamsian',
          location: 'MHP 101',
          penalized: true,
          type: 'child',
          parentId: 9
        },
        {
          id: 13,
          name: '29956R',
          time: '4:30-5:50pm',
          days: 'Mon, Wed',
          instructor: 'Shahriar Shamsian',
          location: 'MHP 101',
          penalized: true,
          type: 'child',
          parentId: 2
        },
        {
          id: 14,
          name: '29956R',
          time: '4:30-5:50pm',
          days: 'Mon, Wed',
          instructor: 'Shahriar Shamsian',
          location: 'MHP 101',
          penalized: true,
          type: 'child',
          parentId: 4
        },
        {
          id: 15,
          name: '29956R',
          time: '4:30-5:50pm',
          days: 'Mon, Wed',
          instructor: 'Shahriar Shamsian',
          location: 'MHP 101',
          penalized: true,
          type: 'child',
          parentId: 10
        },
        {
          id: 16,
          name: '29956R',
          time: '4:30-5:50pm',
          days: 'Mon, Wed',
          instructor: 'Shahriar Shamsian',
          location: 'MHP 101',
          penalized: true,
          type: 'child',
          parentId: 11
        }
      ]}
      columns={[
        { title: 'Name', field: 'name' },
        {
          title: 'Penalized',
          field: 'penalized',
          render: rowData => <Checkbox color="default" checked={rowData.penalized} />
        },
        { title: 'Time', field: 'time' },
        { title: 'Days', field: 'days' },
        { title: 'Instructor', field: 'instructor' },
        { title: 'Location', field: 'location' }
      ]}
      parentChildData={(row, rows) => rows.find(a => a.id === row.parentId)}
      options={{
        selection: true,
        search: false,
        sorting: false,
        showTextRowsSelected: false,
        padding: 'dense'
      }}
      components={{
        Toolbar: () => (
          <div>
            <Box p={2} display="flex" alignItems="center">
              <Box flexGrow={1}>
                <Typography variant="h6">Course Bin</Typography>
              </Box>
              <Box>
                <TextField className={classes.textField} label="Term Code" margin="normal" />
              </Box>
              <Box>
                <TextField className={classes.textField} label="Course Name" margin="normal" />
              </Box>
              <Box>
                <Button variant="contained" size="large" color="primary">
                  Add
                </Button>
              </Box>
            </Box>
          </div>
        )
      }}
    />
  );
}

export default CourseBin;
