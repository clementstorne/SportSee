/**
 * Class representing an activity.
 */
class Activity {
  /**
   * Creates an activity.
   * @param   {String}   day       The day of the activity.
   * @param   {!Number}  kilogram  The user's weight.
   * @param   {Number}   calories  The amount of calories burnt by the user.
   */
  constructor(data) {
    this.day = new Date(data.day);
    this.kilogram = data.kilogram;
    this.calories = data.calories;
  }
}

export default Activity;
