import Client from './client';

let Utils = {
    install(Vue) {
        Vue.prototype.$client = Client;
    }
}

export default Utils;