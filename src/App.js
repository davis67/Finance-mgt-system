import React, { Fragment, Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./App.css";
import UserLogin from "./components/auth/userLogin";

import setAuthToken from "./components/auth/setAuthToken";
import PrivateRoute from "./components/auth/privateRoute";
import { loadUser } from "./store/auth/actions";
import store from "./store";
import AppSidebar from "./components/layout/AppSidebar";
import AppHeader from "./components/layout/AppHeader";
import Footer from "./components/layout/Footer";

import Revenue from "./components/Revenue";
import singleRevenue from "./components/singleRevenue";
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <div className="admin">
            <AppHeader />
            <AppSidebar />
            <main className="admin__main">
              <Switch>
                <Route exact path="/login" component={UserLogin} />{" "}
                <PrivateRoute exact path="/revenue/new" component={Revenue} />{" "}
                <PrivateRoute
                  exact
                  path="/revenue/view-a-single-revenue/:id"
                  component={singleRevenue}
                />
              </Switch>
            </main>
            <Footer />
          </div>
        </Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
