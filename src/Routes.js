import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout , RouteWithoutLayout, PrivateRoute} from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  Dashboard as DashboardView,
  ParkingList as ParkingListView,
  UserList as UserListView,
  Icons as IconsView,
  Account as AccountView,
  Settings as SettingsView,
  SignIn as SignInView,
  NotFound as NotFoundView,
  ParkingMap as ParkingMapView
} from './views';

const Routes = ({isAuth}) => {
  return (
    <Switch>
      <Redirect
        exact
        from="/"
        to="/sign-in"
      />
      <PrivateRoute
        component={DashboardView}
        exact
        isAuth={isAuth}
        layout={MainLayout}
        path="/dashboard"
      />
      <PrivateRoute
        component={UserListView}
        exact
        layout={MainLayout}
        path="/users"
      />
      <PrivateRoute
        component={ParkingListView}
        exact
        layout={MainLayout}
        path="/parkings"
      />
      <PrivateRoute
        component={ParkingMapView}
        exact
        layout={MainLayout}
        path="/parking-map"
      />
      <PrivateRoute
        component={AccountView}
        exact
        layout={MainLayout}
        path="/account"
      />
      <PrivateRoute
        component={SettingsView}
        exact
        layout={MainLayout}
        path="/settings"
      />
      <RouteWithoutLayout
        component={SignInView}
        exact
        path="/sign-in"
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      <RouteWithLayout
        component={IconsView}
        exact
        layout={MainLayout}
        path="/icons"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
