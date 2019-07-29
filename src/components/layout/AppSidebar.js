import React, { Component } from "react";
import { Link } from "react-router-dom";
class AppSidebar extends Component {
  state = {};
  render() {
    return (
      <nav className="admin__nav">
        <ul className="menu">
          <li className="menu__item">
            <Link className="menu__link" to="/home">
              Dashboard
            </Link>
          </li>
          <li className="menu__item">
            <Link className="menu__link" to="/revenue/new">
              Revenue
            </Link>
          </li>
          <li className="menu__item">
            <Link className="menu__link" to="/expenses">
              Expenses
            </Link>
          </li>
          <li className="menu__item">
            <Link className="menu__link" to="/sales">
              Sales
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default AppSidebar;
