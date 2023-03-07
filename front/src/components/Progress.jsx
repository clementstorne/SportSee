import "../main.scss";

import * as d3 from "d3";
import { permute } from "d3";

export default function Progress(props) {
  const dataset = [props.value];

  const svg = d3
    .select(".progress-container")
    .append("svg")
    .attr("width", "258")
    .attr("height", "264");

  const circle = svg
    .append("circle")
    .attr("cx", "129")
    .attr("cy", "132")
    .attr("r", "85")
    .attr("fill", "white");

  const radius = 90;
  const perimeter = Math.PI * (radius * 2);
  const strokeDasharrayValue = perimeter;
  const strokeDashoffsetValue = perimeter * (1 - props.value);
  const angle = -(90 + props.value * 360);

  const stroke = svg
    .append("circle")
    .attr("cx", "129")
    .attr("cy", "132")
    .attr("r", radius)
    .attr("fill", "transparent")
    .attr("stroke", "red")
    .attr("stroke-linecap", "round")
    .attr("stroke-width", "10")
    .attr("stroke-dasharray", strokeDasharrayValue)
    .attr("stroke-dashoffset", strokeDashoffsetValue)
    .attr("transform", `rotate(${angle}, 129, 132) `);

  const title = svg
    .append("text")
    .text("Score")
    .attr("x", "30")
    .attr("y", "30")
    .attr("fill", "#20253a")
    .attr("class", "progress-title");

  const percentage = svg
    .append("text")
    .text(`${props.value * 100} %`)
    .attr("x", "108")
    .attr("y", "110")
    .attr("fill", "#282d30")
    .attr("class", "progress-value");
  // .attr("textAnchor", "middle");

  const text1 = svg
    .append("text")
    .text("de votre")
    .attr("x", "102")
    .attr("y", "143")
    .attr("fill", "#74798c")
    .attr("class", "progress-text");

  const text2 = svg
    .append("text")
    .text("objectif")
    .attr("x", "103")
    .attr("y", "167")
    .attr("fill", "#74798c")
    .attr("class", "progress-text");

  return (
    <>
      <div className="progress"></div>
    </>
  );
}
