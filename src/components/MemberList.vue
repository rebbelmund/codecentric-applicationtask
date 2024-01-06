<script setup lang="ts">
import MemberModel from '../model/Member.ts'
defineProps({
  members: { type: Array<MemberModel>, reqired: true },
})
</script>

<template>
  <div>
    <div
      v-for="member in members"
      :key="member.id"
    >
      <router-link :to="`/member/${member.login}`">
        {{ member.name || member.login }}
      </router-link>
    </div>
  </div>
</template>

<style scoped></style>
