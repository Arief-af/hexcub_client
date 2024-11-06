import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/css/app.css'
import router from './router'
import App from './App.vue'
import 'boxicons'
const app = createApp(App)
const pinia = createPinia()
import 'vue-loading-overlay/dist/css/index.css';
import FormInput from '@/components/form/Input.vue'
import FormInputFile from '@/components/form/InputFile.vue'
import FormTextArea from '@/components/form/TextArea.vue'
// import FormSelect from '@/components/form/Select.vue'
import 'aos/dist/aos.css'
app.component('FormInput', FormInput) 
app.component('TextArea', FormTextArea) 
// app.component('FormSelect', FormSelect)
app.component('FormInputFile', FormInputFile)

import axios from 'axios'
axios.defaults.baseURL = import.meta.env.VITE_API_URI;

axios.interceptors.response.use((response) => {
    return response;
  }, (error) => {
    if (error.response && error.response.status) {
      
      if (error.response.status == 401) {
        useAuthStore().clearState();
      }
      if (error.response.status == 403) {
        // router.replace('/admin/email-verification');
      }
      if (error.response.status == 400) {
        // Handle 400 error
      }
      return Promise.reject(error);
    }
    if (!error.status) {
      // Handle network error
    }
    return Promise.reject(error);
});


app.use(router)
app.use(pinia)
app.mount('#app')
