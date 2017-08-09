import React, { Component } from 'react'
import { Link } from 'react-router'

class NoMatch extends Component {
  render() {
    return (
  		<div>
        <div className="container_3_1"><span>SORRY你要访问的页面弄丢了</span></div>
        <div className="container_3_2">
         	<Link to={'/'}>返回首页</Link>
      	</div>
      </div>
    )
  }
}

module.exports = NoMatch
