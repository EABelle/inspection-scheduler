import { get } from '../api'
import qs from 'qs'
import { FETCH_INSPECTORS, SET_DEFAULT_INSPECTORS } from './index'

export function loadInspectorsSuccess(inspectors) {
  return {
        type: FETCH_INSPECTORS,
        payload: inspectors
    };
}

export function loadInspectorsFail() {  
  return {
        type: SET_DEFAULT_INSPECTORS,
  };
}

export function fetchInspectors(filters) {

  return (dispatch) => {
    const query = filters ? `?${qs.stringify(filters)}` : ''
    return get(`/api/inspectors${query}`)
    .then(response => dispatch(loadInspectorsSuccess(response.data.data)))
    .catch(err => {
      alert(err)
      return dispatch(loadInspectorsFail())
    });
  }
}
