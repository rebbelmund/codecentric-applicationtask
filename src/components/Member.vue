<script setup lang="ts">
import Language from './Language.vue'
import MemberModel from '../model/Member.ts'
import { useRoute } from 'vue-router'

const props = defineProps({
  members: { type: Array<MemberModel>, reqired: true },
})

const route = useRoute()
const member = props.members?.find(mem=>mem.login === route.params.login)
</script>

<template>
  <div v-if="member">
    {{ member.name || member.login }}
    <Language v-for="lang in member.languages" :name="lang.name" :projectCount="lang.projectCount" class="language" />
  </div>
</template>

<style scoped>
.language {
  margin-left: 100px;
}
</style>
