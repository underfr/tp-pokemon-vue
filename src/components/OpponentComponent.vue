<script setup lang="ts">
    import { ref, onMounted } from "vue";
    // import {PokeService} from "../services/PokeService.ts";

    const pokemonTest = {
        id: 2,
        name: "Bulbazor",
        sprites: {
            front_default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpHaQeXFw2FR_yJ14tJMsVC2xwZ9_U3bRHrW2NAS8JEg&s",
            back_default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpHaQeXFw2FR_yJ14tJMsVC2xwZ9_U3bRHrW2NAS8JEg&s",
        }
    }

    // const opponentPokemon = ref<Pokemon>();
    const spriteOpponent = pokemonTest.sprites.front_default;
    const oppMaxHP = 150;
    const oppDamage = 25;
    const oppHp = ref<number>(oppMaxHP);
    // function oppAttack(){
    //     if(turns%2==0){

    //     }
    // }
</script>

<template>
    <div class="avatar">
        <div class="w-48 rounded-full ring ring-primary ring-offset-4 ring-offset-base-100 md:w-64">
            <img :src="spriteOpponent" alt="Pokemon adverse" />
        </div>
    </div>

    <div>
        <div class="mb-2 flex items-center justify-between gap-4">
            <h2 class="text-2xl font-bold">{{ pokemonTest.name }}</h2>
            <span class="badge badge-success">Niveau 12</span>
        </div>
        <progress class="progress progress-success h-4 w-full" :value="oppHp" :max="oppMaxHP"></progress>
        <div class="mt-2 flex justify-between text-sm text-base-content/60">
            <span>PV</span>
            <span>{{ oppHp }} / {{ oppMaxHP }}</span>
        </div>
    </div>
</template>

<style scoped lang="css">
</style>