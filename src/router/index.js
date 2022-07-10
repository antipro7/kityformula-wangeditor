import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Test from '../views/Test.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home // v4版本
  },
  {
    path: '/test',
    name: 'Test',
    component: Test // v5版本
  },
]

const router = new VueRouter({
  routes
})

export default router
