import "../main.scss";

import {
  drawText,
  drawLine,
  drawCircle,
  drawRectangle,
} from "../helpers/svg-functions";
import {
  addHours,
  addOneDay,
  substractOneDay,
} from "../helpers/time-functions";
import { Component } from "react";
import * as d3 from "d3";

export default class ColumnChart extends Component {
  constructor(props) {
    super(props);
    this.width = 835;
    this.height = 320;
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
    d3.select("#columnchart svg").remove();
    d3.selectAll(".columnchart-tooltip").remove();

    const parseTime = d3.timeFormat("%d/%m");

    this.dataset.forEach((d) => {
      d.day = new Date(d.day);
      d.kilogram = +d.kilogram;
      d.calories = +d.calories;
    });

    const svg = d3
      .select("#columnchart")
      .append("svg")
      .attr("fill", "#fbfbfb")
      .attr("viewBox", `0 0 ${this.width} ${this.height}`);

    const xMin = d3.min(this.dataset, (d) => d.day);
    const xMax = d3.max(this.dataset, (d) => d.day);
    let xStart = substractOneDay(xMin);
    let xEnd = addOneDay(xMax);
    const xScale = d3.scaleUtc().domain([xMin, xEnd]).rangeRound([43, 745]);
    const xAxis = d3
      .axisBottom(xScale)
      // .ticks(d3.timeDay.every(1))
      // .ticks(7)
      .tickFormat((date) => parseTime(date))
      // .tickSize(0)
      .tickPadding(21);
    const xGroup = svg.append("g").attr("transform", "translate(0,257)");
    xGroup.call(xAxis).attr("class", "columnchart-ticks");

    const minKilogram = d3.min(this.dataset, (d) => d.kilogram);
    const maxKilogram = d3.max(this.dataset, (d) => d.kilogram);
    const yLeftScale = d3
      .scaleLinear()
      .domain([maxKilogram, minKilogram - 1])
      .range([0, 145]);
    const yLeftAxis = d3.axisLeft(yLeftScale).ticks(5);
    const yLeftGroup = svg.append("g").attr("transform", "translate(43,112)");
    yLeftGroup.call(yLeftAxis).attr("class", "columnchart-ticks");
    drawText(yLeftGroup, 10, -10, "kg", "columnchart-ticks", "#9b9eac");

    const minCalories = d3.min(this.dataset, (d) => d.calories);
    const maxCalories = d3.max(this.dataset, (d) => d.calories);
    const yRightScale = d3
      .scaleLinear()
      .domain([maxCalories, minCalories - 100])
      .range([0, 145]);
    const yRightAxis = d3.axisRight(yRightScale).ticks(5);
    const yRightGroup = svg.append("g").attr("transform", "translate(745,112)");
    yRightGroup.call(yRightAxis).attr("class", "columnchart-ticks");
    drawText(yRightGroup, -10, -10, "kCal", "columnchart-ticks", "#9b9eac");

    yLeftGroup
      .selectAll("y axis")
      .data(yLeftScale.ticks(5))
      .enter()
      .append("line")
      .attr("stroke", "#DEDEDE")
      .attr("stroke-dasharray", "4,2")
      .attr("x1", 0)
      .attr("x2", 702)
      .attr("y1", (d) => yLeftScale(d))
      .attr("y2", (d) => yLeftScale(d));

    const tooltip = svg
      .append("g")
      .attr("class", "columnchart-tooltip")
      .style("display", "none");

    const overlay = drawRectangle(tooltip, 68, 112, 56, 145, "#c4c4c4");
    overlay.style("opacity", "50%");

    const tooltipBox = drawRectangle(tooltip, 131, 82, 39, 63, "#e60000");
    const tooltipKilograms = drawText(
      tooltip,
      142,
      101,
      "",
      "columnchart-tooltip-box",
      "#fff"
    );
    const tooltipCalories = drawText(
      tooltip,
      137,
      132,
      "",
      "columnchart-tooltip-box",
      "#fff"
    );

    let bisectDate = d3.bisector((d) => d.day).center;

    svg
      .append("rect")
      .attr("width", this.width)
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
        const index = bisectDate(this.dataset, x0);
        const d = this.dataset[index];
        tooltip.attr("transform", "translate(" + 100 * index + ",0)");
        tooltipKilograms.html(d.kilogram + "kg");
        tooltipCalories.html(d.calories + "kCal");
      });

    const barsKilograms = svg
      .selectAll(".columnchart-bar-kilograms")
      .data(this.dataset)
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(addHours(d.day, 12)) - 10)
      .attr("y", (d) => 112 + yLeftScale(d.kilogram))
      .attr("fill", "#282D30")
      .attr("stroke", "#282D30")
      .attr("width", 6)
      .attr("height", (d) => 145 - yLeftScale(d.kilogram))
      .attr("class", "columnchart-bar-kilograms");

    const barsCalories = svg
      .selectAll(".columnchart-bar-calories")
      .data(this.dataset)
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(addHours(d.day, 12)) + 4)
      .attr("y", (d) => 112 + yRightScale(d.calories))
      .attr("fill", "#E60000")
      .attr("stroke", "#E60000")
      .attr("width", 6)
      .attr("height", (d) => 145 - yRightScale(d.calories))
      .attr("class", "columnchart-bar-calories");

    const title = drawText(
      svg,
      32,
      29,
      "Activité quotidienne",
      ".columnchart-title",
      "#20253A"
    );

    const kilogramsKey = svg.append("g").attr("class", "columnchart-key");
    drawCircle(kilogramsKey, 540, 38, 4, "#282D30");
    drawText(
      kilogramsKey,
      555,
      43,
      "Poids (kg)",
      "columnchart-key-title",
      "#74798C"
    );

    const caloriesKey = svg.append("g").attr("class", "columnchart-key");
    drawCircle(caloriesKey, 654, 38, 4, "#E60000");
    drawText(
      caloriesKey,
      670,
      43,
      "Calories brûlées (kCal)",
      "columnchart-key-title",
      "#74798C"
    );
  }
  render() {
    return <></>;
  }
}
