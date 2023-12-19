<script setup lang="ts">
import { onMounted, ref } from 'vue';
import MemberList from './model/MemberList'
import MemberModel from './model/Member'
import MemberComponent from './components/Member.vue'

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
    <MemberComponent v-for="member in members" :key="member.id" :name="member.name" />
  </div>
</template>

<style scoped>
</style>

