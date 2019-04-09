import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Amplify, * as AmplifyModules from 'aws-amplify';
import { AmplifyPlugin } from 'aws-amplify-vue';
import aws_exports from './aws-exports';

Amplify.configure(aws_exports);
Vue.use(AmplifyPlugin, AmplifyModules);
Vue.config.productionTip = false

Amplify.configure({
  API: {
    graphql_endpoint: 'https://rdtiduxvafeevmr2u5qc5u6mue.appsync-api.us-east-2.amazonaws.com/graphql',
    graphql_headers: async () => ({
      'x-api-key': 'da2-fth5icptmrgljpg7lptccdvj5i',
    })
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
