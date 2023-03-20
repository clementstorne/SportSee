import "../main.scss";

import { drawText, drawCircle } from "../helpers/svg-functions";
import { Component } from "react";
import * as d3 from "d3";

export default class Progress extends Component {
  constructor(props) {
    super(props);
    this.value = props.value;
  }
  componentDidMount() {
    d3.select("#piechart svg").remove();

    const svg = d3
      .select("#piechart")
      .append("svg")
      .attr("viewBox", "0 0 258 264");

    const circle = drawCircle(svg, 129, 132, 85, "white");

    const radius = 90;
    const perimeter = Math.PI * (radius * 2);
    const strokeDasharrayValue = perimeter;
    const strokeDashoffsetValue = perimeter * (1 - this.value);
    const angle = -(90 + this.value * 360);

    const stroke = svg
      .append("circle")
      .attr("cx", "129")
      .attr("cy", "132")
      .attr("r", radius)
      .attr("fill", "transparent")
      .attr("stroke", "red")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", "10")
      .attr("stroke-dasharray", strokeDasharrayValue)
      .attr("stroke-dashoffset", strokeDashoffsetValue)
      .attr("transform", `rotate(${angle}, 129, 132) `);

    const title = drawText(svg, 30, 30, "Score", "piechart-title", "#20253a");
    const percentage = drawText(
      svg,
      108,
      110,
      `${this.value * 100} %`,
      "piechart-value",
      "#282d30"
    );
    const text1 = drawText(
      svg,
      102,
      143,
      "de votre",
      "piechart-text",
      "#74798c"
    );
    const text2 = drawText(
      svg,
      103,
      167,
      "objectif",
      "piechart-text",
      "#74798c"
    );
  }
  render() {
    return <></>;
  }
}
