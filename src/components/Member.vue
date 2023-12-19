<script setup lang="ts">
import Language from './Language.vue'
import LanguageModel from '../model//Language.ts'

defineProps({
  name: { type: String, required: true },
  // languages: { type: Array, required: true },
    languages: { type: Array<LanguageModel>, required: true },
})
</script>

<template>
  <div>
    {{ name }}
    <Language v-for="lang in languages" :name="lang.name" :projectCount="lang.projectCount" />
  </div>
</template>

<style scoped>
</style>

