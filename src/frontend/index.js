import Vue from "vue";
import Root from './Root.vue'
import router from './router'

//instanceando la clase de vue
new Vue({
  render: h => h(Root), //renderiza el componente Root
  el:'#app', //punto de montaje de la aplicacion
  router,  //agrega routing
  template: '<Root/>',
  components:{Root}
})