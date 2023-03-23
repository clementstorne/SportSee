import "../main.scss";

import logo from "../assets/logo.png";

import { Component } from "react";
import { Link } from "react-router-dom";

/**
 * Component for showing horizontal navbar.
 * @component
 * @extends Component
 */
class Navbar extends Component {
  /**
   * Creates the navbar.
   */
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <nav className="navbar">
        <ul className="navbar-list">
          <li>
            <Link to={`/`} className="navbar-link">
              <img src={logo} alt="Logo de SportSee" className="logo" />
            </Link>
          </li>
          <li>
            <Link to={`/`} className="navbar-link">
              Accueil
            </Link>
          </li>
          <li>
            <Link to={`/profile`} className="navbar-link">
              Profil
            </Link>
          </li>
          <li>
            <Link to={`/settings`} className="navbar-link">
              Réglage
            </Link>
          </li>
          <li>
            <Link to={`/community`} className="navbar-link">
              Communauté
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
