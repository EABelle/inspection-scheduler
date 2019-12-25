
const {
  pick, isEmpty, unset, mapKeys, uniq, flatten,
} = require('lodash');
const {
  formatDate, matchDate, buildDate, transformDateString,
} = require('../utils/formatDate');

const InspectorService = require('./inspectorService');

const InspectionService = require('./InspectionService');

class CalendarService {
  static formatDays(fromFecha) {
    let days = {};
    for (let day = 0; day <= 5; day++) {
      const currentFecha = new Date(fromFecha);
      currentFecha.setDate(fromFecha.getDate() + day);
      const formattedDate = formatDate(currentFecha);
      days = {
        ...days,
        [formattedDate]: {
          inspectors: {},
        },
      };
    }
    return days;
  }

  static fillWithInspectors(days, fromFecha, inspectors, onlyAvailables) {
    for (let day = 0; day <= 5; day++) {
      const currentFecha = new Date(fromFecha);
      currentFecha.setDate(fromFecha.getDate() + day);
      const formattedDate = formatDate(currentFecha);
      const dayOfTheWeek = currentFecha.getDay();
      inspectors.forEach((inspector) => {
        inspector = inspector.toJSON();
        if (
          (
            (onlyAvailables
                        && !inspector.inhabilitar.find((fecha) => matchDate(formatDate(fecha), formattedDate)))
                        || !onlyAvailables
          )
                    && inspector.horarios.find((dayData) => (dayData.dia === dayOfTheWeek))
        ) {
          days[formattedDate].inspectors[inspector._id] = {
            inhabilitar: !!inspector.inhabilitar.find((fecha) => matchDate(formatDate(fecha), formattedDate)),
            habilitar: !!inspector.habilitar.find(
              (fecha) => matchDate(formatDate(fecha), formattedDate),
            ),
            ...pick(
              inspector, ['nombre_apellido', 'maximo'],
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
          const inspectorDay = inspector.horarios.find(({ dia }) => dia === weekDay);
          if (!inspectorDay) {
            return [];
          }
          const hoursRange = inspectorDay.rango;
          const minHour = parseInt(hoursRange.inicio.split(':')[0], 10);
          const maxHour = parseInt(hoursRange.fin.split(':')[0], 10);
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
    inspections.forEach(({ fecha, inspector_id }) => {
      const formattedDate = [fecha.getDate(), fecha.getMonth(), fecha.getFullYear()].join('|');
      const dayIndex = days[formattedDate];
      if (dayIndex && dayIndex.inspectors && dayIndex.inspectors[inspector_id]) {
        if (dayIndex.inspectors[inspector_id].inhabilitar) {
          unset(dayIndex.inspectors, inspector_id);
        } else if (!dayIndex.inspectors[inspector_id].habilitar) {
          dayIndex.inspectors[inspector_id].maximo--;
          if (dayIndex.inspectors[inspector_id].maximo <= 0) {
            unset(dayIndex.inspectors, inspector_id);
          }
        }
      }
    });
  }

  static countAvailability(days, inspections) {
    inspections.forEach(({ fecha, inspector_id }) => {
      const formattedDate = [fecha.getDate(), fecha.getMonth(), fecha.getFullYear()].join('|');
      const dayIndex = days[formattedDate];
      if (dayIndex && dayIndex.inspectors && dayIndex.inspectors[inspector_id]) {
        if (!dayIndex.inspectors[inspector_id].habilitar) {
          dayIndex.inspectors[inspector_id].maximo--;
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
      const fromFecha = new Date();
      const days = this.formatDays(fromFecha);
      this.fillWithInspectors(days, fromFecha, inspectors, true);
      this.deleteUnavailableInspectors(days, inspections);
      this.deleteDaysWithNoInspectors(days);
      resolve(this.formatMonths(days));
    });
  }

  static getCalendarAllAvailabilities(inspectors, inspections) {
    return new Promise((resolve) => {
      const fromFecha = new Date();
      const days = this.formatDays(fromFecha);
      this.fillWithInspectors(days, fromFecha, inspectors);
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
