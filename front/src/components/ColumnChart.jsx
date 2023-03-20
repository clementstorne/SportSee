import "../main.scss";

import { drawText, drawLine, drawCircle } from "../helpers/svg-functions";
import { Component } from "react";
import * as d3 from "d3";

export default class ColumnChart extends Component {
  constructor(props) {
    super(props);
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

    const svg = d3
      .select("#columnchart")
      .append("svg")
      .attr("fill", "#fbfbfb")
      .attr("viewBox", "0 0 835 320");

    const x = d3
      .scaleBand()
      .domain(this.dataset.map((item) => item.day))
      .range([0, 702]);
    const xAxis = d3.axisBottom(x).tickSize(0).tickPadding(21);
    const xGroup = svg.append("g").attr("transform", "translate(43,257)");
    xGroup.call(xAxis).attr("class", "columnchart-ticks");

    const minKilogram = d3.min(this.dataset, (d) => d.kilogram);
    const maxKilogram = d3.max(this.dataset, (d) => d.kilogram);
    const yKilogram = d3
      .scaleLinear()
      .domain([maxKilogram, minKilogram - 1])
      .range([0, 145]);
    const yAxisLeft = d3.axisLeft(yKilogram).ticks(5);
    const yGroupLeft = svg.append("g").attr("transform", "translate(43,112)");
    yGroupLeft.call(yAxisLeft).attr("class", "columnchart-ticks");

    const minCalories = d3.min(this.dataset, (d) => d.calories);
    const maxCalories = d3.max(this.dataset, (d) => d.calories);
    const yCalories = d3
      .scaleLinear()
      .domain([maxCalories, minCalories - 100])
      .range([0, 145]);
    const yAxisRight = d3.axisRight(yCalories).ticks(5);
    const yGroupRight = svg.append("g").attr("transform", "translate(745,112)");
    yGroupRight.call(yAxisRight).attr("class", "columnchart-ticks");

    const firstLine = drawLine(svg, 43, 185, 745, 185, "#DEDEDE");
    firstLine.attr("stroke-dasharray", "4,2");
    const secondLine = drawLine(svg, 43, 112, 745, 112, "#DEDEDE");
    secondLine.attr("stroke-dasharray", "4,2");

    const kilogramsTootlip = d3
      .select("#columnchart")
      .append("p")
      .attr("class", "columnchart-tooltip");
    const caloriesTootlip = d3
      .select("#columnchart")
      .append("p")
      .attr("class", "columnchart-tooltip");

    const barsKilograms = svg
      .selectAll(".columnchart-bar-kilograms")
      .data(this.dataset)
      .enter()
      .append("rect")
      .attr("x", (d) => 36 + x(d.day) + x.bandwidth() / 2)
      .attr("y", (d) => 112 + yKilogram(d.kilogram))
      .attr("fill", "#282D30")
      .attr("stroke", "#282D30")
      .attr("stroke-width", 6)
      .attr("stroke-linejoin", "round")
      .attr("width", 1)
      .attr("height", (d) => 145 - yKilogram(d.kilogram))
      .attr("class", "columnchart-bar-kilograms")
      .on("mouseover", (e, d) => {
        kilogramsTootlip
          .html(d.kilogram + "kg")
          .style("left", e.layerX + 28 + "px")
          .style("top", "84px")
          .style("opacity", 1);
        caloriesTootlip
          .html(d.calories + "kCal")
          .style("left", e.layerX + 28 + "px")
          .style("top", "116px")
          .style("opacity", 1);
      })
      .on("mouseleave", () => {
        kilogramsTootlip.html("").style("opacity", 0);
        caloriesTootlip.html("").style("opacity", 0);
      });

    const barsCalories = svg
      .selectAll(".columnchart-bar-calories")
      .data(this.dataset)
      .enter()
      .append("rect")
      .attr("x", (d) => 50 + x(d.day) + x.bandwidth() / 2)
      .attr("y", (d) => 112 + yCalories(d.calories))
      .attr("fill", "#E60000")
      .attr("stroke", "#E60000")
      .attr("stroke-width", 6)
      .attr("stroke-linejoin", "round")
      .attr("width", 1)
      .attr("height", (d) => 145 - yCalories(d.calories))
      .attr("class", "columnchart-bar-calories")
      .on("mouseover", (e, d) => {
        kilogramsTootlip
          .html(d.kilogram + "kg")
          .style("left", e.layerX + 20 + "px")
          .style("top", "84px")
          .style("opacity", 1);
        caloriesTootlip
          .html(d.calories + "kCal")
          .style("left", e.layerX + 20 + "px")
          .style("top", "116px")
          .style("opacity", 1);
      })
      .on("mouseleave", () => {
        kilogramsTootlip.html("").style("opacity", 0);
        caloriesTootlip.html("").style("opacity", 0);
      });

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
