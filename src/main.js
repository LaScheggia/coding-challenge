import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import {router as router} from './router'

//vuetify imports
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Fake BE
import { fakeBackend } from './helpers';
fakeBackend();

const app = createApp(App)

const vuetify = createVuetify({
  components,
  directives,
})


// app.use
app.use(createPinia());
app.use(router);
app.use(vuetify)

app.mount('#app')

