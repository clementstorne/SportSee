import "../main.scss";

import { drawText, drawRectangle } from "../helpers/svg-functions";
import { Component } from "react";
import * as d3 from "d3";

export default class LineChart extends Component {
  constructor(props) {
    super(props);
    this.width = 258;
    this.height = 263;
    this.dataset = [
      {
        day: 1,
        sessionLength: 30,
      },
      {
        day: 2,
        sessionLength: 23,
      },
      {
        day: 3,
        sessionLength: 45,
      },
      {
        day: 4,
        sessionLength: 50,
      },
      {
        day: 5,
        sessionLength: 0,
      },
      {
        day: 6,
        sessionLength: 0,
      },
      {
        day: 7,
        sessionLength: 60,
      },
    ];
  }
  componentDidMount() {
    d3.select("#linechart svg").remove();

    const svg = d3
      .select("#linechart")
      .append("svg")
      .attr("fill", "#ff0000")
      .attr("viewBox", `0 0 ${this.width} ${this.height}`);

    const title = svg
      .append("g")
      .attr("class", "linechart-title")
      .style("opacity", "50.4%");
    drawText(title, 34, 34, "Durée moyenne des", "", "#fff");
    drawText(title, 34, 57, "sessions", "", "#fff");

    const xScale = d3.scaleLinear().domain([1, 7]).range([0, 258]);

    const days = svg.append("g").style("opacity", "50.4%");
    drawText(days, xScale(1) - 2, 240, "L", "linechart-ticks", "#fff");
    drawText(days, xScale(2) - 4, 240, "M", "linechart-ticks", "#fff");
    drawText(days, xScale(3) - 4, 240, "M", "linechart-ticks", "#fff");
    drawText(days, xScale(4) - 4, 240, "J", "linechart-ticks", "#fff");
    drawText(days, xScale(5) - 3, 240, "V", "linechart-ticks", "#fff");
    drawText(days, xScale(6) - 3, 240, "S", "linechart-ticks", "#fff");
    drawText(days, xScale(7) - 3, 240, "D", "linechart-ticks", "#fff");

    const minY = d3.min(this.dataset, (d) => d.sessionLength);
    const maxY = d3.max(this.dataset, (d) => d.sessionLength);
    const yScale = d3.scaleLinear().domain([maxY, minY]).range([80, 201]);

    const line = d3
      .line()
      .x((d) => xScale(d.day))
      .y((d) => yScale(d.sessionLength))
      .curve(d3.curveNatural);

    svg
      .append("path")
      .attr("d", line(this.dataset))
      .attr("fill", "none")
      .attr("stroke", "#fff")
      .attr("stroke-width", "2")
      .style("opacity", "50.4%");

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

    const overlay = drawRectangle(
      tooltip,
      0,
      0,
      this.width,
      this.height,
      "#000"
    );
    overlay.style("opacity", "10%");

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
        tooltip.attr(
          "transform",
          "translate(" + xScale(d.day) + "," + yScale(d.sessionLength) + ")"
        );
        overlay.attr(
          "transform",
          "translate(0," + -yScale(d.sessionLength) + ")"
        );
      });
  }
  render() {
    return <></>;
  }
}
