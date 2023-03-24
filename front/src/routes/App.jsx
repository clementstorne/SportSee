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
    this.userId = 18;
    this.state = {
      loadingUser: true,
      user: {},
      loadingSession: true,
      sessionData: {},
      loadingActivity: true,
      activityData: {},
    };
  }

  componentDidMount() {
    ApiService.getUserData(this.userId).then((res) => {
      this.setState({ user: res, loadingUser: false });
    });
    ApiService.getSessionData(this.userId).then((res) => {
      this.setState({ sessionData: res, loadingSession: false });
    });
    ApiService.getActivityData(this.userId).then((res) => {
      this.setState({ activityData: res, loadingActivity: false });
    });
  }

  render() {
    // console.log(this.state.activityData);
    return this.state.loadingUser === false &&
      this.state.loadingSession === false ? (
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
              <BarChart />
            </div>
            <div id="linechart">
              <LineChart data={this.state.sessionData} />
            </div>
            <div id="radarchart">
              <RadarChart />
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
      <></>
    );
  }
}

export default App;
