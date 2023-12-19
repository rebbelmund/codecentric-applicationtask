<script setup lang="ts">
// import Member from "../model/Member"
defineProps({
  name: { type: String, required: true },
})

</script>

<template>
  <div>
    {{ name }}
  </div>
</template>

<style scoped>
</style>

