import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import Layout from "./templates/Layout";
import {
  Home as HomeView,
  About as AboutView,
  Contact as ContactView,
  Practise as PractiseView,
  Login as LoginView,
  NotFound as NotFoundView,
} from "./views";
import { PrivateRoute, NormalRoute } from "./HOC";
import NormalLayout from "./templates copy/NormalLayout/NormalLayout";
import MainLayout from "./templates copy/MainLayout/MainLayout";
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
          {/* <PrivateRoute
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/dashboard"
      /> */}
          <NormalRoute
            component={LoginView}
            exact
            layout={NormalLayout}
            path="/login"
          />
          <NormalRoute
            component={NotFoundView}
            exact
            layout={NormalLayout}
            path="/not-found"
          />
          <Redirect to="/not-found" />
        </Switch>
      </Layout>
    </Fragment>
  );
};
export default Routes;
