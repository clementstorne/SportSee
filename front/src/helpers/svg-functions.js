export function drawText(parent, x, y, content, textClass, textColor = "#000") {
  return parent
    .append("text")
    .text(content)
    .attr("x", x)
    .attr("y", y)
    .attr("fill", textColor)
    .attr("class", textClass);
}

export function drawCircle(parent, cx, cy, radius, color = "#000") {
  return parent
    .append("circle")
    .attr("cx", cx)
    .attr("cy", cy)
    .attr("r", radius)
    .attr("fill", color);
}

export function drawLine(
  parent,
  x1,
  y1,
  x2,
  y2,
  color = "#000",
  width = "1px"
) {
  return parent
    .append("line")
    .attr("x1", x1)
    .attr("y1", y1)
    .attr("x2", x2)
    .attr("y2", y2)
    .attr("stroke", color)
    .attr("stroke-width", width);
}

export function drawHexagon(parent, xCenter, yCenter, diameter) {
  const radius = diameter / 2;
  let xA, xB, xC, xD, xE, xF, yA, yB, yC, yD, yE, yF;
  [xA, yA] = [0, radius];
  [xB, yB] = [(radius * Math.sqrt(3)) / 2, radius * 0.5];
  [xC, yC] = [(radius * Math.sqrt(3)) / 2, -radius * 0.5];
  [xD, yD] = [0, -radius];
  [xE, yE] = [(-radius * Math.sqrt(3)) / 2, -radius * 0.5];
  [xF, yF] = [(-radius * Math.sqrt(3)) / 2, radius * 0.5];

  return parent
    .append("polygon")
    .attr(
      "points",
      `${xA},${yA} ${xB},${yB} ${xC},${yC} ${xD},${yD} ${xE},${yE} ${xF},${yF}`
    )
    .attr("fill", "transparent")
    .attr("stroke", "white")
    .attr("stroke-width", "1")
    .attr("transform", `translate(${xCenter},${yCenter})`);
}
