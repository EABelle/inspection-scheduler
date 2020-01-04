import {delete_, post} from './index';

const ENABLE = 'daysUnlimited';
const DISABLE = 'daysNotAble';

export function setEnableProp(inspectorId, date) {
  return _forceAvailability({ inspectorId, date }, ENABLE);
}

export function setDisableProp(inspectorId, date) {
  return _forceAvailability({ inspectorId, date }, DISABLE);
}

export function restoreCustomDate(inspectorId, date) {
  const url = `inspectors/${inspectorId}/customDate/${date}`;
  return delete_(url)
      .then((response) => Promise.resolve(response.data))
      .catch(Promise.reject);
}

function _forceAvailability(data, action) {
  const { inspectorId, date } = data;
  if (!inspectorId || !date) {
    Promise.reject('Missing parameters');
  }
  const url = action === ENABLE
      ? `inspectors/${inspectorId}/availableDate`
      : `inspectors/${inspectorId}/unavailableDate`;
  const body = { date };
  return post(url, body)
    .then((response) => Promise.resolve(response.data))
    .catch(Promise.reject);
}
