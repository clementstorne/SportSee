import Session from "./Session";

/**
 * Class representing the sessions data.
 */
class SessionData {
  /**
   * Creates the sessions data array.
   * @param   {Object}   data                        The data object fetched from API.
   * @param   {Array}    data.session                The sessions data array.
   * @param   {!Number}  data.session.day            The day of the session. Must be an integer.
   * @param   {Number}   data.session.sessionLength  The length of the session.
   */
  constructor(data) {
    this.sessions = data.sessions.map(
      (session) => new Session(session.day, session.sessionLength)
    );
  }
}

export default SessionData;
