/**
 * Class representing a sport session.
 */
class Session {
  /**
   * Creates a sport session.
   * @param   {!Number}  day     The day of the session. Must be an integer.
   * @param   {Number}   length  The length of the session.
   */
  constructor(day, length) {
    this.day = day;
    this.length = length;
  }
}

export default Session;
