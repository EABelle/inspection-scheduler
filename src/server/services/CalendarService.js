
const {
  pick, isEmpty, unset, uniq, flatten,
} = require('lodash');
const {
  formatDate, matchDate, buildDate, transformDateString,
} = require('../utils/formatDate');

const InspectorService = require('./InspectorService');
const InspectionService = require('./InspectionService');

class CalendarService {

  static getInspectorsByDays(dateFrom, inspectors, onlyAvailableDays) {
    const days = new Map();
    for (let day = 0; day <= 5; day++) {

      const currentDate = new Date(dateFrom);
      currentDate.setDate(dateFrom.getDate() + day);
      const dayOfTheWeek = currentDate.getDay();
      const formattedDate = formatDate(currentDate);
      const inspectorsOfTheDay = {};

      inspectors.forEach((inspector) => {
        inspector = inspector.toJSON();
        if ((
            onlyAvailableDays && !inspector.daysNotAble.find((date) => matchDate(formatDate(date), formattedDate))
            || !onlyAvailableDays
            )
            && inspector.times.find((dayData) => (dayData.day === dayOfTheWeek))
        ) {
          inspectorsOfTheDay[inspector._id] = {
            daysNotAble: !!inspector.daysNotAble.find((date) => matchDate(formatDate(date), formattedDate)),
            daysUnlimited: !!inspector.daysUnlimited.find(
              (date) => matchDate(formatDate(date), formattedDate),
            ),
            ...pick(
              inspector, ['fullName', 'maximumPerDay'],
            ),
          };
        }
      });
      days.set(formattedDate, inspectorsOfTheDay);
    }
    return days;
  }

  static getHours(calendar) {
    const dates = Object.keys(calendar);
    return Promise.all(dates.map((date) => this.getDayHours(calendar[date].inspectors, date)));
  }

  static getDayHours(inspectors, date) {
    const weekDay = buildDate(transformDateString(date)).getDay();
    return Promise.all(
      Object.keys(inspectors).map((inspectorKey) => InspectorService.get(inspectorKey)
        .then((inspector) => {
          const minHours = [];
          const inspectorDay = inspector.times.find(({ day }) => day === weekDay);
          if (!inspectorDay) {
            return [];
          }
          const hoursRange = inspectorDay.range;
          const minHour = parseInt(hoursRange.start.split(':')[0], 10);
          const maxHour = parseInt(hoursRange.end.split(':')[0], 10);
          for (let i = minHour; i <= (maxHour - 3); i++) {
            minHours.push(i);
          }
          return minHours;
        })),
    ).then((minHours) => ({
      [date]: uniq(flatten(minHours)).map((minHour) => ({ min: minHour, max: minHour + 3 })),
    }));
  }

  static deleteUnavailableInspectors(days, inspections) {
    inspections.forEach(({ date, inspectorId }) => {
      const formattedDate = [date.getDate(), date.getMonth(), date.getFullYear()].join('|');
      const inspectors = days.get(formattedDate);
      if (inspectors && inspectors[inspectorId]) {
        if (inspectors[inspectorId].daysNotAble) {
          unset(inspectors, inspectorId);
        } else if (!inspectors[inspectorId].daysUnlimited) {
          inspectors[inspectorId].maximumPerDay--;
          if (inspectors[inspectorId].maximumPerDay <= 0) {
            unset(inspectors, inspectorId);
          }
        }
        days.set(formattedDate, inspectors)
      }
    });
    return days;
  }

  static countAvailability(days, inspections) {
    inspections.forEach(({ date, inspector_id }) => {
      const formattedDate = [date.getDate(), date.getMonth(), date.getFullYear()].join('|');
      const inspectors = days.get(formattedDate);
      if (inspectors && inspectors[inspector_id]) {
        if (!inspectors[inspector_id].daysUnlimited) {
          inspectors[inspector_id].maximumPerDay--;
          days.set(formattedDate, inspectors);
        }
      }
    });
    return days;
  }

  static deleteDaysWithNoInspectors(days) {
    days.forEach((inspectors, formattedDate) => {
      if (isEmpty(inspectors)) {
        days.delete(formattedDate);
      }
    });
    return days;
  }

  static formatMonths(days) {
    const daysObj = {};
    days.forEach((dayValue, dayKey) => {
      const newKey = dayKey.split('|');
      newKey[1]++;
      daysObj[newKey.join('|')] = dayValue;
    });
    return daysObj;
  }

  static getCalendar(inspectors, inspections, onlyAvailableDays = false) {
      const dateFrom = new Date();
      let inspectorsByDays = this.getInspectorsByDays(dateFrom, inspectors, true);
      if (onlyAvailableDays) {
        inspectorsByDays = this.countAvailability(inspectorsByDays, inspections);
      } else {
        inspectorsByDays = this.deleteUnavailableInspectors(inspectorsByDays, inspections);
        inspectorsByDays = this.deleteDaysWithNoInspectors(inspectorsByDays);
      }
      return this.formatMonths(inspectorsByDays);
  }

  static async find(inspectorFilter, onlyAvailableDays = false) {
    const inspectors = await InspectorService.find(inspectorFilter.filterData());
    const inspections = await InspectionService.getByInspectors(inspectors);
    return this.getCalendar(inspectors, inspections, onlyAvailableDays);
  }

  static async findDays(inspectorFilter) {
    const inspectors = await InspectorService.find(inspectorFilter.filterData());
    const inspections = await InspectionService.getByInspectors(inspectors);
    const calendar = this.getCalendar(inspectors, inspections);
    const days = await this.getHours(calendar);
    return days.reduce((acc, x) => {
      for (const key in x) acc[key] = x[key];
      return acc;
    }, {});
  }
}

module.exports = CalendarService;
