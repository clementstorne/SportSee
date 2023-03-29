import Activity from "./Activity";

/**
 * Class representing the user's performances.
 */
class ActivityData {
  /**
   * Creates the user's performances data.
   * @param   {Array}     data                    The data array fetched from API.
   * @param   {!Number}   data.userId             The user's id.
   * @param   {Object[]}  data.sessions           The user's data.
   * @param   {!Number}   data.sessions.day       The date of the data.
   * @param   {!Number}   data.sessions.kilogram  The user's weight.
   * @param   {Number}    data.sessions.calories  The amount of calories burnt by the user.
   */

  constructor(data) {
    this.activities = data.sessions.map((session) => new Activity(session));
  }
}

export default ActivityData;
