import React from "react";
import Loadable from 'react-loadable';

const Loading = () => {
  return <div>加载中</div>
}

export default function SplitComponent(load) {
  return Loadable({
    loader: load,
    loading: Loading
  })
}