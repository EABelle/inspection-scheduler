import qs from 'qs';
import { get } from '../api';
import { FETCH_INSPECTORS, SET_DEFAULT_INSPECTORS } from './index';

export function loadInspectorsSuccess(inspectors) {
  return {
    type: FETCH_INSPECTORS,
    payload: inspectors,
  };
}

export function loadInspectorsFail(err) {
  return {
    type: SET_DEFAULT_INSPECTORS,
    payload: err
  };
}

export function fetchInspectors(filters) {
  return (dispatch) => {
    const query = filters ? `?${qs.stringify(filters)}` : '';
    return get(`/inspectors${query}`)
      .then((response) => dispatch(loadInspectorsSuccess(response.data)))
      .catch((err) => dispatch(loadInspectorsFail(err)));
  };
}
