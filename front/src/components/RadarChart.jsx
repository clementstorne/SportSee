import "../main.scss";

import SvgHelper from "../helpers/SvgHelper";
import PropTypes from "prop-types";
import { Component } from "react";
import * as d3 from "d3";

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
    // this.width = 268;
    this.height = 264;
    this.dataset = props.data;
    this.axis = this.dataset.map((activity, index) => {
      const angle = SvgHelper.degreesToRadians(
        90 + (360 * index) / this.dataset.length
      );
      return {
        name: activity.axis,
        angle,
        endPoint: SvgHelper.polarToCartesianCoordinates(90, angle),
        label: SvgHelper.polarToCartesianCoordinates(105, angle),
      };
    });
  }

  componentDidMount() {
    /**
     * Deletes the chart if it already exists.
     * */
    d3.select("#radarchart svg").remove();

    /**
     * Creates the SVG container.
     */
    const svg = SvgHelper.createSvg(
      "#radarchart",
      this.width,
      this.height,
      "#282d30",
      5
    );

    /**
     * Creates the scale.
     */
    const xMax = d3.max(this.dataset, (d) => d.value);
    const xScale = d3.scaleLinear().domain([0, xMax]).rangeRound([0, 90]);

    /**
     * Creates the axis.
     */
    const chartAxis = svg
      .append("g")
      .attr("class", "radarchart-axis")
      .attr(
        "transform",
        "translate(" + this.width / 2 + "," + this.height / 2 + ")"
      );
    chartAxis
      .selectAll(".radarchart-axis")
      .data(this.axis)
      .enter()
      .append("line")
      .attr("stroke", "#fff")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", (d) => d.endPoint.x)
      .attr("y2", (d) => d.endPoint.y);

    const chartAxisLabels = svg.append("g").attr("class", "radarchart-title");
    SvgHelper.drawText(
      chartAxisLabels,
      115,
      35,
      "Force",
      "radarchart-title",
      "#fff"
    );
    SvgHelper.drawText(
      chartAxisLabels,
      212,
      85,
      "Vitesse",
      "radarchart-title",
      "#fff"
    );
    SvgHelper.drawText(
      chartAxisLabels,
      212,
      185,
      "Intensité",
      "radarchart-title",
      "#fff"
    );
    SvgHelper.drawText(
      chartAxisLabels,
      112,
      238,
      "Cardio",
      "radarchart-title",
      "#fff"
    );
    SvgHelper.drawText(
      chartAxisLabels,
      8,
      185,
      "Énergie",
      "radarchart-title",
      "#fff"
    );
    SvgHelper.drawText(
      chartAxisLabels,
      -7,
      85,
      "Endurance",
      "radarchart-title",
      "#fff"
    );

    let line = d3
      .line()
      .x((d) => d.x)
      .y((d) => d.y);

    /**
     * Creates the grid.
     */
    const chartGrid = svg
      .append("g")
      .attr("class", "radarchart-grid")
      .attr(
        "transform",
        "translate(" + this.width / 2 + "," + this.height / 2 + ")"
      );
    [180, 135, 90, 45, 22].forEach((diameter) => {
      const gridCoordinates = [];
      this.axis.forEach((axis) => {
        const coordinates = SvgHelper.polarToCartesianCoordinates(
          diameter / 2,
          axis.angle
        );
        gridCoordinates.push(coordinates);
      });
      gridCoordinates.push(gridCoordinates[0]);
      chartGrid
        .append("path")
        .attr("d", line(gridCoordinates))
        .attr("stroke", "#fff")
        .attr("fill", "transparent");
    });

    /**
     * Creates the area.
     */
    const pathCoordinates = [];
    this.dataset.forEach((data) => {
      const label = this.axis.find((d) => d.name == data.axis);
      const coordinates = SvgHelper.polarToCartesianCoordinates(
        xScale(data.value),
        label.angle
      );
      pathCoordinates.push(coordinates);
    });

    const chartArea = svg
      .append("g")
      .attr("class", "radarchart-area")
      .attr(
        "transform",
        "translate(" + this.width / 2 + "," + this.height / 2 + ")"
      );
    chartArea
      .append("path")
      .attr("d", line(pathCoordinates))
      .attr("stroke", "transparent")
      .attr("fill", "#ff0101")
      .attr("opacity", "70%");
  }
  render() {
    <></>;
  }
}

RadarChart.propTypes = {
  data: PropTypes.array.isRequired,
};

export default RadarChart;
