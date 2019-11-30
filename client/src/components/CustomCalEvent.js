import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Popover } from '@material-ui/core/';

const useStyles = makeStyles(theme => ({
  popover: {
    pointerEvents: 'none'
  },
  paper: {
    padding: theme.spacing(1)
  }
}));

export default function CustomCalEvent(data) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = e => {
    setAnchorEl(e.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  return (
    <div>
      <Typography
        align="center"
        variant="body2"
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        {data.title} <br /> {data.event.type}
      </Typography>
      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{
          paper: classes.paper
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography>
          Section: {data.event.ID}
          <br />
          Instructor: {data.event.instructor}
          <br />
          Location: {data.event.location}
          <br />
        </Typography>
      </Popover>
    </div>
  );
}
