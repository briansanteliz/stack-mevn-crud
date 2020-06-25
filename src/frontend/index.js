import Vue from "vue";
import App from './components/App.vue'

//instanceando la clase de vue 
new Vue({
  render: h => h(App) //renderiza el componente App
}).$mount('#app') //indicando el punto de montaje del HTML