import "../main.scss";

import { drawText, drawHexagon, createSvg } from "../helpers/svg-functions";
import { Component } from "react";
import * as d3 from "d3";

/*
1: "cardio",
2: "energy",
3: "endurance",
4: "strength",
5: "speed",
6: "intensity",
*/

/**
 * Component for showing the user's type of activity with a radar chart.
 * @component
 * @extends Component
 */
class RadarChart extends Component {
  /**
   * Creates a radar chart.
   * @param   {Number}    width        The width of the chart.
   * @param   {Number}    height       The height of the chart.
   * @param   {Object[]}  dataset      The data used to draw the chart.
   */
  constructor(props) {
    super(props);
    this.width = 258;
    this.height = 264;
    this.data = [
      {
        value: 80,
        kind: 1,
      },
      {
        value: 120,
        kind: 2,
      },
      {
        value: 140,
        kind: 3,
      },
      {
        value: 50,
        kind: 4,
      },
      {
        value: 200,
        kind: 5,
      },
      {
        value: 90,
        kind: 6,
      },
    ];
  }
  componentDidMount() {
    /**
     * Deletes the chart if it already exists.
     * */
    d3.select("#radarchart svg").remove();

    /**
     * Creates the SVG container.
     */
    const svg = createSvg("#radarchart", this.width, this.height, "#282d30");

    const intensity = drawText(
      svg,
      106,
      30,
      "Intensité",
      "radarchart-title",
      "#fff"
    );
    const speed = drawText(svg, 212, 85, "Vitesse", "radarchart-title", "#fff");
    const strength = drawText(
      svg,
      212,
      191,
      "Force",
      "radarchart-title",
      "#fff"
    );
    const endurance = drawText(
      svg,
      101,
      240,
      "Endurance",
      "radarchart-title",
      "#fff"
    );
    const energy = drawText(svg, 6, 191, "Énergie", "radarchart-title", "#fff");
    const cardio = drawText(svg, 7, 85, "Cardio", "radarchart-title", "#fff");

    const polygon1 = drawHexagon(svg, 129, 132, 180);
    const polygon2 = drawHexagon(svg, 129, 132, 135);
    const polygon3 = drawHexagon(svg, 129, 132, 90);
    const polygon4 = drawHexagon(svg, 129, 132, 45);
    const polygon5 = drawHexagon(svg, 129, 132, 22, 5);
  }
  render() {
    <div className="radar"></div>;
  }
}

export default RadarChart;
