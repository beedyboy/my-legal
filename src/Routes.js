import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import Layout from "./templates/Layout";
import {
  Home as HomeView,
  About as AboutView,
  Contact as ContactView,
  Practise as PractiseView
  // NotFound as NotFoundView
} from "./views";
const Routes = () => {
  return (
    <Fragment>
      <Layout>
        <Switch>
          {/* <Redirect exact from="/" to="/dashboard" /> */}
          <Route component={HomeView} exact path="/" />
          <Route component={AboutView} exact path="/about" />
          <Route component={ContactView} exact path="/contact" />
          <Route component={PractiseView} exact path="/practise-area" />

          {/* <Redirect to="/not-found" /> */}
        </Switch>
      </Layout>
    </Fragment>
  );
};
export default Routes;
