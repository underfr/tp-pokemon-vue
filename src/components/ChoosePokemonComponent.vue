<template>
  <section class="py-8 px-4">
    <h2 class="text-2xl font-bold text-center mb-6">Choisis ton Pokémon</h2>

    <form @submit.prevent="handleSubmit()" class="max-w-sm mx-auto flex flex-col gap-4">
      <div class="form-control">
        <label class="label" for="pokemon-name">
          <span class="label-text">Nom du Pokémon</span>
        </label>
        <input
          id="pokemon-name"
          v-model="inputName"
          type="text"
          placeholder="Ex : Pikachu"
          class="input input-bordered w-full"
          :class="{ 'input-error': errorMessage }"
        />
        <label v-if="errorMessage" class="label">
          <span class="label-text-alt text-error">{{ errorMessage }}</span>
        </label>
      </div>

      <button type="submit" class="btn btn-success">
        Choisir ce Pokémon
      </button>
    </form>
  </section>
</template>

<script setup lang="ts">
import { ref, watch } from "vue"
import { PokeService } from "../services/PokeService"

const pokemon = ref<any>(null)
const service = new PokeService()

async function handleSubmit() {
  errorMessage.value = ''
  try {
    pokemon.value = await service.fetchPokemon(inputName.value)
    emit('pokemon-name', pokemon.value.name)
  } catch (err) {
    console.error(err)
    pokemon.value = null
    errorMessage.value = 'Aucun Pokémon ne correspond à ce nom'
  }
}

const inputName = ref('')
const errorMessage = ref('')
const emit = defineEmits<{'pokemon-name': string}>()

watch(inputName, () => {
  if (inputName.value.trim() && pokemon.value === null) {
    errorMessage.value = 'Aucun Pokémon ne correspond à ce nom'
  } else {
    errorMessage.value = ''
  }
})

</script>