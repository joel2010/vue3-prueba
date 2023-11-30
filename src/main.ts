import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/bootstrap4-light-blue/theme.css';
import 'primeicons/primeicons.css';
import './styles/index.scss';
import { createPinia } from 'pinia';

import App from './App.vue';
import Button from 'primevue/button';
import Menubar from 'primevue/menubar';
import Menu from 'primevue/menu';
import Badge from 'primevue/badge';
import InputText from 'primevue/inputtext';
import Avatar from 'primevue/avatar';
import Ripple from 'primevue/ripple';
import Card from 'primevue/card';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import DataView from 'primevue/dataview';
import DataViewLayoutOptions from 'primevue/dataviewlayoutoptions'
import InputNumber from 'primevue/inputnumber';

import router from './router';

const pinia = createPinia();
const app = createApp(App);
app.use(PrimeVue, {
  ripple: true,
});

app.component('Button', Button);
app.component('Menubar', Menubar);
app.component('Menu', Menu);
app.component('Badge', Badge);
app.component('InputText', InputText);
app.component('Avatar', Avatar);
app.component('Card', Card);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('DataView', DataView);
app.component('DataViewLayoutOptions', DataViewLayoutOptions);
app.component('InputNumber', InputNumber);

app.directive('ripple', Ripple);
app.use(pinia);
app.use(router);
app.mount('#app');
