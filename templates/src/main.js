import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { hashHistory, Router } from 'react-router';
import AppStore from './stores/appStore';
import routes from './routes';

const appStore = new AppStore();
const uiStore = appStore.uiStore;

const MOUNT_NODE = document.getElementById('app');

if (__DEV__) {
  window.appStore = appStore;
  window.uiStore = uiStore;
	const enableLogging = require('mobx-logger').default;
	enableLogging({
    predicate: () => true,
    action: true,
    reaction: true,
    transaction: true,
    compute: true
	});
}

ReactDOM.render(
  <Provider
     appStore={appStore}
     uiStore={uiStore}
   >
    <Router history={hashHistory} routes={routes} />
  </Provider>,
  MOUNT_NODE
);
