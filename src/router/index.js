import MemberList from '../components/MemberList.vue'
import Search from '../components/Search.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

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
    history: createWebHashHistory(),
    routes,
  })
  
export default router