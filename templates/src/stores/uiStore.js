import { observable, action } from 'mobx';

export default class UIStore {
  @observable loading = true;

  constructor(appStore) {
    this.appStore = appStore;
  }

  @action setLoading(loading) {
    this.loading = loading;
  }
}
