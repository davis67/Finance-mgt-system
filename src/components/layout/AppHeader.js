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
    const isAuthenticated = this.props.auth;
    return (
      <header className="admin__header">
        <Link to="/home" className="logo">
          <h5> Finance Mgt System </h5>
        </Link>
        <div className="toolbar">
          <Link to="/revenue/new" className="btn btn--primary">
            Add New Revenue
          </Link>
          <Link to="/login" onClick={this.onLogoutClick} className="logout">
            Log Out
          </Link>
        </div>
      </header>
    );
  }
}

AppHeader.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.authReducer
});
export default connect(
  mapStateToProps,
  {
    logoutUser
  }
)(AppHeader);
