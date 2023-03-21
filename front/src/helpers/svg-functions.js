import * as d3 from "d3";

/**
 * Create a SVG.
 * @param   {string}      parent          The parent to whom the SVG will be appened.
 * @param   {!number}     width           The width of the SVG.
 * @param   {number}      height          The height of the SVG.
 * @param   {string}      [color='#fff']  The background color of the SVG.
 * @return  {SVGElement}                  The SVG appended to its parent.
 */
export function createSvg(parent, width, height, color = "#fff") {
  return d3
    .select(parent)
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`);
}

/**
 * Create a text in a SVG.
 * @param   {SVGElement}     parent              The parent to whom the text will be appened.
 * @param   {number}         x                   The x-coordinate of the text.
 * @param   {number}         y                   The y-coordinate of the text.
 * @param   {string}         content             The text.
 * @param   {string}         [textClass='']      The class of the text.
 * @param   {string}         [textColor='#000']  The color of the text.
 * @return  {SVGTextElement}                     The text appended to its parent.
 */
export function drawText(
  parent,
  x,
  y,
  content,
  textClass = "",
  textColor = "#000"
) {
  return parent
    .append("text")
    .text(content)
    .attr("x", x)
    .attr("y", y)
    .attr("fill", textColor)
    .attr("class", textClass);
}

/**
 * Create a rectangle in a svg.
 * @param   {SVGElement}     parent          The parent to whom the rectangle will be appened.
 * @param   {number}         x               The x-coordinate of the upper-left corner of the rectangle.
 * @param   {number}         y               The y-coordinate of the upper-left corner of the rectangle.
 * @param   {!number}        width           The width of the rectangle.
 * @param   {!number}        height          The height of the rectangle.
 * @param   {string}         [color='#000']  The color of the rectangle.
 * @return  {SVGRectElement}                 The rectangle appended to its parent.
 */
export function drawRectangle(parent, x, y, width, height, color = "#000") {
  return parent
    .append("rect")
    .attr("x", x)
    .attr("y", y)
    .attr("width", width)
    .attr("height", height)
    .attr("fill", color);
}

/**
 * Create a circle in a SVG.
 * @param   {SVGElement}        parent          The parent to whom the circle will be appened.
 * @param   {number}            x               The x-coordinate of the center of the circle.
 * @param   {number}            y               The y-coordinate of the center of the circle.
 * @param   {!number}           radius          The radius of the circle.
 * @param   {string}            [color='#000']  The fill color of the circle.
 * @return  {SVGCircleElement}                  The circle appened to its parent.
 */
export function drawCircle(parent, x, y, radius, color = "#000") {
  return parent
    .append("circle")
    .attr("cx", x)
    .attr("cy", y)
    .attr("r", radius)
    .attr("fill", color);
}
/**
 * Create a circle progress bar in a SVG.
 * @param   {SVGElement}        parent          The parent to whom the circle progress bar will be appened.
 * @param   {number}            x               The x-coordinate of the center of the circle progress bar.
 * @param   {number}            y               The y-coordinate of the center of the circle progress bar.
 * @param   {!number}           radius          The radius of the circle progress bar.
 * @param   {string}            [color='#000']  The color of the circle progress bar.
 * @param   {!number}           width           The width of the circle progress bar.
 * @return  {SVGCircleElement}                  The circle progress bar appened to its parent.
 */
export function drawCircleProgressBar(
  parent,
  x,
  y,
  radius,
  width,
  value,
  color = "#000"
) {
  const perimeter = Math.PI * (radius * 2);
  const strokeDasharrayValue = perimeter;
  const strokeDashoffsetValue = perimeter * (1 - value);
  const angle = -(90 + value * 360);
  return parent
    .append("circle")
    .attr("cx", x)
    .attr("cy", y)
    .attr("r", radius)
    .attr("fill", "transparent")
    .attr("stroke", color)
    .attr("stroke-linecap", "round")
    .attr("stroke-width", width)
    .attr("stroke-dasharray", strokeDasharrayValue)
    .attr("stroke-dashoffset", strokeDashoffsetValue)
    .attr("transform", `rotate(${angle}, ${x}, ${y}) `);
}

/**
 * Create a line segment in a SVG.
 * @param   {SVGElement}      parent          The parent to whom the line segment will be appened.
 * @param   {number}          x1              The x-coordinate of the first endpoint of the line segment.
 * @param   {number}          y1              The y-coordinate of the first endpoint of the line segment.
 * @param   {number}          x2              The x-coordinate of the second endpoint of the line segment.
 * @param   {number}          y2              The x-coordinate of the second endpoint of the line segment.
 * @param   {string}          [color='#000']  The color of the line segment.
 * @param   {!number}         [width=1]       The width in px of the line segment. Must be non negative.
 * @return  {SVGLineElement}                  The line segment appened to its parent.
 */
export function drawLine(parent, x1, y1, x2, y2, color = "#000", width = 1) {
  return parent
    .append("line")
    .attr("x1", x1)
    .attr("y1", y1)
    .attr("x2", x2)
    .attr("y2", y2)
    .attr("stroke", color)
    .attr("stroke-width", `${width}px`);
}

/**
 * Converts degrees into radians.
 * @param   {number}  angle  Angle in degrees.
 * @return  {number}         Angle in radians.
 */
function degreesToRadians(angle) {
  return (angle * Math.PI) / 180;
}

/**
 * Compute the Cartesian coordinates of a point from its polar coordinates.
 * @param   {!number}   radius   The radial coordinate of the point.
 * @param   {number}    azimuth  The angular coordinate of the pole.
 * @return  {number[]}           An array with the Cartesian coordinates of the point.
 */
function polarToCartesianCoordinates(radius, azimuth) {
  let x = radius * Math.cos(azimuth);
  let y = radius * Math.sin(azimuth);
  return [x, y];
}

/**
 * Create an hexagon in a SVG.
 * @param   {SVGElement}         parent    The parent to whom the line segment will be appened.
 * @param   {number}             x         The x-coordinate of the center of the hexagon.
 * @param   {number}             y         The y-coordinate of the center of the hexagon.
 * @param   {!number}            diameter  The diameter of the hexagon.
 * @return  {SVGPolygonElement}            The hexagon appened to its parent.
 */
export function drawHexagon(parent, x, y, diameter) {
  const radius = diameter / 2;
  let xA, xB, xC, xD, xE, xF, yA, yB, yC, yD, yE, yF;
  [xA, yA] = polarToCartesianCoordinates(radius, degreesToRadians(30));
  [xB, yB] = polarToCartesianCoordinates(radius, degreesToRadians(90));
  [xC, yC] = polarToCartesianCoordinates(radius, degreesToRadians(150));
  [xD, yD] = polarToCartesianCoordinates(radius, degreesToRadians(-150));
  [xE, yE] = polarToCartesianCoordinates(radius, degreesToRadians(-90));
  [xF, yF] = polarToCartesianCoordinates(radius, degreesToRadians(-30));

  return parent
    .append("polygon")
    .attr(
      "points",
      `${xA},${yA} ${xB},${yB} ${xC},${yC} ${xD},${yD} ${xE},${yE} ${xF},${yF}`
    )
    .attr("fill", "transparent")
    .attr("stroke", "white")
    .attr("stroke-width", "1")
    .attr("transform", `translate(${x},${y})`);
}
