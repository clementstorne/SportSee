import { Link } from "react-router-dom";

import logo from "../assets/logo.png";
import "../main.scss";

export default function Navbar() {
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
