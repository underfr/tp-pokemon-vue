<script setup lang="ts">
import Fetch from "./services/fetch.vue";
</script>

<template>
  <section class="relative flex min-h-screen items-center justify-center overflow-hidden bg-base-200 p-6">
    <OpponentComponent/>
    <fetch :poke="3"/>
  </section>
</template>
