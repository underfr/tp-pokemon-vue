<script setup lang="ts">
import { ref, watch } from "vue"
import { PokeCries } from "../services/PokeCries.ts"
import randomAtk from "../services/RandomAtk.ts"

defineProps<{
  hp: number
  maxHp: number
}>()

const emit = defineEmits<{
  (e: "loaded", name: string): void
}>()

const opponentId = ref<number>(randomAtk(1, 1026))
const { pokemon, playCry } = PokeCries(opponentId)

// Prévient App.vue dès que l'adversaire est chargé (nom pour le log)
// et joue son cri d'entrée en combat
watch(pokemon, (p) => {
  if (p) {
    emit("loaded", p.name)
    playCry()
  }
})

defineExpose({ playCry })
</script>

<template>
  <div v-if="pokemon !== null">
    <div class="avatar">
      <img :src="pokemon.sprites.other.showdown.front_default" alt="Pokemon adverse" />
    </div>

    <div>
      <div class="mb-2 flex items-center justify-between gap-4">
        <h2 class="text-2xl font-bold">{{ pokemon.name }}</h2>
        <span class="badge badge-success">Niveau 12</span>
      </div>
      <progress class="progress progress-error h-4 w-full" :value="hp" :max="maxHp"></progress>
      <div class="mt-2 flex justify-between text-sm text-base-content/60">
        <span>PV</span>
        <span>{{ hp }} / {{ maxHp }}</span>
      </div>
    </div>
  </div>
  <div v-else>
    Chargement…
  </div>
</template>

<style scoped lang="css">
</style>