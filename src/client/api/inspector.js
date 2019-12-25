import { put } from './index';

const ENABLE = 'habilitar';
const DISABLE = 'inhabilitar';

export function setEnableProp(inspectorId, date, set = true) {
  return _forceAvailability({ inspectorId, date, set }, ENABLE);
}

export function setDisableProp(inspectorId, date, set = true) {
  return _forceAvailability({ inspectorId, date, set }, DISABLE);
}

function _forceAvailability(data, action) {
  const { inspectorId, date, set } = data;
  if (!inspectorId || !date) {
    return new Promise((resolve, reject) => reject('Missing parameters'));
  }
  const url = `inspectors/${inspectorId}`;
  const body = {
    [action]: date,
    set,
  };
  return put(url, body)
    .then((response) => Promise.resolve(response.data))
    .catch((err) => {
      alert(err);
      return Promise.reject(err);
    });
}
