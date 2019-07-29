import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { userLogin } from "../../store/auth/actions";

class UserLogin extends Component {
  static propTypes = {
    userLogin: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
  };

  state = {
    email: "",
    password: "",
    error: {},
    success: false
  };

  onChangeHandler = e =>
    this.setState({
      [e.target.name]: e.target.value
    });
  componentWillReceiveProps;
  onSubmitHandler = async e => {
    e.preventDefault();
    this.props.userLogin(this.state);
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.isAuthenticated) {
      this.props.history.push("/");
    }
  };

  render() {
    const { email, password } = this.state;
    return (
      <Fragment>
        <div className="card">
          <div className="card-body">
            <h1 className=" text-primary"> Login </h1>
            <p className="lead">
              <i className="fas fa-user" /> Sign in into Your Account
            </p>
            <form className="form" onSubmit={this.onSubmitHandler}>
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  className="form-control"
                  value={email}
                  onChange={this.onChangeHandler}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  className="form-control"
                  value={password}
                  onChange={this.onChangeHandler}
                />
              </div>
              <input type="submit" className="btn btn-primary" value="Login" />
            </form>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.authReducer.isAuthenticated
});

export default connect(
  mapStateToProps,
  {
    userLogin
  }
)(UserLogin);
