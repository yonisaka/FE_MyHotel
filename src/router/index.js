import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Hotels from '../views/Hotels.vue'
import Auditorium from '../views/Auditorium.vue'
import Detail from '../views/Detail.vue'
import Cart from '../views/Cart.vue'
import PesananSukses from '../views/PesananSukses.vue'
import Akun from '../views/Akun.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/hotel',
    name: 'Hotels',
    component: Hotels
  },
  {
    path: '/auditorium',
    name: 'Auditorium',
    component: Auditorium
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    component: Detail
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/pesanan-sukses',
    name: 'PesananSukses',
    component: PesananSukses
  },
  {
    path: '/akun',
    name: 'Akun',
    component: Akun
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
