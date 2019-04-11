import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Amplify, * as AmplifyModules from 'aws-amplify';
import { AmplifyPlugin } from 'aws-amplify-vue';
import aws_exports from './aws-exports';
import env from './app.env';

Amplify.configure(aws_exports);
Vue.use(AmplifyPlugin, AmplifyModules);
Vue.config.productionTip = false

Amplify.configure({
  API: {
    graphql_endpoint: env.endpoint,
    graphql_headers: async () => ({
      'x-api-key': env.apiKey,
    })
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
