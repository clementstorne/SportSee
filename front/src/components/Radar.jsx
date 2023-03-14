import "../main.scss";

import { Component } from "react";
import * as d3 from "d3";

/**
 * Appends an hexagon to the parent with center coordinates (xCenter,yCenter) and diameter.
 * @param {*} parent
 * @param {Number} xCenter
 * @param {Number} yCenter
 * @param {Number} diameter
 * @returns
 */
function drawHexagon(parent, xCenter, yCenter, diameter) {
  const radius = diameter / 2;
  let xA, xB, xC, xD, xE, xF, yA, yB, yC, yD, yE, yF;
  [xA, yA] = [0, radius];
  [xB, yB] = [(radius * Math.sqrt(3)) / 2, radius * 0.5];
  [xC, yC] = [(radius * Math.sqrt(3)) / 2, -radius * 0.5];
  [xD, yD] = [0, -radius];
  [xE, yE] = [(-radius * Math.sqrt(3)) / 2, -radius * 0.5];
  [xF, yF] = [(-radius * Math.sqrt(3)) / 2, radius * 0.5];

  return parent
    .append("polygon")
    .attr(
      "points",
      `${xA},${yA} ${xB},${yB} ${xC},${yC} ${xD},${yD} ${xE},${yE} ${xF},${yF}`
    )
    .attr("fill", "transparent")
    .attr("stroke", "white")
    .attr("stroke-width", "1")
    .attr("transform", `translate(${xCenter},${yCenter})`);
}

function drawText(parent, x, y, content, textClass, textColor = "#000") {
  return parent
    .append("text")
    .text(content)
    .attr("x", x)
    .attr("y", y)
    .attr("fill", textColor)
    .attr("class", textClass);
}

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
    const svg = d3
      .select(".radar-container")
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
