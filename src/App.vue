<script setup lang="ts">
import PlayerComponent from "./components/PlayerComponent.vue";
</script>

<template>
  <section class="relative flex min-h-screen items-center justify-center overflow-hidden bg-base-200 p-6">
    <OpponentComponent/>
    <PlayerComponent/>
  </section>
</template>
