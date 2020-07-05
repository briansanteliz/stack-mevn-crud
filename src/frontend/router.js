import Vue from 'vue'
import Router from 'vue-router'
import App from './components/App.vue'
import Comp404 from './components/404.vue'

Vue.use(Router)

export default new Router({
    routes:[
       {
           path:'/404',
           component:Comp404
       },
        {
            path:'*',
            redirect: '/404',
            
        },{
            path:'/',
            component:App
        }
    ],
    mode:'history'
})