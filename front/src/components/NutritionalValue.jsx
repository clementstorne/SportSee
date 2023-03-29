import "../main.scss";

import CaloriesIcon from "../assets/calories.png";
import ProteinIcon from "../assets/protein.png";
import CarbsIcon from "../assets/carbs.png";
import FatIcon from "../assets/fat.png";

import PropTypes from "prop-types";
import { Component } from "react";

/**
 * Component for showing the user's nutritional values on cards.
 * @component
 * @extends Component
 */
class NutritionalValue extends Component {
  /**
   * Creates a card with nutritional values.
   * @param   {String}      title The type of nutritional value.
   * @param   {Number}      value The value show on the card.
   * @param   {MediaImage}  icon  The icon corresponding to the type of nutritional value.
   */
  constructor(props) {
    super(props);
    this.title = props.title;
    this.value = props.value;
    this.icon = "";
    /**
     * Determine the icon corresponding to the type of nutritional value.
     */
    switch (this.title) {
      case "Calories":
        this.icon = CaloriesIcon;
        break;
      case "Protéines":
        this.icon = ProteinIcon;
        break;
      case "Glucides":
        this.icon = CarbsIcon;
        break;
      case "Lipides":
        this.icon = FatIcon;
        break;
    }
  }
  render() {
    return (
      <div className="nutritional-value">
        <img
          src={this.icon}
          alt={this.title}
          className="nutritional-value-icon"
        />
        <div>
          {this.title === "Calories" ? (
            <p className="nutritional-value-data">{this.value}kCal</p>
          ) : (
            <p className="nutritional-value-data">{this.value}g</p>
          )}
          <h2 className="nutritional-value-title">{this.title}</h2>
        </div>
      </div>
    );
  }
}

NutritionalValue.propTypes = {
  title: PropTypes.oneOf(["Calories", "Protéines", "Glucides", "Lipides"])
    .isRequired,
  value: PropTypes.number.isRequired,
};

export default NutritionalValue;
