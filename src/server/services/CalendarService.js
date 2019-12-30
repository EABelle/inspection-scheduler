
const {
  pick, isEmpty, unset, mapKeys, uniq, flatten,
} = require('lodash');
const {
  formatDate, matchDate, buildDate, transformDateString,
} = require('../utils/formatDate');

const InspectorService = require('./inspectorService');

const InspectionService = require('./InspectionService');

class CalendarService {
  static formatDays(dateFrom) {
    let days = {};
    for (let day = 0; day <= 5; day++) {
      const currentDate = new Date(dateFrom);
      currentDate.setDate(dateFrom.getDate() + day);
      const formattedDate = formatDate(currentDate);
      days = {
        ...days,
        [formattedDate]: {
          inspectors: {},
        },
      };
    }
    return days;
  }

  static fillWithInspectors(days, dateFrom, inspectors, onlyAvailableDays) {
    for (let day = 0; day <= 5; day++) {
      const currentDate = new Date(dateFrom);
      currentDate.setDate(dateFrom.getDate() + day);
      const formattedDate = formatDate(currentDate);
      const dayOfTheWeek = currentDate.getDay();
      inspectors.forEach((inspector) => {
        inspector = inspector.toJSON();
        if (
          (
            (onlyAvailableDays
                        && !inspector.daysNotAble.find((date) => matchDate(formatDate(date), formattedDate)))
                        || !onlyAvailableDays
          )
                    && inspector.times.find((dayData) => (dayData.day === dayOfTheWeek))
        ) {
          days[formattedDate].inspectors[inspector._id] = {
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
    }
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
      const dayIndex = days[formattedDate];
      if (dayIndex && dayIndex.inspectors && dayIndex.inspectors[inspectorId]) {
        if (dayIndex.inspectors[inspectorId].daysNotAble) {
          unset(dayIndex.inspectors, inspectorId);
        } else if (!dayIndex.inspectors[inspectorId].daysUnlimited) {
          dayIndex.inspectors[inspectorId].maximumPerDay--;
          if (dayIndex.inspectors[inspectorId].maximumPerDay <= 0) {
            unset(dayIndex.inspectors, inspectorId);
          }
        }
      }
    });
  }

  static countAvailability(days, inspections) {
    inspections.forEach(({ date, inspector_id }) => {
      const formattedDate = [date.getDate(), date.getMonth(), date.getFullYear()].join('|');
      const dayIndex = days[formattedDate];
      if (dayIndex && dayIndex.inspectors && dayIndex.inspectors[inspector_id]) {
        if (!dayIndex.inspectors[inspector_id].daysUnlimited) {
          dayIndex.inspectors[inspector_id].maximumPerDay--;
        }
      }
    });
  }

  static deleteDaysWithNoInspectors(days) {
    for (const prop in days) {
      if (isEmpty(days[prop].inspectors)) {
        unset(days, prop);
      }
    }
  }

  static formatMonths(days) {
    return mapKeys(days, (dayValue, dayKey) => {
      const newKey = dayKey.split('|');
      newKey[1]++;
      return newKey.join('|');
    });
  }

  static getCalendar(inspectors, inspections) {
    return new Promise((resolve) => {
      const dateFrom = new Date();
      const days = this.formatDays(dateFrom);
      this.fillWithInspectors(days, dateFrom, inspectors, true);
      this.deleteUnavailableInspectors(days, inspections);
      this.deleteDaysWithNoInspectors(days);
      resolve(this.formatMonths(days));
    });
  }

  static getCalendarAllAvailabilities(inspectors, inspections) {
    return new Promise((resolve) => {
      const dateFrom = new Date();
      const days = this.formatDays(dateFrom);
      this.fillWithInspectors(days, dateFrom, inspectors);
      this.countAvailability(days, inspections);
      resolve(this.formatMonths(days));
    });
  }

  static find(inspectorFilter) {
    return new Promise((resolve, reject) => {
      InspectorService.find(inspectorFilter.filterData())
        .then((inspectors) => InspectionService.getInspectionsFromInspectors(inspectors))
        .then(([inspectors, inspections]) => this.getCalendar(inspectors, inspections))
        .then(resolve)
        .catch(reject);
    });
  }

  static findDays(inspectorFilter) {
    return new Promise((resolve, reject) => {
      InspectorService.find(inspectorFilter.filterData())
        .then((inspectors) => InspectionService.getInspectionsFromInspectors(inspectors))
        .then(([inspectors, inspections]) => this.getCalendar(inspectors, inspections))
        .then((calendar) => this.getHours(calendar))
        .then((days) => days.reduce((acc, x) => {
          for (const key in x) acc[key] = x[key];
          return acc;
        }, {}))
        .then(resolve)
        .catch(reject);
    });
  }

  static findByIgnoreAvailability(inspectorFilter) {
    return new Promise((resolve, reject) => {
      InspectorService.find(inspectorFilter.filterData())
        .then((inspectors) => InspectionService.getInspectionsFromInspectors(inspectors))
        .then(([inspectors, inspections]) => this.getCalendarAllAvailabilities(inspectors, inspections))
        .then(resolve)
        .catch(reject);
    });
  }
}

module.exports = CalendarService;
