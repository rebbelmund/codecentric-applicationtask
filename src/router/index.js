import MemberList from '../components/MemberList.vue'
import Member from '../components/Member.vue'
import Search from '../components/Search.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'MemberList',
    component: MemberList,
  },
  {
    path: '/member/:login',
    name: 'Member',
    component: Member,
  },
  {
    path: '/search/:search?',
    name: 'Search',
    component: Search,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
