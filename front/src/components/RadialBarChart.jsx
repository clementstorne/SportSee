import "../main.scss";

import SvgHelper from "../helpers/SvgHelper";
import PropTypes from "prop-types";
import { Component } from "react";
import * as d3 from "d3";

/**
 * Component for showing the user's progress with a radial bar chart.
 * @component
 * @extends Component
 */
class RadialBarChart extends Component {
  /**
   * Creates a radial bar chart.
   * @param   {Number}  width             The width of the chart.
   * @param   {Number}  height            The height of the chart.
   * @param   {String}  progressBarColor  The color of the circle progress bar.
   * @param   {Number}  value             The decimal value of progress.
   */
  constructor(props) {
    super(props);
    this.width = 258;
    this.height = 264;
    this.progressBarColor = "#f00";
    this.value = props.value;
  }
  componentDidMount() {
    /**
     * Deletes the chart if it already exists.
     * */
    d3.select("#radialbarchart svg").remove();

    /**
     * Creates the SVG container.
     */
    const svg = SvgHelper.createSvg("#radialbarchart", this.width, this.height);

    /**
     * Creates the title of the chart.
     */
    SvgHelper.drawText(svg, 30, 30, "Score", "radialbarchart-title", "#20253a");

    /**
     * Creates the circle width the circle progress bar.
     */
    const radialbarchart = svg.append("g").attr("class", "radialbarchart");
    SvgHelper.drawCircle(radialbarchart, 129, 132, 85, "#fff");
    SvgHelper.drawCircleProgressBar(
      radialbarchart,
      129,
      132,
      90,
      10,
      this.value,
      this.progressBarColor
    );

    /**
     * Creates the text inside the chart.
     */
    const texts = svg.append("g").attr("class", "radialbarchart-text");
    SvgHelper.drawText(
      texts,
      108,
      110,
      `${this.value * 100} %`,
      "radialbarchart-value",
      "#282d30"
    );
    SvgHelper.drawText(
      texts,
      102,
      143,
      "de votre",
      "radialbarchart-text",
      "#74798c"
    );
    SvgHelper.drawText(
      texts,
      103,
      167,
      "objectif",
      "radialbarchart-text",
      "#74798c"
    );
  }
  render() {
    return <></>;
  }
}

RadialBarChart.propTypes = {
  value: PropTypes.number.isRequired,
};

export default RadialBarChart;
