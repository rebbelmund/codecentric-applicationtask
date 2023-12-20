import MemberList from '../components/MemberList.vue'
import Search from '../components/Search.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'MemberList',
    component: MemberList,
  },
  {
    path: '/search',
    name: 'Search',
    component: Search,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
