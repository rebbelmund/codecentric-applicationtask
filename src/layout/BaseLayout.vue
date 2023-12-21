<script setup>
</script>

<template>
  <div>
    <nav>
      <router-link to="/">List</router-link> |
      <router-link to="/search">Search</router-link>
    </nav>
    <div  class="content">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
nav {
  background-color: #22f4ae;
  padding: 1rem;
}

.content {
  padding: 1rem;
}
</style>
