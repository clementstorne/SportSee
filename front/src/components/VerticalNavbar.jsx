import "../main.scss";

import icon1 from "../assets/meditation.png";
import icon2 from "../assets/swimming.png";
import icon3 from "../assets/cycling.png";
import icon4 from "../assets/bodybuilding.png";

import { Component } from "react";
import { Link } from "react-router-dom";

/**
 * Component for showing vertical navbar.
 * @component
 * @extends Component
 */
class VerticalNavbar extends Component {
  /**
   * Creates the navbar.
   */
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <nav className="vertical-navbar">
        <ul className="vertical-navbar-list">
          <li>
            <Link to={`/meditation`} className="vertical-navbar-link">
              <img src={icon1} alt="Yoga" className="activity-icon" />
            </Link>
          </li>
          <li>
            <Link to={`/swimming`} className="vertical-navbar-link">
              <img src={icon2} alt="Natation" className="activity-icon" />
            </Link>
          </li>
          <li>
            <Link to={`/cycling`} className="vertical-navbar-link">
              <img src={icon3} alt="Cyclisme" className="activity-icon" />
            </Link>
          </li>
          <li>
            <Link to={`/bodybuilding`} className="vertical-navbar-link">
              <img src={icon4} alt="Musculation" className="activity-icon" />
            </Link>
          </li>
        </ul>

        <div className="copyright-container">
          <p className="copyright">Copiryght, SportSee 2020</p>
        </div>
      </nav>
    );
  }
}

export default VerticalNavbar;
