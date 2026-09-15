export class PokeService {
    async fetchPokemon(id: number|string) {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        if (!res.ok) throw new Error(`${res.status} sur ${id}`)
        return res.json()
    }
}