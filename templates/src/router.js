import React from "react";
import { Route, Redirect } from 'react-router-dom'
import SplitComponent from "./utils/splitComponent";

export default function Router(props) {
  return [
    <Route
      key="index"
      path="/"
      exact
      render={() => <Redirect to="/home" />} />,
    <Route
      key="home"
      path="/home"
      component={SplitComponent(() => import(/* webpackChunkName: "home" */'./pages/home'))} />
  ]
}