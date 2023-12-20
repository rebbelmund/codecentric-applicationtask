<script setup lang="ts">
import { onMounted, ref } from 'vue'
import MemberList from './model/MemberList'
import MemberModel from './model/Member'
import BaseLayout from './layout/BaseLayout.vue'

const memList = new MemberList()
const members = ref<Array<MemberModel>>([])
onMounted(() => {
  memList.load().then((mems) => {
    members.value = mems
  })
})
</script>

<template>
  <BaseLayout>
    <router-view :members="members" />
  </BaseLayout>
</template>

<style scoped></style>
