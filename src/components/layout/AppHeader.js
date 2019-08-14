import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { logoutUser } from "../../store/auth/actions";

import { connect } from "react-redux";

class AppHeader extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  render() {
    return (
      <nav
        className="navbar navbar-expand-lg navbar-light"
        style={{ backgroundColor: "#e3f2fd;" }}
      >
        <Link className="navbar-brand" to="/home">
          Finance Mgt System
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="container collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/home">
                Home <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/revenue/new">
                Revenue
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/expenses">
                Expenses
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/sales">
                Sales
              </Link>
            </li>
          </ul>
          <span className="navbar-text">
            <Link to="/login" onClick={this.onLogoutClick} className="logout">
              Log Out
            </Link>
          </span>
        </div>
      </nav>
      // <header classNameName="admin__header">
      //   <Link to="/home" classNameName="logo">
      //     <h5> Finance Mgt System </h5>
      //   </Link>
      //   <div classNameName="toolbar">
      //     <Link to="/revenue/new" className="btn btn--primary">
      //       Add New Revenue
      //     </Link>
      //     <Link to="/login" onClick={this.onLogoutClick} className="logout">
      //       Log Out
      //     </Link>
      //   </div>
      // </header>
    );
  }
}

AppHeader.propTypes = {
  logoutUser: PropTypes.func.isRequired
};
export default connect(
  null,
  {
    logoutUser
  }
)(AppHeader);
