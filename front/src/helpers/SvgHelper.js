import * as d3 from "d3";

/**
 * Class for SVG helper functions.
 */
class SvgHelper {
  /**
   * Create a SVG.
   * @param   {String}      parent          The parent to whom the SVG will be appened.
   * @param   {!Number}     width           The width of the SVG.
   * @param   {Number}      height          The height of the SVG.
   * @param   {String}      [color='#fff']  The background color of the SVG.
   * @return  {SVGElement}                  The SVG appended to its parent.
   */
  static createSvg(parent, width, height, color = "#fff", xOrigin = 0) {
    return d3
      .select(parent)
      .append("svg")
      .attr("viewBox", `${-xOrigin} 0 ${width + xOrigin * 1.25} ${height}`);
  }

  /**
   * Create a text in a SVG.
   * @param   {SVGElement}     parent              The parent to whom the text will be appened.
   * @param   {Number}         x                   The x-coordinate of the text.
   * @param   {Number}         y                   The y-coordinate of the text.
   * @param   {String}         content             The text.
   * @param   {String}         [textClass='']      The class of the text.
   * @param   {String}         [textColor='#000']  The color of the text.
   * @return  {SVGTextElement}                     The text appended to its parent.
   */
  static drawText(parent, x, y, content, textClass = "", textColor = "#000") {
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
   * @param   {Number}         x               The x-coordinate of the upper-left corner of the rectangle.
   * @param   {Number}         y               The y-coordinate of the upper-left corner of the rectangle.
   * @param   {!Number}        width           The width of the rectangle.
   * @param   {!Number}        height          The height of the rectangle.
   * @param   {String}         [color='#000']  The color of the rectangle.
   * @return  {SVGRectElement}                 The rectangle appended to its parent.
   */
  static drawRectangle(parent, x, y, width, height, color = "#000") {
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
   * @param   {Number}            x               The x-coordinate of the center of the circle.
   * @param   {Number}            y               The y-coordinate of the center of the circle.
   * @param   {!Number}           radius          The radius of the circle.
   * @param   {String}            [color='#000']  The fill color of the circle.
   * @return  {SVGCircleElement}                  The circle appened to its parent.
   */
  static drawCircle(parent, x, y, radius, color = "#000") {
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
   * @param   {Number}            x               The x-coordinate of the center of the circle progress bar.
   * @param   {Number}            y               The y-coordinate of the center of the circle progress bar.
   * @param   {!Number}           radius          The radius of the circle progress bar.
   * @param   {String}            [color='#000']  The color of the circle progress bar.
   * @param   {!Number}           width           The width of the circle progress bar.
   * @return  {SVGCircleElement}                  The circle progress bar appened to its parent.
   */
  static drawCircleProgressBar(
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
   * Converts degrees into radians.
   * @param   {Number}  angle  Angle in degrees.
   * @return  {Number}         Angle in radians.
   */
  static degreesToRadians(angle) {
    return (angle * Math.PI) / 180;
  }

  /**
   * Compute the Cartesian coordinates of a point from its polar coordinates.
   * @param   {!Number}   radius   The radial coordinate of the point.
   * @param   {Number}    azimuth  The angular coordinate of the pole.
   * @return  {Object}             An object with the Cartesian coordinates of the point.
   */
  static polarToCartesianCoordinates(radius, azimuth) {
    const x = radius * Math.cos(azimuth);
    const y = radius * Math.sin(azimuth);
    return { x, y };
  }
}

export default SvgHelper;
