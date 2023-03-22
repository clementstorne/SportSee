import * as d3 from "d3";

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
 * @param   {Number} numberOfHours The number of hours you want to add to the date. Must be an integer.
 * @returns {Date}                 The date with the hours added.
 */
export function addHours(originalDate, numberOfHours) {
  let newDate = originalDate.valueOf() + numberOfHours * 3600000;
  return new Date(newDate);
}

/**
 * Formats a date with the formatter dd/mm.
 * @param   {Date}    dateToFormat  The date you want to format.
 * @return  {String}                The date formated.
 */
export function formatDate(dateToFormat) {
  return d3.timeFormat("%d/%m")(dateToFormat);
}

/**
 * Finds the day corresponding to an x-coordinate on a chart.
 * @param   {Object[]}  dataset    The dataset used to create the chart.
 * @param   {Number}    reference  The x-coordinate on the chart.
 * @return  {Date}                 The date corresponding to the x-coordinate.
 */
export function bisectDate(dataset, reference) {
  return d3.bisector((d) => d.day).center(dataset, reference);
}
