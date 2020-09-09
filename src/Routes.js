import React from 'react';
import { Switch, Redirect } from 'react-router-dom'; 
import MainLayout from './templates/MainLayout/MainLayout';
import NormalLayout from './templates/NormalLayout/NormalLayout';
import { 
    Dashboard as DashboardView,
    SignIn as SignInView,
    NotFound as NotFoundView,
    Branch as BranchView,
    Department as DepartmentView,
    Category as CategoryView,
    Staff as StaffView,
    SubCategory as SubCategoryView,
    Product as ProductView,
    ProductDetails as ProductDetailsView,
    Asset as AssetView,
    POS as POSView,
    Ticket as TicketView,
    TicketAdmin as TicketAdminView,
    Report as ReportView,
    Profile as ProfileView
 } from './views';
import { PrivateRoute, NormalRoute } from './HOC';
import AssetDetails from './views/Asset/Components/AssetDetails';
import AdminTicketDetails from './views/TicketAdmin/Components/AdminTicketDetails';


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
          <PrivateRoute
                component={BranchView}
                exact
                layout={MainLayout}
                path="/branch"
          />
           <PrivateRoute
                component={CategoryView}
                exact
                layout={MainLayout}
                path="/category"
          />
            <PrivateRoute
                component={DepartmentView}
                exact
                layout={MainLayout}
                path="/department"
          />
          <PrivateRoute
                component={ProfileView}
                exact
                layout={MainLayout}
                path="/profile"
          />
          <PrivateRoute
                component={StaffView}
                exact
                layout={MainLayout}
                path="/staff"
          />
           <PrivateRoute
                component={SubCategoryView}
                exact
                layout={MainLayout}
                path="/subcategory"
          />
           <PrivateRoute
                component={ProductView}
                exact
                layout={MainLayout}
                path="/product"
          />
          <PrivateRoute
                component={ProductDetailsView}
                exact
                layout={MainLayout}
                path="/product/:id"
          />
           <PrivateRoute
                component={AssetView}
                exact
                layout={MainLayout}
                path="/asset"
          />
           <PrivateRoute
                component={AssetDetails}
                exact
                layout={MainLayout}
                path="/asset/:id/view"
          />
           <PrivateRoute
                component={POSView}
                exact
                layout={MainLayout}
                path="/pos"
          />
           <PrivateRoute
                component={TicketView} 
                layout={MainLayout}
                path="/ticket"
          />
           <PrivateRoute
                component={TicketAdminView} 
                layout={MainLayout}
                path="/admin/ticket"
          />
           <PrivateRoute
                component={AdminTicketDetails}
                exact
                layout={MainLayout}
                path="/adminticket/view/:id"
          />
        <PrivateRoute
                component={ReportView} 
                layout={MainLayout}
                path="/report"
          />
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