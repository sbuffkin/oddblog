const { DateTime } = require('luxon')

const readableDate = (dateObj) => {
  return DateTime.fromJSDate(dateObj, {
    zone: 'America/New_York',
  }).setLocale('en').toLocaleString(DateTime.DATE_FULL)
}

module.exports = {
  readableDate
}