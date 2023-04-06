import "../main.scss";

import Navbar from "../components/Navbar";
import VerticalNavbar from "../components/VerticalNavbar";

import { Component } from "react";
import { Link } from "react-router-dom";

class UserErrorPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <header>
          <Navbar />
          <VerticalNavbar />
        </header>
        <main>
          <h1 className="error-title">Oups! Cet utilisateur n'existe pas.</h1>
          <p className="error-message">
            Vous pouvez retourner sur le profil de{" "}
            <Link to={`/user/18`} className="error-link">
              Cecilia
            </Link>{" "}
            ou sur celui de{" "}
            <Link to={`/user/12`} className="error-link">
              Karl
            </Link>
            .
          </p>
        </main>
      </>
    );
  }
}

export default UserErrorPage;
