/**
 * Class representing an activity.
 */
class Activity {
  /**
   * Creates an activity.
   * @param   {String}  kind   The label of the activity.
   * @param   {Number}  value  The value of the activity.
   */
  constructor(kind, value) {
    this.axis = kind;
    this.value = value;
  }
}

export default Activity;
