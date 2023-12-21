<script setup lang="ts">
import Language from './Language.vue'
import MemberModel from '../model/Member.ts'
import { useRoute } from 'vue-router'

const props = defineProps({
  members: { type: Array<MemberModel>, required: true},
})

const route = useRoute()
const member = props.members?.find(mem=>mem.login === route.params.login)
</script>

<template>
  <div v-if="member">
    <div class="name">
      {{ member.name || member.login }}
    </div>
    <img :src="member.avatar" class="avatar"/>
    <Language v-for="lang in member.languages" :name="lang.name" :projectCount="lang.projectCount" class="language" />
  </div>
</template>

<style scoped>
.name {
  font-weight: bold;
}
.avatar {
  height: 200px;
  margin: 20px;
}
.language {
  margin-left: 100px;
}
</style>
