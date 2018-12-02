import React, { Component } from "react";
import { NavLink } from 'react-router-dom'
import Router from "./router";

export default class App extends Component {
  render() {
    return <div>
      <NavLink to='/home' activeClassName="selected">home</NavLink>
      <NavLink to='/home2' activeClassName="selected">home2</NavLink>
      <Router />
    </div>
  }
}