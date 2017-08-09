import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Button, message } from 'antd';

@inject('appStore', 'uiStore')
@observer
export default class ModuleName extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }
  componentDidMount(){}

  render() {
    return (
    	<div>
        <Button onClick={() => {
          message.info('这是个按钮');
        }} type="primary">按钮</Button>
        <img src={require('../images/1.png')} alt=""/>
    	</div>
    )
  }
}
