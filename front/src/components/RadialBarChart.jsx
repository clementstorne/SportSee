import "../main.scss";

import {
  drawText,
  drawCircle,
  createSvg,
  drawCircleProgressBar,
} from "../helpers/svg-functions";
import { Component } from "react";
import * as d3 from "d3";

/**
 * Component for showing the user's progress with a radial bar chart.
 * @component
 * @extends Component
 */
class RadialBarChart extends Component {
  /**
   * Create a radial bar chart.
   * @param   {number}  width   The width of the chart.
   * @param   {number}  height  The height of the chart.
   * @param   {number}  value   The decimal value of progress.
   */
  constructor(props) {
    super(props);
    this.width = 258;
    this.height = 264;
    this.value = props.value;
  }
  componentDidMount() {
    /**
     * Delete the chart if it already exists.
     * */
    d3.select("#radialbarchart svg").remove();

    /**
     * Create the SVG container.@
     */
    const svg = createSvg("#radialbarchart", this.width, this.height);

    /**
     * Create the circle width the circle progress bar.
     */
    const radialbarchart = svg.append("g").attr("class", "radialbarchart");
    drawCircle(radialbarchart, 129, 132, 85, "white");
    drawCircleProgressBar(radialbarchart, 129, 132, 90, 10, this.value, "#f00");

    /**
     * Creates the title of the chart.
     */
    const title = svg.append("g").attr("class", "radialbarchart-title");
    drawText(svg, 30, 30, "Score", "radialbarchart-title", "#20253a");

    /**
     * Create the text inside the chart.
     */
    const texts = svg.append("g").attr("class", "radialbarchart-text");
    drawText(
      texts,
      108,
      110,
      `${this.value * 100} %`,
      "radialbarchart-value",
      "#282d30"
    );
    drawText(texts, 102, 143, "de votre", "radialbarchart-text", "#74798c");
    drawText(texts, 103, 167, "objectif", "radialbarchart-text", "#74798c");
  }
  render() {
    return <></>;
  }
}

export default RadialBarChart;
