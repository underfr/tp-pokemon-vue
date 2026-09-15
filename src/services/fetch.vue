<script setup lang="ts">
import { onMounted, ref } from "vue"
import {PokeService} from "./PokeService.ts";

const pokemon = ref<any>(null)

const props = defineProps<{ poke: number}>()

const service = new PokeService()

/*
* fonction random pokemon ID
function getRandomInt(min:number, max:number) {
  const minNumber = Math.ceil(min)
  const maxNumber = Math.floor(max)
  return Math.floor(
      Math.random() * (maxNumber - minNumber) + minNumber,
  )
}

const randomPoke = getRandomInt(1, 1028)
*/

onMounted(async () => {
  try {
    console.log(pokemon)
    pokemon.value = await service.fetchPokemon(props.poke)
  } catch (err) {
    console.error(err)
    pokemon.value = null
  }
})
</script>

<template>

  <!-- Pour afficher un pokemon
  <div v-if="pokemon">{{ pokemon.name }} <img :src="pokemon.sprites.other.showdown.front_shiny" alt="">
  </div>
  <div v-else>Chargement…</div>
  -->
</template>