import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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

function CourseBin({ data }) {
  const classes = useStyles();
  return (
    <MaterialTable
      data={data}
      columns={[
        { title: 'Name', field: 'id' },
        { title: 'Type', field: 'class_type' },
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

CourseBin.propTypes = {
  data: PropTypes.array.isRequired
};

export default connect(state => state.coursebinControl, null)(CourseBin);
