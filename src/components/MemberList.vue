<script setup lang="ts">
import LanguageModel from '../model/Language.ts'
import MemberModel from '../model/Member.ts'
defineProps({
  members: { type: Array<MemberModel>, reqired: true },
})
</script>

<template>
  <div>
    <!-- some names are null -->
    <div
      v-for="member in members"
      :key="member.id"
      :name="member.name || member.login"
      :languages="member.languages as LanguageModel[]"
    >
      <router-link :to="`/member/${member.login}`">
        {{ member.name || member.login }}
      </router-link>
    </div>
  </div>
</template>

<style scoped></style>
