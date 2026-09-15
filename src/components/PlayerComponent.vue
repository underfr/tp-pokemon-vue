<script setup lang="ts">
    import { ref } from "vue";


    const pokemonTest = {
        id: 1,
        name: "Pikachou",
        sprites: {
            front_default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDOrXNGa_FbMxGEkGoA32bnmRYN1maNLHrUvwpomYYpA&s",
            back_default: "https://i.pinimg.com/736x/d2/1a/2e/d21a2e42d5cce87163bf6ad8c0c8fcb8.jpg",
        }
    }
    const pokemon = ref<Pokemon>()
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
    const spritePlayer = pokemonTest.sprites.front_default;
    const maxHp = 150;
    const soin = 30;
    const currentHp = ref<number>(maxHp);
    function heal(){
        if (currentHp.value<maxHp-soin){
            currentHp.value+=soin;
        } else if (currentHp.value<maxHp){
            currentHp.value=maxHp;
        }
    }

</script>

<template>
    <div class="card w-full max-w-3xl overflow-hidden bg-base-100 shadow-2xl">
        <div class="grid items-center gap-8 p-8 md:grid-cols-[1fr_auto] md:p-12">
            <div class="space-y-6">
                <div class="avatar">
                    <div class="w-48 rounded-full ring ring-primary ring-offset-4 ring-offset-base-100 md:w-64">
                        <img :src="spritePlayer" alt="Pokemon du joueur" />
                    </div>
                </div>

                <div>
                    <div class="mb-2 flex items-center justify-between gap-4">
                        <h2 class="text-2xl font-bold">Pokemon du joueur</h2>
                        <span class="badge badge-success">Niveau 12</span>
                    </div>
                    <progress class="progress progress-success h-4 w-full" :value="currentHp" :max="maxHp"></progress>
                    <div class="mt-2 flex justify-between text-sm text-base-content/60">
                        <span>PV</span>
                        <span>{{ currentHp }} / {{ maxHp }}</span>
                    </div>
                </div>
            </div>
        </div>
        <nav class="flex w-full flex-col gap-3 md:w-40" aria-label="Actions du joueur">
                <button class="btn btn-primary">Attaquer</button>
                <button class="btn btn-secondary">Pokemon</button>
                <button class="btn btn-accent" @click="heal()">Soin</button>
                <button class="btn btn-outline">Fuir</button>
        </nav>
    </div>
</template>

<style scoped>

</style>