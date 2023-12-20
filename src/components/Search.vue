<script setup lang="ts">
import { ref, computed } from 'vue'
import MemberModel from '../model//Member.ts'

// import MemberList from './MemberList.vue';
const props = defineProps({
  members: { type: Array<MemberModel>, reqired: true },
})
const language = ref<String>('')
const filteredMems = computed(() => {
  return (
    props.members
      ?.filter((member) => member.languages.find((lang) => lang.name === language.value))
      .sort((a, b) => {
        const aCount = a.languages.find((lang) => lang.name === language.value)?.projectCount || 0
        const bCount = b.languages.find((lang) => lang.name === language.value)?.projectCount || 0
        if (aCount < bCount) {
          return 1
        }
        if (aCount > bCount) {
          return -1
        }
        return 0
      })
      .map((mem) => ({
        id: mem.id,
        name: mem.name || mem.login,
        projectCount: mem.languages.find((lang) => lang.name === language.value)?.projectCount || 0,
      })) || []
  )
})
</script>

<template>
  <div>
    Language
    <input v-model="language" />
    <div v-for="mem in filteredMems" :key="mem.id">{{ mem.name }}: {{ mem.projectCount }}</div>
  </div>
</template>

<style scoped></style>
