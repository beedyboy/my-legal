import React from 'react';
import { Switch, Redirect } from 'react-router-dom'; 
import MainLayout from './templates/MainLayout/MainLayout';
import NormalLayout from './templates/NormalLayout/NormalLayout';
import { 
    Dashboard as DashboardView,
    SignIn as SignInView,
<<<<<<< HEAD
    NotFound as NotFoundView
 } from './views';
import { PrivateRoute, NormalRoute } from './HOC';

=======
    NotFound as NotFoundView,
    Department as DepartmentView,
    Category as CategoryView
   
 } from './views';
import { PrivateRoute, NormalRoute } from './HOC';


>>>>>>> origin/honey
const Routes = () => {
    return (
        <Switch>
            <Redirect
                exact
                from="/"
                to="/dashboard"
            />
            <PrivateRoute
                component={DashboardView}
                exact
                layout={MainLayout}
                path="/dashboard"
          />
<<<<<<< HEAD
=======
           <PrivateRoute
                component={CategoryView}
                exact
                layout={MainLayout}
                path="/Category"
          />
            <PrivateRoute
                component={DepartmentView}
                exact
                layout={MainLayout}
                path="/Department"
          />
>>>>>>> origin/honey
           <NormalRoute
                component={SignInView}
                exact
                layout={NormalLayout}
                path="/sign-in"
            />
          <NormalRoute
            component={NotFoundView}
            exact
            layout={NormalLayout}
            path="/not-found"
        /> 
      <Redirect to="/not-found" />
        </Switch>
    )
}
export default Routes;