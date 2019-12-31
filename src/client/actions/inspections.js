import qs from 'qs';
import { FETCH_INSPECTIONS, SET_DEFAULT_INSPECTIONS } from './index';
import { get } from '../api';

export function loadInspectionsSuccess(inspections) {
  return {
    type: FETCH_INSPECTIONS,
    payload: inspections,
  };
}

export function loadInspectionsFail() {
  return {
    type: SET_DEFAULT_INSPECTIONS,
  };
}


export function fetchInspections(filters) {
  return (dispatch) => {
    const url = '/inspections';
    const query = filters ? `?${qs.stringify(filters)}` : '';
    return get(`${url}${query}`)
      .then((response) => dispatch(loadInspectionsSuccess(response.data)))
      .catch((err) => {
        alert(err);
        return dispatch(loadInspectionsFail());
      });
  };
}
