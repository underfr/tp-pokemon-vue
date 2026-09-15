<script setup lang="ts">
import PlayerComponent from "./components/PlayerComponent.vue";
import OpponentComponent from "./components/OpponentComponent.vue";
</script>

<template>
  <section class="relative flex min-h-screen items-center justify-center overflow-hidden bg-base-200 p-6">
    <div class="card w-full max-w-3xl overflow-hidden bg-base-100 shadow-2xl">
      <div class="grid items-center gap-8 p-8 md:grid-cols-[1fr_auto] md:p-12">
        <div class="space-y-6">
          <OpponentComponent/>
          <PlayerComponent/>
        </div>
      </div>
    </div>
  </section>
</template>
