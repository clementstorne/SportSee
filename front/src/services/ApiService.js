import User from "../models/User";
import ActivityData from "../models/ActivityData";
import SessionData from "../models/SessionData";
import PerformanceData from "../models/PerformanceData";

/**
 * Service for API calls.
 */
class ApiService {
  /**
   * The URL of the API.
   */
  static url = `http://localhost:3000/user/`;

  /**
   * Fetches the user's data.
   * @param   {!Number}  userId  The user's id.
   * @return  {Object}           A User Object.
   */
  static getUserData = async (userId) => {
    return fetch(ApiService.url + userId)
      .then((res) =>
        res
          .json()
          .then(({ data }) => new User(data))
          .catch(() => console.error(res.status + " " + res.statusText))
      )
      .catch((err) => console.error(err));
  };

  /**
   * Fetches the user's activity data.
   * @param   {!Number}  userId  The user's id.
   * @return  {Object}           A ActivityData Object.
   */
  static getActivityData = async (userId) => {
    return fetch(ApiService.url + userId + "/activity")
      .then((res) =>
        res
          .json()
          .then(({ data }) => new ActivityData(data))
          .catch(() => console.error(res.status + " " + res.statusText))
      )
      .catch((err) => console.error(err));
  };

  /**
   * Fetches the user's sessions data.
   * @param   {!Number}  userId  The user's id.
   * @return  {Object}           A SessionData Object.
   */
  static getSessionData = async (userId) => {
    return fetch(ApiService.url + userId + "/average-sessions")
      .then((res) =>
        res
          .json()
          .then(({ data }) => new SessionData(data))
          .catch(() => console.error(res.status + " " + res.statusText))
      )
      .catch((err) => console.error(err));
  };

  /**
   * Fetches the user's performances data.
   * @param   {!Number}  userId  The user's id.
   * @return  {Object}           A PerformanceData Object.
   */
  static getPerformanceData = async (userId) => {
    return fetch(ApiService.url + userId + "/performance")
      .then((res) =>
        res
          .json()
          .then(({ data }) => new PerformanceData(data))
          .catch(() => console.error(res.status + " " + res.statusText))
      )
      .catch((err) => console.error(err));
  };
}

export default ApiService;
