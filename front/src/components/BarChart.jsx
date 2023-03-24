import "../main.scss";

import {
  drawText,
  drawLine,
  drawCircle,
  drawRectangle,
  createSvg,
} from "../helpers/svg-functions";
import {
  addHours,
  addOneDay,
  bisectDate,
  formatDate,
  substractOneDay,
} from "../helpers/time-functions";

import { Component } from "react";
import * as d3 from "d3";

/**
 * Component for showing the user's activity with a bar chart.
 * @component
 * @extends Component
 */
class BarChart extends Component {
  /**
   * Creates a bar chart.
   * @param   {Number}    width        The width of the chart.
   * @param   {Number}    height       The height of the chart.
   * @param   {String}    firstColor   The color used in the chart for the first set of data.
   * @param   {String}    secondColor  The color used in the chart for the second set of data.
   * @param   {Object[]}  dataset      The data used to draw the chart.
   */
  constructor(props) {
    super(props);
    this.width = 835;
    this.height = 320;
    this.firstColor = "#282d30";
    this.secondColor = "#e60000";
    this.dataset = [
      {
        day: "2020-07-01",
        kilogram: 80,
        calories: 240,
      },
      {
        day: "2020-07-02",
        kilogram: 80,
        calories: 220,
      },
      {
        day: "2020-07-03",
        kilogram: 81,
        calories: 280,
      },
      {
        day: "2020-07-04",
        kilogram: 81,
        calories: 290,
      },
      {
        day: "2020-07-05",
        kilogram: 80,
        calories: 160,
      },
      {
        day: "2020-07-06",
        kilogram: 78,
        calories: 162,
      },
      {
        day: "2020-07-07",
        kilogram: 76,
        calories: 390,
      },
    ];
  }
  componentDidMount() {
    /**
     * Deletes the chart if it already exists.
     * */
    d3.select("#barchart svg").remove();
    d3.selectAll(".barchart-tooltip").remove();

    /**
     * Turns the strings in data into dates.
     */
    this.dataset.forEach((d) => {
      d.day = new Date(d.day);
    });

    /**
     * Creates the SVG container.
     */
    const svg = createSvg("#barchart", this.width, this.height, "#fbfbfb");

    /**
     * Creates the title of the chart.
     */
    drawText(svg, 32, 29, "Activité quotidienne", ".barchart-title", "#20253a");

    /**
     * Creates the keys of the chart.
     */
    const keys = svg.append("g").attr("class", "barchart-key");
    drawCircle(keys, 540, 38, 4, this.firstColor);
    drawText(keys, 555, 43, "Poids (kg)", "barchart-key-title", "#74798c");
    drawCircle(keys, 654, 38, 4, this.secondColor);
    drawText(
      keys,
      670,
      43,
      "Calories brûlées (kCal)",
      "barchart-key-title",
      "#74798c"
    );

    /**
     * Creates the x-axis.
     */
    const xAxisGroup = svg.append("g").attr("transform", "translate(0,257)");
    const xMin = d3.min(this.dataset, (d) => d.day);
    const xMax = d3.max(this.dataset, (d) => d.day);
    const xEnd = addOneDay(xMax);
    const xScale = d3.scaleUtc().domain([xMin, xEnd]).rangeRound([43, 745]);
    const xAxis = d3.axisBottom(xScale).ticks(0);
    xAxisGroup.call(xAxis).attr("class", "barchart-ticks");
    svg
      .selectAll(".barchart-ticks-text")
      .data(this.dataset)
      .enter()
      .append("text")
      .attr("class", "barchart-ticks")
      .attr("x", (d, i) => 75 + 100 * i)
      .attr("y", "295")
      .attr("fill", "#9b9eac")
      .text((d) => formatDate(d.day));

    /**
     * Creates the kilogram y-axis on the left.
     */
    const yLeftAxisGroup = svg
      .append("g")
      .attr("transform", "translate(43,112)");
    const minKilogram = d3.min(this.dataset, (d) => d.kilogram);
    const maxKilogram = d3.max(this.dataset, (d) => d.kilogram);
    const yLeftScale = d3
      .scaleLinear()
      .domain([maxKilogram, minKilogram - 3])
      .range([0, 145]);
    const yLeftAxis = d3.axisLeft(yLeftScale);
    yLeftAxisGroup.call(yLeftAxis).attr("class", "barchart-ticks");
    drawText(yLeftAxisGroup, 10, -10, "kg", "barchart-ticks", "#9b9eac");

    /**
     * Creates the calories y-axis on the right.
     */
    const yRightAxisGroup = svg
      .append("g")
      .attr("transform", "translate(745,112)");
    const maxCalories = d3.max(this.dataset, (d) => d.calories);
    const yRightScale = d3
      .scaleLinear()
      .domain([maxCalories, 0])
      .range([0, 145]);
    const yRightAxis = d3.axisRight(yRightScale);
    yRightAxisGroup.call(yRightAxis).attr("class", "barchart-ticks");
    drawText(yRightAxisGroup, -10, -10, "kCal", "barchart-ticks", "#9b9eac");

    /**
     * Creates horizontal graduations.
     */
    yLeftAxisGroup
      .selectAll("y axis")
      .data(yLeftScale.ticks(8))
      .enter()
      .append("line")
      .attr("stroke", "#dedede")
      .attr("stroke-dasharray", "4,2")
      .attr("x1", 0)
      .attr("x2", 702)
      .attr("y1", (d) => yLeftScale(d))
      .attr("y2", (d) => yLeftScale(d));

    /**
     * Creates the tooltip.
     */
    const tooltip = svg
      .append("g")
      .attr("class", "barchart-tooltip")
      .style("display", "none");

    const overlay = drawRectangle(tooltip, 68, 112, 56, 145, "#c4c4c4");
    overlay.style("opacity", "50%");

    drawRectangle(tooltip, 131, 82, 39, 63, "#e60000");
    const tooltipKilograms = drawText(
      tooltip,
      142,
      101,
      "",
      "barchart-tooltip-box",
      "#fff"
    );
    const tooltipCalories = drawText(
      tooltip,
      137,
      132,
      "",
      "barchart-tooltip-box",
      "#fff"
    );

    /**
     * Creates the kilograms bars of the chart.
     */
    svg
      .selectAll(".barchart-bar-kilograms")
      .data(this.dataset)
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(addHours(d.day, 12)) - 10)
      .attr("y", (d) => 112 + yLeftScale(d.kilogram))
      .attr("fill", this.firstColor)
      .attr("width", 6)
      .attr("height", (d) => 145 - yLeftScale(d.kilogram))
      .attr("class", "barchart-bar-kilograms");

