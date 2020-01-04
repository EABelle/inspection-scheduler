function formatDate(date) {
  return [
    date.getDate(),
    date.getMonth(),
    date.getFullYear(),
  ].join('|');
}

function matchDate(date1, date2) {
  return date1 === date2;
}

function transformDateString(pipeString) {
  const [day, month, year] = pipeString.split('|').map((v) => (parseInt(v, 10)));
  return `${day}|${month - 1}|${year}`;
}

function buildDate(pipeString, hours) {
  const [day, month, year] = pipeString.split('|').map((v) => (parseInt(v, 10)));
  const date = new Date();
  date.setDate(day);
  date.setMonth(month - 1);
  date.setFullYear(year);
  date.setHours(hours || 0, 0, 0, 0);
  return date;
}
/*
function addDays(date, days) {
  const [day, month, year] = date.split('|');
  return [parseInt(day, 10) + parseInt(days, 10), month, year].join('|');
}
*/

function addDays(date, days) {
  const newDate = new Date(date.valueOf());
  newDate.setDate(date.getDate() + days);
  return newDate;
}

module.exports = {
  formatDate, matchDate, transformDateString, buildDate, addDays,
};
