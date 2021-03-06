import qs from 'qs';
import { get } from '../api';
import { FETCH_CALENDAR, SET_DEFAULT_CALENDAR } from './index';

export function loadCalendarSuccess(calendar) {
  return {
    type: FETCH_CALENDAR,
    payload: calendar,
  };
}

export function loadCalendarFail(err) {
  return {
    type: SET_DEFAULT_CALENDAR,
    payload: err
  };
}

export function fetchCalendar(filters) {
  return (dispatch) => {
    const url = '/calendar';
    const query = filters ? `?${qs.stringify(filters)}` : '';
    return get(`${url}${query}`)
      .then((response) => {
        dispatch(loadCalendarSuccess(response.data))})
      .catch((err) => dispatch(loadCalendarFail(err)));
  };
}
