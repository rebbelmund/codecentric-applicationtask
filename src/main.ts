import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import MemberList from './model/MemberList'
import router from './router'

const app = createApp(App)
const memList = new MemberList()

memList.load().then((members: any) => {
  app.use(router)
  app.mount('#app')
})
