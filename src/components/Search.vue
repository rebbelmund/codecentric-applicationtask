<script setup lang="ts">
import { ref, computed } from 'vue'
import MemberModel from '../model//Member.ts'
import { useRoute } from 'vue-router'

// import MemberList from './MemberList.vue';
const props = defineProps({
  members: { type: Array<MemberModel>, reqired: true },
})

const route = useRoute()

const language = ref<String>(route.params.search as String)
const filteredMems = computed(() => {
  const lcLang = language.value.toLowerCase()
  return (
    props.members
      ?.filter((member) => member.languages.find((lang) => lang.name.toLowerCase() === lcLang))
      .sort((a, b) => {
        const aCount = a.languages.find((lang) => lang.name.toLowerCase() === lcLang)?.projectCount || 0
        const bCount = b.languages.find((lang) => lang.name.toLowerCase() === lcLang)?.projectCount || 0
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
        login: mem.login,
        name: mem.name || mem.login,
        projectCount: mem.languages.find((lang) => lang.name.toLowerCase() === lcLang)?.projectCount || 0,
      })) || []
  )
})
</script>

<template>
  <div>
    Language
    <input v-model="language" />
    <div v-for="mem in filteredMems" :key="mem.id">
      <router-link :to="'/member/'+mem.login">
        {{ mem.name }}: {{ mem.projectCount }}
      </router-link>
    </div>
  </div>
</template>

<style scoped>
input {
  margin: 1rem;
}
</style>
