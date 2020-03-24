import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout , RouteWithoutLayout} from './components';
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

const Routes = () => {
  return (
    <Switch>
      <Redirect
        exact
        from="/"
        to="/sign-in"
      />
      <RouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/dashboard"
      />
      <RouteWithLayout
        component={UserListView}
        exact
        layout={MainLayout}
        path="/users"
      />
      <RouteWithLayout
        component={ParkingListView}
        exact
        layout={MainLayout}
        path="/parkings"
      />
      <RouteWithLayout
        component={ParkingMapView}
        exact
        layout={MainLayout}
        path="/parking-map"
      />
      <RouteWithLayout
        component={AccountView}
        exact
        layout={MainLayout}
        path="/account"
      />
      <RouteWithLayout
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
