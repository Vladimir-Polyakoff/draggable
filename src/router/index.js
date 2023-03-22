import Vue from 'vue'
import VueRouter from 'vue-router'
import UserId from '@/views/UserId'
import UserList from '@/views/UserList'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    name: 'user-list',
    component: UserList
  },
  {
    path: '/user/:id',
    name: 'user-id',
    component: UserId,
    params: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
