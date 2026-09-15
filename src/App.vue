<script setup lang="ts">
import ChoosePokemonComponent from "./components/ChoosePokemonComponent.vue";
import Fetch from "./services/fetch.vue";
import PlayerComponent from "./components/PlayerComponent.vue";
</script>

<template>
  <ChoosePokemonComponent/>
  <Fetch :poke="3"/>
  <PlayerComponent/>
</template>
