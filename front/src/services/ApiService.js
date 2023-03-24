import User from "../models/User";
import SessionData from "../models/SessionData";
import ActivityData from "../models/ActivityData";

class ApiService {
  static url = `http://localhost:3000/user/`;

  static getUserData = async (userId) => {
    return fetch(ApiService.url + userId)
      .then((res) => res.json())
      .then(({ data }) => new User(data));
  };

  static getSessionData = async (userId) => {
    return fetch(ApiService.url + userId + "/average-sessions")
      .then((res) => res.json())
      .then(({ data }) => new SessionData(data));
  };

  static getActivityData = async (userId) => {
    return fetch(ApiService.url + userId + "/performance")
      .then((res) => res.json())
      .then(({ data }) => new ActivityData(data));
  };
}

export default ApiService;
