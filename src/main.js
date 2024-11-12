import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router'; // Importez le router
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';


const app = createApp(App);

const options = {
    position: 'top-right', 
    timeout: 5000, // Durée d'affichage
    closeOnClick: true,
    pauseOnHover: true, 
    draggable: true, 
};

app.use(Toast, options); 
const pinia = createPinia();
app.use(pinia);
app.use(router); 

app.mount('#app');
