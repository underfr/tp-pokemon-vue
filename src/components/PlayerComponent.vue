<script setup lang="ts">
import { toRef } from "vue"
import { PokeCries } from "../services/PokeCries.ts"

const props = defineProps<{
  pokemon: string
  hp: number
  maxHp: number
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: "attack"): void
  (e: "special-attack"): void
  (e: "heal"): void
  (e: "flee"): void
}>()

// Charge le Pokémon + fournit playCry()
const { pokemon: pokemonData, playCry } = PokeCries(toRef(props, "pokemon"))

// Permet à App.vue d'appeler playerRef.value.playCry()
defineExpose({ playCry })
</script>

<template>
  <div v-if="pokemonData">
    <div class="avatar">
      <img :src="pokemonData.sprites.other.showdown.back_default" alt="Pokemon du joueur" />
    </div>

    <div>
      <div class="mb-2 flex items-center justify-between gap-4">
        <h2 class="text-2xl font-bold">{{ pokemonData.name }}</h2>
        <span class="badge badge-success">Niveau 12</span>
      </div>
      <progress class="progress progress-success h-4 w-full" :value="hp" :max="maxHp"></progress>
      <div class="mt-2 flex justify-between text-sm text-base-content/60">
        <span>PV</span>
        <span>{{ hp }} / {{ maxHp }}</span>
      </div>
    </div>

    <div class="flex w-full flex-col gap-3 md:w-40" aria-label="Actions du joueur">
      <button type="button" class="btn btn-primary" :disabled="disabled" @click="emit('attack')">
        Attaquer
      </button>
      <button type="button" class="btn btn-secondary" :disabled="disabled" @click="emit('special-attack')">
        Attaque spéciale
      </button>
      <button type="button" class="btn btn-accent" :disabled="disabled" @click="emit('heal')">
        Soin
      </button>
      <button type="button" class="btn btn-outline" :disabled="disabled" @click="emit('flee')">
        Fuir
      </button>
    </div>
  </div>
  <div v-else>
    Chargement…
  </div>
</template>

<style scoped>
</style>