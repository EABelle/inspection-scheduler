
const { formatDate, transformDateString } = require('./formatDate');

const validKey = (object) => object !== null && object !== undefined;

const isValidDate = (pipeDateString) => {
  const currentDate = new Date();
  const dates = [];
  for (let i = 1; i <= 5; i++) {
    const calendarDate = new Date();
    calendarDate.setDate(currentDate.getDate() + i);
    dates.push(formatDate(calendarDate));
  }
  if (!dates.find((date) => (date === transformDateString(pipeDateString)))) {
    return false;
  }
  return true;
};

module.exports = {
  validKey,
  isValidDate,
};
