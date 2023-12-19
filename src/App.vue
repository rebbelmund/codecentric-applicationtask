<script setup lang="ts">
import { onMounted, ref } from 'vue';
import MemberList from './model/MemberList'
import MemberModel from './model/Member'
import Member from './components/Member.vue'
import LanguageModel from './model//Language.ts'

const memList = new MemberList()
const members = ref<Array<MemberModel>>([])
onMounted(()=>{
  memList.load().then(mems => {
    members.value = mems
    // console.log('mems',mems)
  })
})
</script>

<template>
  <div>
    <!-- some names are null -->
    <Member v-for="member in members" :key="member.id" :name="member.name || member.login" :languages="(member.languages as LanguageModel[])" /> 
  </div>
</template>

<style scoped>

</style>

