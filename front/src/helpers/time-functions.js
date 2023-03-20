export function substractOneDay(date) {
  let newDate = date.valueOf() - 86400000;
  return new Date(newDate);
}

export function addOneDay(date) {
  let newDate = date.valueOf() + 86400000;
  return new Date(newDate);
}

export function addHours(date, hours) {
  let newDate = date.valueOf() + hours * 3600000;
  return new Date(newDate);
}
