import React, { Fragment, Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// import "./App.css";
import UserLogin from "./components/auth/userLogin";
import PrivateRoute from "./components/auth/privateRoute";
// import AppSidebar from "./components/layout/AppSidebar";
import AppHeader from "./components/layout/AppHeader";
// import Footer from "./components/layout/Footer";

import Revenue from "./components/Revenue";
import singleRevenue from "./components/singleRevenue";
import AddExpense from "./components/AddExpense";
import EditExpense from "./components/EditExpense";
import allSales from "./components/allSales";
import AddSales from "./components/AddSales";
import EditSale from "./components/EditSale";
import Dashboard from "./components/Dashboard";

import setAuthToken from "./components/auth/setAuthToken";
import { loadUser } from "./store/auth/actions";
import { connect } from "react-redux";

import store from "./store";
if (localStorage.token) {
  // Set auth token header auth
  setAuthToken(localStorage.token);
  // Set user and isAuthenticated
  store.dispatch(loadUser);
}

class App extends Component {
  render() {
    const { isAuthenticated } = this.props.auth;
    const authLinks = (
      <div>
        <AppHeader /> {/* <AppSidebar /> */}{" "}
      </div>
    );
    return (
      <BrowserRouter>
        <Fragment>
          <div className="admin">
            {" "}
            {isAuthenticated ? authLinks : null}{" "}
            <main className="container mt-4">
              <Switch>
                <Route exact path="/login" component={UserLogin} />{" "}
                <PrivateRoute exact path="/home" component={Dashboard} />{" "}
                <PrivateRoute exact path="/" component={Dashboard} />{" "}
                <PrivateRoute exact path="/revenue/new" component={Revenue} />{" "}
                <PrivateRoute exact path="/revenue/new" component={Revenue} />{" "}
                <PrivateRoute
                  exact
                  path="/revenue/view-a-single-revenue/:id"
                  component={singleRevenue}
                />{" "}
                <PrivateRoute
                  exact
                  path="/sales/revenue/:id"
                  component={allSales}
                />{" "}
                <PrivateRoute
                  exact
                  path="/sales/edit/:id"
                  component={EditSale}
                />{" "}
                <PrivateRoute
                  exact
                  path="/revenue/add-expense/:id"
                  component={AddExpense}
                />{" "}
                <PrivateRoute
                  exact
                  path="/sales/add-sales/:id"
                  component={AddSales}
                />{" "}
                <PrivateRoute
                  exact
                  path="/expenses/edit/:id"
                  component={EditExpense}
                />{" "}
              </Switch>{" "}
            </main>{" "}
            {/* <Footer /> */}{" "}
          </div>{" "}
        </Fragment>{" "}
      </BrowserRouter>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.authReducer
});
export default connect(
  mapStateToProps,
  null
)(App);
