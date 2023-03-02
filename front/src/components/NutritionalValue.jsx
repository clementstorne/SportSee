import "../main.scss";

import CaloriesIcon from "../assets/calories.png";
import ProteinIcon from "../assets/protein.png";
import CarbsIcon from "../assets/carbs.png";
import FatIcon from "../assets/fat.png";

export default function NutritionalValue(props) {
  let icon;
  switch (props.title) {
    case "Calories":
      icon = CaloriesIcon;
      break;
    case "Protéines":
      icon = ProteinIcon;
      break;
    case "Glucides":
      icon = CarbsIcon;
      break;
    case "Lipides":
      icon = FatIcon;
      break;
  }
  return (
    <div className="nutritional-value">
      <img src={icon} alt={props.title} className="nutritional-value-icon" />
      <div>
        {props.title === "Calories" ? (
          <p className="nutritional-value-data">{props.value}kCal</p>
        ) : (
          <p className="nutritional-value-data">{props.value}g</p>
        )}
        <h2 className="nutritional-value-title">{props.title}</h2>
      </div>
    </div>
  );
}
