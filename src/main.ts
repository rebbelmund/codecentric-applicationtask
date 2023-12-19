import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { getMembers } from './members'
import Member from './model/Member'
// import MemberList from './model/MemberList'

getMembers().then((members: any) => {
  const memberStorage: Member[] = members
  memberStorage.forEach(mem => {
    console.log(mem.name)
    mem.languages.forEach(lang => console.log(`\t${lang.name}: ${lang.projectCount}`))
  })

  createApp(App).mount('#app')

})
