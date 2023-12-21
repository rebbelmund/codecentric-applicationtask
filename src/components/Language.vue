<script setup lang="ts">
defineProps({
  name: { type: String, required: true },
  projectCount: { type: Number, required: true },
})
</script>

<template>
  <div><RouterLink :to="'/search/'+name">{{ name }}</RouterLink>: {{ projectCount }}</div>
</template>

<style scoped></style>
