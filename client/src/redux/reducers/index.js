import { combineReducers } from 'redux';
import tabsControl from './tabsControl';
import coursebinControl from './coursebinControl';
import preferenceControl from './preferenceControl';

export default combineReducers({ tabsControl, coursebinControl, preferenceControl });
