import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Checkbox, TextField, Button, Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import axios from 'axios';

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

function CustomedToolbar({ setLoading, addNewCourse }) {
  const classes = useStyles();
  const [values, setValues] = React.useState({ termID: '20201', courseID: '' });
  const [errorText, setErrorText] = React.useState('');

  function handleValueChange(event) {
    const { name, value } = event.target;
    setValues(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  async function handleAddNewCourse() {
    setLoading(true);
    axios
      .get('/api/AddCourseBin', {
        params: {
          termID: values.termID,
          courseID: values.courseID
        }
      })
      .then(function(response) {
        addNewCourse(response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <Box p={2} display="flex" alignItems="center">
      <Box flexGrow={1}>
        <Typography variant="h6">Course Bin</Typography>
      </Box>
      <Box>
        <TextField
          name="termID"
          value={values.termID}
          onChange={handleValueChange}
          className={classes.textField}
          label="Term Code"
          margin="normal"
        />
        <TextField
          name="courseID"
          value={values.courseID}
          onChange={handleValueChange}
          className={classes.textField}
          label="Course Name"
          margin="normal"
          error={Boolean(errorText) }
          helperText={errorText}
        />
      </Box>
      <Box>
        <Button variant="contained" size="large" color="primary" onClick={handleAddNewCourse}>
          Add
        </Button>
      </Box>
    </Box>
  );
}

const mapDispatchToProps = dispatch => ({
  addNewCourse: newCourse => dispatch({ type: 'ADD_COURSE', newCourse })
});

function CourseBin({ data, addNewCourse }) {
  const [loading, setLoading] = React.useState(false);

  return (
    <MaterialTable
      isLoading={loading}
      data={data}
      columns={[
        { title: 'Name', field: 'id' },
        { title: 'Type', field: 'class_type' },
        {
          title: 'Penalized',
          field: 'penalized',
          render: rowData => (
            <Checkbox style={{ padding: 0 }} color="default" checked={rowData.penalized} />
          )
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
        Toolbar: () => <CustomedToolbar setLoading={setLoading} addNewCourse={addNewCourse} />
      }}
    />
  );
}

CourseBin.propTypes = {
  data: PropTypes.array.isRequired,
  addNewCourse: PropTypes.func.isRequired
};

export default connect(state => state.coursebinControl, mapDispatchToProps)(CourseBin);
