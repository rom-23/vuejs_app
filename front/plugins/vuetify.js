import 'material-design-icons-iconfont/dist/material-design-icons.css';
import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);

const opts = {
  icons: {
    iconfont: 'md',
  },
  theme: {
    dark: true,
  },
};

export default new Vuetify(opts);
