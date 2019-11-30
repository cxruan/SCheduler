import moment from 'moment';

export function parseStateToTime(mins) {
  return moment('1880-10-06 00:00').add(mins, 'm');
}

export function parseTimeToState(day) {
  return day.diff(moment('1880-10-06 00:00'), 'm');
}
