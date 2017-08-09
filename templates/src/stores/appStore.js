import { observable, action, computed } from 'mobx';
import UIStore from './uiStore';

export default class AppStore {
  uiStore;

  constructor() {
    this.uiStore = new UIStore(this);
  }
}
