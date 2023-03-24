import "../main.scss";

import { drawText, drawRectangle, createSvg } from "../helpers/svg-functions";
import { Component } from "react";
import * as d3 from "d3";
import { bisectDate } from "../helpers/time-functions";

/**
 * Component for showing the user's average session length with a line chart.
 * @component
 * @extends Component
 */
class LineChart extends Component {
  /**
   * Creates a line chart.
   * @param   {Number}    width        The width of the chart.
   * @param   {Number}    height       The height of the chart.
   * @param   {Object[]}  dataset      The data used to draw the chart.
   */
  constructor(props) {
    super(props);
    this.width = 258;
    this.height = 263;
    this.dataset = [
      {
        day: 1,
        length: 30,
      },
      {
        day: 2,
        length: 23,
      },
      {
        day: 3,
        length: 45,
      },
      {
        day: 4,
        length: 50,
      },
      {
        day: 5,
        length: 0,
      },
      {
        day: 6,
        length: 0,
      },
      {
        day: 7,
        length: 60,
      },
    ];
  }
  componentDidMount() {
    /**
     * Deletes the chart if it already exists.
     * */
    d3.select("#linechart svg").remove();

    /**
     * Creates the SVG container.
     */
    const svg = createSvg("#linechart", this.width, this.height, "#f00");

    /**
     * Creates the title of the chart.
     */
    const title = svg
      .append("g")
      .attr("class", "linechart-title")
      .style("opacity", "50.4%");
    drawText(title, 34, 34, "Durée moyenne des", "", "#fff");
    drawText(title, 34, 57, "sessions", "", "#fff");

    /**
     * Creates the x-axis.
     */
    const xScale = d3.scaleLinear().domain([1, 7]).range([0, 258]);
    const days = svg.append("g").style("opacity", "50.4%");
    ["L", "M", "M", "J", "V", "S", "D"].forEach((day, index) =>
      drawText(days, xScale(index + 1) - 3, 240, day, "linechart-ticks", "#fff")
    );

    /**
     * Creates the y-axis.
     */
    const minY = d3.min(this.dataset, (d) => d.length);
    const maxY = d3.max(this.dataset, (d) => d.length);
    const yScale = d3.scaleLinear().domain([maxY, minY]).range([80, 201]);

    /**
     * Creates the line.
     */
    const line = d3
      .line()
      .x((d) => xScale(d.day))
      .y((d) => yScale(d.length))
      .curve(d3.curveNatural);
    svg
      .append("path")
      .attr("d", line(this.dataset))
      .attr("fill", "none")
      .attr("stroke", "#fff")
      .attr("stroke-width", "2")
      .style("opacity", "50.4%");

    /**
     * Creates the tooltip.
     */
    const tooltip = svg
      .append("g")
      .attr("class", "linechart-tooltip")
      .style("display", "none");
    tooltip
      .append("circle")
      .attr("r", 6.5)
      .attr("stroke", "#fff")
      .attr("stroke-width", 5)
      .style("opacity", "19.83%");
    tooltip
      .append("circle")
      .attr("r", 4)
      .attr("fill", "#fff")
      .attr("stroke-width", 0);
    const tooltipBox = drawRectangle(tooltip, 4, -36, 39, 25, "#fff");
    const tooltipText = drawText(
      tooltip,
      12,
      -19,
      "",
      "linechart-tooltip-text",
      "#000"
    );
    const overlay = drawRectangle(
      tooltip,
      0,
      0,
      this.width + 10,
      this.height,
      "#000"
    );
    overlay.style("opacity", "10%");

    /**
     * Creates the tooltip event on hover.
     */
    svg
      .append("rect")
      .attr("width", this.width)
      .attr("height", this.height)
      .style("opacity", "0.01%")
      .on("mouseover", function () {
        tooltip.style("display", null);
      })
      .on("mouseout", function () {
        tooltip.style("display", "none");
      })
      .on("mousemove", (e) => {
        const x0 = xScale.invert(d3.pointer(e)[0]);
        const index = bisectDate(this.dataset, x0);
        const d = this.dataset[index];
        tooltip.attr(
          "transform",
          "translate(" + xScale(d.day) + "," + yScale(d.length) + ")"
        );
        overlay.attr("transform", "translate(0," + -yScale(d.length) + ")");
        tooltipText.html(d.length + "min");
        if (index === 6) {
          tooltipBox.attr("transform", "translate(-47,0)");
          tooltipText.attr("transform", "translate(-47,0)");
        }
        if (index === 0) {
          tooltipBox.attr("transform", "translate(4,0)");
          tooltipText.attr("transform", "translate(4,0)");
        }
      });
  }
  render() {
    return <></>;
  }
}

export default LineChart;
