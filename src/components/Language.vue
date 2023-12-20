<script setup lang="ts">
defineProps({
  name: { type: String, required: true },
  projectCount: { type: Number, required: true },
})
</script>

<template>
  <div>{{ name }}: {{ projectCount }}</div>
</template>

<style scoped></style>
