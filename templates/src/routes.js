import _ from 'lodash'
import App from './app'

const routes = [{
		path: '/',
    component: App,
    indexRoute: {
      onEnter: (nextState, replace)=>{ replace('/home') }
    },
    childRoutes: [
      {
      	path: 'home',
        chunk: 'home',
        getComponent: (nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, require('./page/index').default)
          }, 'home')
        }
      }
    ]
	},
	{
		path: '*',
		component: require('./page/NoMatch')
	},
]
export default routes;
