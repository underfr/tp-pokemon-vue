<template>
  <section class="py-8 px-4">
    <h2 class="text-2xl font-bold text-center mb-6">Choisis ton Pokémon</h2>

    <form @submit.prevent="confirmSelection" class="max-w-sm mx-auto flex flex-col gap-4">
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

      <div v-if="matchedPokemon" class="card bg-base-100 shadow-md">
        <figure class="p-4 bg-base-200">
          <img :src="matchedPokemon.sprite" :alt="matchedPokemon.name" class="w-24 h-24 mx-auto" />
        </figure>
        <div class="card-body p-3 items-center text-center">
          <h3 class="card-title text-sm capitalize">{{ matchedPokemon.name }}</h3>
          <div class="flex gap-1 flex-wrap justify-center">
            <span
              v-for="type in matchedPokemon.types"
              :key="type"
              class="badge badge-sm"
              :class="typeColors[type] || 'badge-neutral'"
            >
              {{ type }}
            </span>
          </div>
        </div>
      </div>

      <button type="submit" class="btn btn-success" @click="confirmSelection">
        Choisir ce Pokémon
      </button>
    </form>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue"
import { PokeService } from "../services/PokeService"

const pokemon = ref<any>(null)

const props = defineProps<{
  poke: number
  pokemon: Array<{ name: string; sprite?: string; types?: string[] }>
}>()

const service = new PokeService()

onMounted(async () => {
  try {
    console.log(pokemon)
    pokemon.value = await service.fetchPokemon(props.poke)
  } catch (err) {
    console.error(err)
    pokemon.value = null
  }
})

const emit = defineEmits(['select'])

const inputName = ref('')
const errorMessage = ref('')

const matchedPokemon = computed(() => {
  const name = inputName.value.trim().toLowerCase()
  if (!name) return null
  return props.pokemon.find((p) => p.name.toLowerCase() === name) || null
})

watch(inputName, () => {
  if (inputName.value.trim() && !matchedPokemon.value) {
    errorMessage.value = 'Aucun Pokémon ne correspond à ce nom'
  } else {
    errorMessage.value = ''
  }
})

function confirmSelection() {
  if (matchedPokemon.value) {
    emit('select', matchedPokemon.value)
  }
}

</script>