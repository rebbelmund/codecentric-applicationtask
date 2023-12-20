<script setup>
</script>

<template>
  <div>
    <nav>
      <router-link to="/">List</router-link> |
      <router-link to="/search">Search</router-link>
    </nav>
    <slot />
  </div>
</template>

<style lang="scss" scoped>
nav {
  margin-bottom: 20px;
  background-color: #22f4ae;
  padding: 20px;
}
</style>
