import "../main.scss";

import { Component } from "react";
import * as d3 from "d3";

function drawText(parent, x, y, content, textClass, textColor = "#000") {
  return parent
    .append("text")
    .text(content)
    .attr("x", x)
    .attr("y", y)
    .attr("fill", textColor)
    .attr("class", textClass);
}

function drawCircle(parent, cx, cy, radius, color = "#000") {
  return parent
    .append("circle")
    .attr("cx", cx)
    .attr("cy", cy)
    .attr("r", radius)
    .attr("fill", color);
}

function drawLine(parent, x1, y1, x2, y2, color = "#000", width = "1px") {
  return parent
    .append("line")
    .attr("x1", x1)
    .attr("y1", y1)
    .attr("x2", x2)
    .attr("y2", y2)
    .attr("stroke", color)
    .attr("stroke-width", width);
}

export default class BarChart extends Component {
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
    d3.select("#barchart svg").remove();
    d3.selectAll(".barchart-tooltip").remove();

    const svg = d3
      .select("#barchart")
      .append("svg")
      .attr("fill", "#fbfbfb")
      .attr("viewBox", "0 0 835 320");

    const x = d3
      .scaleBand()
      .domain(this.dataset.map((item) => item.day))
      .range([0, 702]);
    const xAxis = d3.axisBottom(x).tickSize(0).tickPadding(21);
    const xGroup = svg.append("g").attr("transform", "translate(43,257)");
    xGroup.call(xAxis).attr("class", "barchart-ticks");

    const minKilogram = d3.min(this.dataset, (d) => d.kilogram);
    const maxKilogram = d3.max(this.dataset, (d) => d.kilogram);
    const yKilogram = d3
      .scaleLinear()
      .domain([maxKilogram, minKilogram - 1])
      .range([0, 145]);
    const yAxisLeft = d3.axisLeft(yKilogram).ticks(5);
    const yGroupLeft = svg.append("g").attr("transform", "translate(43,112)");
    yGroupLeft.call(yAxisLeft).attr("class", "barchart-ticks");

    const minCalories = d3.min(this.dataset, (d) => d.calories);
    const maxCalories = d3.max(this.dataset, (d) => d.calories);
    const yCalories = d3
      .scaleLinear()
      .domain([maxCalories, minCalories - 100])
      .range([0, 145]);
    const yAxisRight = d3.axisRight(yCalories).ticks(5);
    const yGroupRight = svg.append("g").attr("transform", "translate(745,112)");
    yGroupRight.call(yAxisRight).attr("class", "barchart-ticks");

    const firstLine = drawLine(svg, 43, 185, 745, 185, "#DEDEDE");
    firstLine.attr("stroke-dasharray", "4,2");
    const secondLine = drawLine(svg, 43, 112, 745, 112, "#DEDEDE");
    secondLine.attr("stroke-dasharray", "4,2");

    const kilogramsTootlip = d3
      .select("#barchart")
      .append("p")
      .attr("class", "barchart-tooltip");
    const caloriesTootlip = d3
      .select("#barchart")
      .append("p")
      .attr("class", "barchart-tooltip");

    const barsKilograms = svg
      .selectAll(".barchart-bar-kilograms")
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
      .attr("class", "barchart-bar-kilograms")
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
      .selectAll(".barchart-bar-calories")
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
      .attr("class", "barchart-bar-calories")
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
      "Activit?? quotidienne",
      ".barchart-title",
      "#20253A"
    );

    const kilogramsKey = svg.append("g").attr("class", "barchart-key");
    drawCircle(kilogramsKey, 540, 38, 4, "#282D30");
    drawText(
      kilogramsKey,
      555,
      43,
      "Poids (kg)",
      "barchart-key-title",
      "#74798C"
    );

    const caloriesKey = svg.append("g").attr("class", "barchart-key");
    drawCircle(caloriesKey, 654, 38, 4, "#E60000");
    drawText(
      caloriesKey,
      670,
      43,
      "Calories br??l??es (kCal)",
      "barchart-key-title",
      "#74798C"
    );
  }
  render() {
    return <></>;
  }
}
