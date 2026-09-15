<script setup lang="ts">
    import { ref, onMounted } from "vue";
    // import {PokeService} from "../services/PokeService.ts";

    // const service = new PokeService();
    // const props = defineProps<{ poke: number}>()

    // onMounted(async () => {
    //     try {
    //         console.log(pokemon);
    //         pokemon.value = await service.fetchPokemon(props.poke);
    //     } catch (err) {
    //         console.error(err)
    //         pokemon.value = null
    //     }
    // })

    const pokemonTest = {
        id: 1,
        name: "Pikachou",
        sprites: {
            front_default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDOrXNGa_FbMxGEkGoA32bnmRYN1maNLHrUvwpomYYpA&s",
            back_default: "https://i.pinimg.com/736x/d2/1a/2e/d21a2e42d5cce87163bf6ad8c0c8fcb8.jpg",
        }
    }
    // const pokemon = ref<Pokemon>();
    /*
    export interface Pokemon {
        id: number
        name: string
        types: { slot: number; type: { name: string } }[]
        moves: { move: { name: string; url: string } }[]
        sprites: {
            front_default: string | null
            back_default: string | null
            other: {
            "official-artwork": { front_default: string | null }
            showdown: { front_default: string | null; back_default: string | null }
            }
        }
    }*/
    const spritePlayer = pokemonTest.sprites.back_default;
    const maxHp = 150;
    const soin = 30;
    const damage = 18;
    const specialDamage = 45;
    const currentHp = ref<number>(maxHp);
    const turns = ref<number>(0);
    function heal(){
        if (currentHp.value<maxHp-soin){
            currentHp.value+=soin;
        } else if (currentHp.value<maxHp){
            currentHp.value=maxHp;
        }
        turns.value++;
    }

    function attack(){
        if (currentHp.value>0+damage){
            currentHp.value-=damage;
        } else if (currentHp.value>0){
            currentHp.value=0;
        }
        turns.value++;
    }

    function specialAttack(){
        if (currentHp.value>0+specialDamage){
            currentHp.value-=specialDamage;
        } else if (currentHp.value>0){
            currentHp.value=0;
        }
        turns.value++;
    }
</script>

<template>
    <div class="avatar">
        <div class="w-48 rounded-full ring ring-primary ring-offset-4 ring-offset-base-100 md:w-64">
            <img :src="spritePlayer" alt="Pokemon du joueur" />
        </div>
    </div>

    <div>
        <div class="mb-2 flex items-center justify-between gap-4">
            <h2 class="text-2xl font-bold">{{ pokemonTest.name }}</h2>
            <span class="badge badge-success">Niveau 12</span>
        </div>
        <progress class="progress progress-success h-4 w-full" :value="currentHp" :max="maxHp"></progress>
        <div class="mt-2 flex justify-between text-sm text-base-content/60">
            <span>PV</span>
            <span>{{ currentHp }} / {{ maxHp }}</span>
        </div>
    </div>
    <nav class="flex w-full flex-col gap-3 md:w-40" aria-label="Actions du joueur">
            <button class="btn btn-primary" @click="attack()">Attaquer</button>
            <button class="btn btn-secondary" @click="specialAttack()">Attaque spéciale</button>
            <button class="btn btn-accent" @click="heal()">Soin</button>
            <button class="btn btn-outline">Fuir</button>
    </nav>
</template>

<style scoped>

</style>