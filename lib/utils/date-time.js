'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dayAbbreviation = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
var dayList = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var monthLongList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function DateTimeFormat(locale, options) {
  "production" !== "production" ? (0, _warning2.default)(locale === 'en-US', 'Wrong usage of DateTimeFormat.\n    The ' + locale + ' locale is not supported.') : undefined;

  this.format = function (date) {
    var output = undefined;

    if (options.month === 'short' && options.weekday === 'short' && options.day === '2-digit') {
      output = dayList[date.getDay()] + ', ' + monthList[date.getMonth()] + ' ' + date.getDate();
    } else if (options.month === 'long' && options.year === 'numeric') {
      output = monthLongList[date.getMonth()] + ' ' + date.getFullYear();
    } else if (options.weekday === 'narrow') {
      output = dayAbbreviation[date.getDay()];
    } else {
      "production" !== "production" ? (0, _warning2.default)(false, 'Wrong usage of DateTimeFormat') : undefined;
    }

    return output;
  };
}

exports.default = {
  DateTimeFormat: DateTimeFormat,

  addDays: function addDays(d, days) {
    var newDate = this.clone(d);
    newDate.setDate(d.getDate() + days);
    return newDate;
  },
  addMonths: function addMonths(d, months) {
    var newDate = this.clone(d);
    newDate.setMonth(d.getMonth() + months);
    return newDate;
  },
  addYears: function addYears(d, years) {
    var newDate = this.clone(d);
    newDate.setFullYear(d.getFullYear() + years);
    return newDate;
  },
  addHours: function addHours(d, hours) {
    var newDate = this.clone(d);
    newDate.setHours(d.getHours() + hours);
    return newDate;
  },
  addMinutes: function addMinutes(d, minutes) {
    var newDate = this.clone(d);
    newDate.setMinutes(d.getMinutes() + minutes);
    return newDate;
  },
  addSeconds: function addSeconds(d, seconds) {
    var newDate = this.clone(d);
    newDate.setSeconds(d.getMinutes() + seconds);
    return newDate;
  },
  clone: function clone(d) {
    return new Date(d.getTime());
  },
  cloneAsDate: function cloneAsDate(d) {
    var clonedDate = this.clone(d);
    clonedDate.setHours(0, 0, 0, 0);
    return clonedDate;
  },
  getDaysInMonth: function getDaysInMonth(d) {
    var resultDate = this.getFirstDayOfMonth(d);

    resultDate.setMonth(resultDate.getMonth() + 1);
    resultDate.setDate(resultDate.getDate() - 1);

    return resultDate.getDate();
  },
  getFirstDayOfMonth: function getFirstDayOfMonth(d) {
    return new Date(d.getFullYear(), d.getMonth(), 1);
  },
  getFirstDayOfWeek: function getFirstDayOfWeek() {
    var now = new Date();
    return new Date(now.setDate(now.getDate() - now.getDay()));
  },
  getWeekArray: function getWeekArray(d, firstDayOfWeek) {
    var dayArray = [];
    var daysInMonth = this.getDaysInMonth(d);
    var weekArray = [];
    var week = [];

    for (var i = 1; i <= daysInMonth; i++) {
      dayArray.push(new Date(d.getFullYear(), d.getMonth(), i));
    }

    var addWeek = function addWeek(week) {
      var emptyDays = 7 - week.length;
      for (var i = 0; i < emptyDays; ++i) {
        week[weekArray.length ? 'push' : 'unshift'](null);
      }
      weekArray.push(week);
    };

    dayArray.forEach(function (day) {
      if (week.length > 0 && day.getDay() === firstDayOfWeek) {
        addWeek(week);
        week = [];
      }
      week.push(day);
      if (dayArray.indexOf(day) === dayArray.length - 1) {
        addWeek(week);
      }
    });

    return weekArray;
  },
  localizedWeekday: function localizedWeekday(DateTimeFormat, locale, day, firstDayOfWeek) {
    var weekdayFormatter = new DateTimeFormat(locale, { weekday: 'narrow' });
    var firstDayDate = this.getFirstDayOfWeek();

    return weekdayFormatter.format(this.addDays(firstDayDate, day + firstDayOfWeek));
  },


  // Convert date to ISO8601 (YYYY-MM-DD) date string, accounting for current timezone
  format: function format(date) {
    return new Date(date.toDateString() + ' 12:00:00 +0000').toISOString().substring(0, 10);
  },


  /**
   * formatTime, extracted from date-picker/date-picker.
   *
   * @param date [Date] A Date object.
   * @param format [String] One of 'ampm', '24hr', defaults to 'ampm'.
   * @param pedantic [Boolean] Check time-picker/time-picker.jsx file.
   *
   * @return String A string representing the formatted time.
   */
  formatTime: function formatTime(date) {
    var format = arguments.length <= 1 || arguments[1] === undefined ? 'ampm' : arguments[1];
    var pedantic = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

    if (!date) return '';
    var hours = date.getHours();
    var mins = date.getMinutes().toString();

    if (format === 'ampm') {
      var isAM = hours < 12;
      hours = hours % 12;
      var additional = isAM ? ' am' : ' pm';
      hours = (hours || 12).toString();

      if (mins.length < 2) mins = '0' + mins;

      if (pedantic) {
        // Treat midday/midnight specially http://www.nist.gov/pml/div688/times.cfm
        if (hours === '12' && mins === '00') {
          return additional === ' pm' ? '12 noon' : '12 midnight';
        }
      }

      return hours + (mins === '00' ? '' : ':' + mins) + additional;
    }

    hours = hours.toString();

    if (hours.length < 2) hours = '0' + hours;
    if (mins.length < 2) mins = '0' + mins;

    return hours + ':' + mins;
  },
  isEqualDate: function isEqualDate(d1, d2) {
    return d1 && d2 && d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
  },
  isBeforeDate: function isBeforeDate(d1, d2) {
    var date1 = this.cloneAsDate(d1);
    var date2 = this.cloneAsDate(d2);

    return date1.getTime() < date2.getTime();
  },
  isAfterDate: function isAfterDate(d1, d2) {
    var date1 = this.cloneAsDate(d1);
    var date2 = this.cloneAsDate(d2);

    return date1.getTime() > date2.getTime();
  },
  isBetweenDates: function isBetweenDates(dateToCheck, startDate, endDate) {
    return !this.isBeforeDate(dateToCheck, startDate) && !this.isAfterDate(dateToCheck, endDate);
  },
  isDateObject: function isDateObject(d) {
    return d instanceof Date;
  },
  monthDiff: function monthDiff(d1, d2) {
    var m = undefined;
    m = (d1.getFullYear() - d2.getFullYear()) * 12;
    m += d1.getMonth();
    m -= d2.getMonth();
    return m;
  },
  yearDiff: function yearDiff(d1, d2) {
    return ~ ~(this.monthDiff(d1, d2) / 12);
  }
};
module.exports = exports['default'];