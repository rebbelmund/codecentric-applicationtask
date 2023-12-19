import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import MemberList from './model/MemberList'

const memList = new MemberList()
memList.load().then((members: any) => {
  createApp(App).mount('#app')
})
