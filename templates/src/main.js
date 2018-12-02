import React from "react"
import ReactDOM from "react-dom"
import { HashRouter as Router } from 'react-router-dom'
import { Provider } from 'mobx-react'
import "./styles/index.less";
import App from "./App"
import stores from "./stores"

const MOUNT_NODE = document.getElementById('app');

ReactDOM.render(
  <Provider {...stores}>
    <Router>
      <App/>
    </Router>
  </Provider>,
  MOUNT_NODE
);