    /**
     * Creates the calories bars of the chart.
     */
    svg
      .selectAll(".barchart-bar-calories")
      .data(this.dataset)
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(addHours(d.day, 12)) + 4)
      .attr("y", (d) => 112 + yRightScale(d.calories))
      .attr("fill", this.secondColor)
      .attr("width", 6)
      .attr("height", (d) => 145 - yRightScale(d.calories))
      .attr("class", "barchart-bar-calories");

    /**
     * Creates the tooltip event on hover.
     */
    svg
      .append("rect")
      .attr("x", "43")
      .attr("y", "112")
      .attr("width", 702)
      .attr("height", this.height)
      .style("opacity", "0.01%")
      .on("mouseover", function (event) {
        tooltip.style("display", null);
      })
      .on("mouseout", function (event) {
        tooltip.style("display", "none");
      })
      .on("mousemove", (e) => {
        const x0 = xScale.invert(d3.pointer(e)[0]);
        let index = bisectDate(this.dataset, x0);
        if (x0.getDate() < 7 && x0.getHours() > 13 && index > 0) {
          index -= 1;
        }
        const d = this.dataset[index];
        tooltip.attr("transform", "translate(" + 100 * index + ",0)");
        tooltipKilograms.html(d.kilogram + "kg");
        tooltipCalories.html(d.calories + "kCal");
      });
  }
  render() {
    return <></>;
  }
}

export default BarChart;
