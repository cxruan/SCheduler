import { combineReducers } from 'redux';
import tabsControl from './tabsControl';
import coursebinControl from './coursebinControl';
import preferenceControl from './preferenceControl';
import scheduleControl from './scheduleControl';

export default combineReducers({
  tabsControl,
  coursebinControl,
  preferenceControl,
  scheduleControl
});
