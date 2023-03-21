/**
 * Substracts one day from a date.
 * @param   {Date} originalDate The date you want to substract a day from.
 * @returns {Date}              The date with one day substracted.
 */
export function substractOneDay(originalDate) {
  let newDate = originalDate.valueOf() - 86400000;
  return new Date(newDate);
}

/**
 * Adds one day to a date.
 * @param   {Date} originalDate The date you want to add a day to.
 * @returns {Date}              The date with one day added.
 */
export function addOneDay(originalDate) {
  let newDate = originalDate.valueOf() + 86400000;
  return new Date(newDate);
}

/**
 * Adds hours to a date.
 * @param   {Date}   originalDate  The date you want to add hours to.
 * @param   {number} numberOfHours The number of hours you want to add to the date. Must be an integer.
 * @returns {Date}                 The date with the hours added.
 */
export function addHours(originalDate, numberOfHours) {
  let newDate = originalDate.valueOf() + numberOfHours * 3600000;
  return new Date(newDate);
}
