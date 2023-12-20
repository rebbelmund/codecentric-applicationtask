<script setup lang="ts">
import Member from './Member.vue'
import LanguageModel from '../model//Language.ts'
import MemberModel from '../model//Member.ts'
defineProps({
    members: { type: Array<MemberModel>, reqired: true }
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

