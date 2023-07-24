import { createApp } from 'vue'
import App from './App.vue'

const func = ()=> {
    console.log("EEEEE");
}
func();

createApp(App).mount('#app')
