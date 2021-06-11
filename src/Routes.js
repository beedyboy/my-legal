import React, { Fragment } from "react";
import { Switch, Redirect } from "react-router-dom";
import Layout from "./templates/Layout";
import {
  Home as HomeView,
  About as AboutView,
  Blog as BlogView,
  Contact as ContactView,
  Practise as PractiseView,
  Login as LoginView,
  NotFound as NotFoundView,
  Staff as StaffView,
} from "./views";
import { PrivateRoute, NormalRoute } from "./HOC";
import MainLayout from "./templates/Admin/MainLayout/MainLayout";
import NormalLayout from "./templates/Admin/NormalLayout/NormalLayout";
const Routes = () => {
  return (
    <Fragment>
      <Switch>
        <Redirect exact from="/admin" to="/staff" />
        <NormalRoute component={HomeView} exact layout={Layout} path="/" />
        <NormalRoute
          component={AboutView}
          exact
          layout={Layout}
          path="/about"
        />
        <NormalRoute
          component={ContactView}
          exact
          layout={Layout}
          path="/contact"
        />
        <NormalRoute
          component={PractiseView}
          exact
          layout={Layout}
          path="/practise-area"
        />
        <PrivateRoute
          component={BlogView}
          exact
          layout={MainLayout}
          path="/admin/blog"
        />
        <PrivateRoute
          component={StaffView}
          exact
          layout={MainLayout}
          path="/admin/staff"
        />
        <NormalRoute
          component={LoginView}
          exact
          layout={NormalLayout}
          path="/admin/login"
        />
        <NormalRoute
          component={NotFoundView}
          exact
          layout={NormalLayout}
          path="/not-found"
        />
        <Redirect to="/not-found" />
      </Switch>
    </Fragment>
  );
};
export default Routes;
