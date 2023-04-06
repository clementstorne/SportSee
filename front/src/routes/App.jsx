import "../main.scss";

import Navbar from "../components/Navbar";
import VerticalNavbar from "../components/VerticalNavbar";
import BarChart from "../components/BarChart";
import LineChart from "../components/LineChart";
import RadarChart from "../components/RadarChart";
import RadialBarChart from "../components/RadialBarChart";
import NutritionalValue from "../components/NutritionalValue";

import ApiService from "../services/ApiService";

import { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingUser: true,
      user: {},
      loadingActivity: true,
      activityData: {},
      loadingSession: true,
      sessionData: {},
      loadingPerformance: true,
      performanceData: {},
    };
  }

  /**
   * Get the user's id from the url.
   */
  get userId() {
    return window.location.pathname.split("user/")[1];
  }

  componentDidMount() {
    /**
     * Get the user's data.
     */
    ApiService.getUserData(this.userId).then((res) => {
      this.setState({ user: res, loadingUser: false });
    });
    /**
     * Get the user's activity data.
     */
    ApiService.getActivityData(this.userId).then((res) => {
      this.setState({ activityData: res.activities, loadingActivity: false });
    });
    /**
     * Get the user's sessions data.
     */
    ApiService.getSessionData(this.userId).then((res) => {
      this.setState({ sessionData: res.sessions, loadingSession: false });
    });
    /**
     * Get the user performances data.
     */
    ApiService.getPerformanceData(this.userId).then((res) => {
      this.setState({
        performanceData: res.performances,
        loadingPerformance: false,
      });
    });
  }

  render() {
    return this.state.loadingUser === false ? (
      <>
        <header>
          <Navbar />
          <VerticalNavbar />
        </header>
        <main>
          <header>
            <h1 className="title">
              Bonjour{" "}
              <span className="first-name">{this.state.user.firstName}</span>
            </h1>
            <p className="message">
              Félicitation ! Vous avez explosé vos objectifs hier 👏
            </p>
          </header>
          <div className="grid">
            <div id="barchart">
              {this.state.loadingActivity === false ? (
                <BarChart data={this.state.activityData} />
              ) : (
                <p className="error-message-component error-message-dark">
                  Les données nécessaires à l'affichage de ce composant n'ont
                  pas pu être chargées.
                </p>
              )}
            </div>
            <div id="linechart">
              {this.state.loadingSession === false ? (
                <LineChart data={this.state.sessionData} />
              ) : (
                <p className="error-message-component error-message-light">
                  Les données nécessaires à l'affichage de ce composant n'ont
                  pas pu être chargées.
                </p>
              )}
            </div>
            <div id="radarchart">
              {this.state.loadingPerformance === false ? (
                <RadarChart data={this.state.performanceData} />
              ) : (
                <p className="error-message-component error-message-light">
                  Les données nécessaires à l'affichage de ce composant n'ont
                  pas pu être chargées.
                </p>
              )}
            </div>
            <div id="radialbarchart">
              <RadialBarChart value={this.state.user.score} />
            </div>
            <div className="nutritional-value-column">
              <NutritionalValue
                title="Calories"
                value={this.state.user.calorie}
              />
              <NutritionalValue
                title="Protéines"
                value={this.state.user.protein}
              />
              <NutritionalValue
                title="Glucides"
                value={this.state.user.carbs}
              />
              <NutritionalValue title="Lipides" value={this.state.user.fat} />
            </div>
          </div>
        </main>
      </>
    ) : (
      <>
        <header>
          <Navbar />
          <VerticalNavbar />
        </header>
        <main>
          <header>
            <h1 className="title">Bonjour</h1>
            <p className="error-message">
              Les données nécessaires à l'affichage de cette page n'ont pas pu
              être chargées.
            </p>
          </header>
          <div className="grid">
            <div id="barchart">
              <p className="error-message-component error-message-dark">
                Les données nécessaires à l'affichage de ce composant n'ont pas
                pu être chargées.
              </p>
            </div>
            <div id="linechart">
              <p className="error-message-component error-message-light">
                Les données nécessaires à l'affichage de ce composant n'ont pas
                pu être chargées.
              </p>
            </div>
            <div id="radarchart">
              <p className="error-message-component error-message-light">
                Les données nécessaires à l'affichage de ce composant n'ont pas
                pu être chargées.
              </p>
            </div>
            <div id="radialbarchart">
              <p className="error-message-component error-message-dark">
                Les données nécessaires à l'affichage de ce composant n'ont pas
                pu être chargées.
              </p>
            </div>
            <div className="nutritional-value-column">
              <p className="error-message-component error-message-dark nutritional-value">
                Les données nécessaires à l'affichage de ce composant n'ont pas
                pu être chargées.
              </p>
              <p className="error-message-component error-message-dark nutritional-value">
                Les données nécessaires à l'affichage de ce composant n'ont pas
                pu être chargées.
              </p>
              <p className="error-message-component error-message-dark nutritional-value">
                Les données nécessaires à l'affichage de ce composant n'ont pas
                pu être chargées.
              </p>
              <p className="error-message-component error-message-dark nutritional-value">
                Les données nécessaires à l'affichage de ce composant n'ont pas
                pu être chargées.
              </p>
            </div>
          </div>
        </main>
      </>
    );
  }
}

export default App;
