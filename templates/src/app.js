import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Spin } from 'antd';

import 'styles';

@inject('appStore', 'uiStore')
@observer
export default class App extends Component {
  render() {
    const { uiStore, appStore } = this.props;
    const { loading } = uiStore;
    return (
      <Spin tip="加载中..." spinning={loading}>
        <div className="main">
          {
            this.props.children||"空页面"
          }
        </div>
      </Spin>
    );
  }

  componentDidMount() {
    this.props.uiStore.setLoading(false);
  }
}
