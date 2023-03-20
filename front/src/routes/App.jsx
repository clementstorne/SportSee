import "../main.scss";

import Navbar from "../components/Navbar";
import VerticalNavbar from "../components/VerticalNavbar";
import ColumnChart from "../components/ColumnChart";
import LineChart from "../components/LineChart";
import Radar from "../components/Radar";
import PieChart from "../components/PieChart";
import NutritionalValue from "../components/NutritionalValue";

export default function App() {
  return (
    <>
      <header>
        <Navbar />
        <VerticalNavbar />
      </header>
      <main>
        <header>
          <h1 className="title">
            Bonjour <span className="first-name">Thomas</span>
          </h1>
          <p className="message">
            Félicitation ! Vous avez explosé vos objectifs hier 👏
          </p>
        </header>
        <div className="grid">
          <div id="columnchart">
            <ColumnChart />
          </div>
          <div id="linechart">
            <LineChart />
          </div>
          <div id="radarchart">
            <Radar />
          </div>
          <div id="piechart">
            <PieChart value="0.12" />
          </div>
          <div className="nutritional-value-column">
            <NutritionalValue title="Calories" value="1,930" />
            <NutritionalValue title="Protéines" value="155" />
            <NutritionalValue title="Glucides" value="290" />
            <NutritionalValue title="Lipides" value="50" />
          </div>
        </div>
      </main>
    </>
  );
}
