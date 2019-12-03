import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Checkbox, TextField, Button, Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import axios from 'axios';
import { parseCourseToState } from '../utils';

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

function CustomedToolbar({ errorText, setErrorText, setLoading, addNewCourse, onClearAll }) {
  const classes = useStyles();
  const [values, setValues] = React.useState({ termID: '20201', courseID: '' });

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
      .get('/api/add-course', {
        params: {
          termID: values.termID,
          courseID: values.courseID
        }
      })
      .then(function({ data }) {
        if (data.status === 'error') {
          setErrorText(data.message);
        } else {
          setErrorText('');
          addNewCourse(parseCourseToState(data.data));
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const handleClearAll = () => {
    onClearAll();
  };

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
          error={Boolean(errorText)}
          helperText={errorText}
        />
      </Box>
      <Box>
        <Button variant="contained" size="large" color="primary" onClick={handleAddNewCourse}>
          Add
        </Button>
      </Box>
      <Box ml={1}>
        <Button variant="contained" size="large" color="primary" onClick={handleClearAll}>
          Clear
        </Button>
      </Box>
    </Box>
  );
}

CustomedToolbar.propTypes = {
  errorText: PropTypes.string.isRequired,
  setLoading: PropTypes.func.isRequired,
  setErrorText: PropTypes.func.isRequired,
  addNewCourse: PropTypes.func.isRequired,
  onClearAll: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  addNewCourse: newCourse => dispatch({ type: 'ADD_COURSE', newCourse }),
  onPenalizeChange: id => dispatch({ type: 'PENALIZE_CHANGE', id }),
  onIncludeChange: id => dispatch({ type: 'INCLUDE_CHANGE', id }),
  onClearAll: () => dispatch({ type: 'CLEAR_ALL' })
});

function CourseBin({ courses, addNewCourse, onPenalizeChange, onIncludeChange, onClearAll }) {
  const [loading, setLoading] = React.useState(false);
  const [errorText, setErrorText] = React.useState('');

  const handlePenalizeChange = event => {
    onPenalizeChange(event.target.id);
  };

  const handleIncludeChange = event => {
    onIncludeChange(event.target.id);
  };
  return (
    <MaterialTable
      isLoading={loading}
      data={courses}
      columns={[
        {
          title: 'Include',
          render: rowData => (
            <Checkbox
              id={rowData.id}
              style={{ padding: 0 }}
              checked={rowData.include}
              onChange={handleIncludeChange}
            />
          )
        },
        {
          title: 'Name',
          field: 'id'
        },
        { title: 'Type', field: 'class_type' },
        {
          title: 'Penalized',
          render: rowData => (
            <Checkbox
              id={rowData.id}
              style={{ padding: 0 }}
              color="default"
              checked={rowData.penalize}
              onChange={handlePenalizeChange}
            />
          )
        },
        { title: 'Time', field: 'time' },
        { title: 'Days', field: 'days' },
        { title: 'Instructor', field: 'instructor' },
        { title: 'Location', field: 'location' }
      ]}
      parentChildData={(row, rows) => rows.find(a => a.id === row.parentId)}
      options={{
        selection: false,
        search: false,
        sorting: false,
        showTextRowsSelected: false,
        padding: 'dense'
      }}
      components={{
        Toolbar: () => (
          <CustomedToolbar
            errorText={errorText}
            setErrorText={setErrorText}
            setLoading={setLoading}
            addNewCourse={addNewCourse}
            onClearAll={onClearAll}
          />
        )
      }}
    />
  );
}

CourseBin.propTypes = {
  courses: PropTypes.array.isRequired,
  addNewCourse: PropTypes.func.isRequired,
  onPenalizeChange: PropTypes.func.isRequired,
  onIncludeChange: PropTypes.func.isRequired,
  onClearAll: PropTypes.func.isRequired
};

export default connect(state => state.coursebinControl, mapDispatchToProps)(CourseBin);
