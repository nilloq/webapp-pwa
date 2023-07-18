<script setup>
const user = useSupabaseUser()
</script>

<template>
  <h1>Account</h1>
  <div class="container" style="padding: 50px 0 100px 0">
    <AuthAccount v-if="user" />
    <AuthForm v-else />
  </div>
</template>