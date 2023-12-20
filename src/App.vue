<script setup lang="ts">
import { onMounted, ref } from 'vue';
import MemberList from './model/MemberList'
import MemberModel from './model/Member'
// import Member from './components/Member.vue'
// import LanguageModel from './model/Language.ts'
const memList = new MemberList()
const members = ref<Array<MemberModel>>([])
onMounted(()=>{
  memList.load().then(mems => {
    members.value = mems
  })
})
</script>

<template>
  <div>
    <router-view :members="members"/>
  </div>
</template>

<style scoped>

</style>

