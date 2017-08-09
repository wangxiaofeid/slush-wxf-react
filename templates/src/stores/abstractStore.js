import { observable, action } from 'mobx';

export default class AbstrctStore {
  @observable total = 0;
  @observable current = 1;
  @observable pageSize = 10;

  constructor(appStore) {
    this.appStore = appStore;
    this.uiStore = appStore.uiStore;
  }

  @action setTotal(total) {
    this.total = total;
  }

  @action setPageSize(pageSize) {
    this.pageSize = pageSize;
  }

  @action setCurrent(current) {
    this.current = current;
  }
}
