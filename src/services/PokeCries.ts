import { ref, onMounted, watch, type Ref } from "vue"
import { PokeService } from "./PokeService"

const service = new PokeService()

export function PokeCries(id: Ref<number | string>) {
    const pokemon = ref<any>(null)
    const loading = ref(false)

    async function load() {
        loading.value = true
        try {
            pokemon.value = await service.fetchPokemon(id.value)
        } catch (err) {
            console.error(err)
            pokemon.value = null
        } finally {
            loading.value = false
        }
    }

    function playCry() {
        const url = pokemon.value?.cries?.latest
        if (!url) return
        const audio = new Audio(url)
        audio.volume = 0.5
        audio.play().catch(console.error)
    }

    onMounted(load)
    watch(id, load)

    return { pokemon, loading, playCry }
}