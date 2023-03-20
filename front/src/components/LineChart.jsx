import "../main.scss";

import { drawText, drawLine, drawCircle } from "../helpers/svg-functions";
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

    const title = svg.append("g").style("opacity", "50.4%");
    drawText(title, 34, 34, "Durée moyenne des", "linechart-title", "#fff");
    drawText(title, 34, 57, "sessions", "linechart-title", "#fff");

    const xScale = d3.scaleLinear().domain([1, 7]).range([0, 258]);

    // const xScale = d3
    //   .scaleBand()
    //   .domain(this.dataset.map((session) => session.day))
    //   .range([0, 258]);
    // const xBandWidth = xScale.bandwidth();
    // const xHalfBandWidth = xBandWidth / 2;
    // const scale = this.width / (6 * xBandWidth);

    const days = svg.append("g").style("opacity", "50.4%");
    drawText(days, 15, 230, "L", "linechart-ticks", "#fff");
    drawText(days, 50, 230, "M", "linechart-ticks", "#fff");
    drawText(days, 90, 230, "M", "linechart-ticks", "#fff");
    drawText(days, 129, 230, "J", "linechart-ticks", "#fff");
    drawText(days, 164, 230, "V", "linechart-ticks", "#fff");
    drawText(days, 200, 230, "S", "linechart-ticks", "#fff");
    drawText(days, 237, 230, "D", "linechart-ticks", "#fff");

    const minY = d3.min(this.dataset, (d) => d.sessionLength);
    const maxY = d3.max(this.dataset, (d) => d.sessionLength);
    const yScale = d3.scaleLinear().domain([maxY, minY]).range([80, 201]);

    const line = d3
      .line()
      .x((d) => xScale(d.day))
      .y((d) => yScale(d.sessionLength))
      .curve(d3.curveBasis);

    svg
      .append("path")
      .attr("d", line(this.dataset))
      .attr("fill", "none")
      .attr("stroke", "#fff")
      .attr("stroke-width", "2")
      .style("opacity", "50.4%");
    // .attr("transform", `translate(${xHalfBandWidth} ,0)`)
    // .style("transform", `scaleX(${scale})`);
  }
  render() {
    return <></>;
  }
}
