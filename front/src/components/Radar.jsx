import "../main.scss";

import { drawText, drawHexagon } from "../helpers/svg-functions";
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

export default class Radar extends Component {
  constructor(props) {
    super(props);
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
    d3.select("#radarchart svg").remove();

    const svg = d3
      .select("#radarchart")
      .append("svg")
      .attr("fill", "#282d30")
      .attr("viewBox", "0 0 258 264");

    const intensity = drawText(
      svg,
      106,
      30,
      "Intensité",
      "radar-title",
      "white"
    );
    const speed = drawText(svg, 212, 85, "Vitesse", "radar-title", "white");
    const strength = drawText(svg, 212, 191, "Force", "radar-title", "white");
    const endurance = drawText(
      svg,
      101,
      240,
      "Endurance",
      "radar-title",
      "white"
    );
    const energy = drawText(svg, 6, 191, "Énergie", "radar-title", "white");
    const cardio = drawText(svg, 7, 85, "Cardio", "radar-title", "white");

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
