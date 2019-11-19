function formatDate(date) {
    return [
        date.getDate(),
        date.getMonth(),
        date.getFullYear()
    ].join('|');
}

function matchDate(date1, date2) {
    return date1 == date2
}

function transformDateString(pipeString) {
    const [ day, month, year ] = pipeString.split('|').map(v => (parseInt(v)));
    return `${day}|${month-1}|${year}`
}

function buildDate(pipeString, hours) {
    const [ day, month, year ] = pipeString.split('|').map(v => (parseInt(v)));
    let date = new Date();
    date.setDate(day);
    date.setMonth(month);
    date.setFullYear(year);
    date.setHours(hours ? hours : 0, 0, 0)
    return date;
}

function addDays(date, days) {
    let [day, month, year] = date.split('|');
    return [parseInt(day)+parseInt(days), month, year].join('|')
}

module.exports = { formatDate, matchDate, transformDateString, buildDate, addDays };