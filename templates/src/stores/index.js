import { observable, action } from "mobx"

export class AppStore {
  @observable num = 1;
  @observable loading = false;

  constructor() {

  }

  static getInstance() { // 单例模式
    if (!AppStore.instance) {
      AppStore.instance = new AppStore();
    }
    return AppStore.instance;
  }

  @action setLoading(loading) {
    this.loading = loading;
  }

  @action plus() {
    this.num += 1;
  }
}

const appStore = AppStore.getInstance();
const Stores = {
  appStore
}
const req = require.context('.', false, /Store$/);
req.keys().map(key => {
  const Store = req(key).default;
  console.log(key);
  const namespace = Store.namespace || key;
  appStore[namespace] = stores[namespace] = new Store(appStore);
});

export default Stores;
