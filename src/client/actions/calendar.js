import qs from 'qs';
import { get } from '../api';
import { FETCH_CALENDAR, SET_DEFAULT_CALENDAR } from './index';

export function loadCalendarSuccess(calendar) {
  return {
    type: FETCH_CALENDAR,
    payload: calendar,
  };
}

export function loadCalendarFail() {
  return {
    type: SET_DEFAULT_CALENDAR,
  };
}

export function fetchCalendar(filters) {
  return (dispatch) => {
    let url = '/calendar';
    if (!filters || (filters && !filters.onlyAvailableInspectors)) {
      url += '/allAvailabilities';
    }
    const query = filters ? `?${qs.stringify(filters)}` : '';
    return get(`${url}${query}`)
      .then((response) => dispatch(loadCalendarSuccess(response.data.data)))
      .catch((err) => {
        alert(err);
        return dispatch(loadCalendarFail());
      });
  };
}
