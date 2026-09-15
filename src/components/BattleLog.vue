<template>
  <h1>Battle log</h1>
  <figure class="battleLog" >
    <div v-for="value in battleLog" :key="value.id">
      <div class="attaque">
        <p v-if="value.type === 'attaque'" class=" badge badge-primary"> Le pokemon : {{ value.acteur }} Utilise : {{
          value.texte }}</p>
      </div>
      <div class="soin">
        <p v-if="value.type === 'soin'" class=" badge badge-success"> Le pokemon : {{ value.acteur }} Utilise : {{
          value.texte }}</p>
      </div>
      <div class="rate">
        <p v-if="value.type === 'rate'" class=" badge badge-warning"> Le pokemon : {{ value.acteur }} Utilise : {{
          value.texte }}</p>
      </div>
      <div class="ko">
        <p v-if="value.type === 'ko'" class=" badge badge-error"> Le pokemon : {{ value.acteur }} {{
          value.texte }}</p>
      </div>

    </div>
  </figure>
</template>

<script setup lang='js'>
import { ref, computed, watch, onMounted, onUpdated, onBeforeUnmount } from 'vue'

const battleLog = ref([
  { id: 1, type: 'attaque', acteur: 'Pikachu', texte: 'Attaque Éclair !', valeur: 24 },
  { id: 2, type: 'soin', acteur: 'Bulbizarre', texte: 'Bulbizarre récupère des PV avec Synthèse !', valeur: 15 },
  { id: 3, type: 'attaque', acteur: 'Salamèche', texte: 'Salamèche utilise Griffe !', valeur: 8 },
  { id: 4, type: 'rate', acteur: 'Carapuce', texte: 'Carapuce utilise Écume... mais ça échoue !', valeur: 0 },
  { id: 5, type: 'soin', acteur: 'Pikachu', texte: 'Pikachu utilise Repos !', valeur: 30 },
  { id: 6, type: 'ko', acteur: 'Salamèche', texte: 'Salamèche est mis K.O. !', valeur: 0 },
  { id: 6, type: 'ko', acteur: 'Salamèche', texte: 'Salamèche est mis K.O. !', valeur: 0 },
  { id: 6, type: 'ko', acteur: 'Salamèche', texte: 'Salamèche est mis K.O. !', valeur: 0 },
  { id: 6, type: 'ko', acteur: 'Salamèche', texte: 'Salamèche est mis K.O. !', valeur: 0 },
  { id: 6, type: 'ko', acteur: 'Salamèche', texte: 'Salamèche est mis K.O. !', valeur: 0 },
  { id: 6, type: 'ko', acteur: 'Salamèche', texte: 'Salamèche est mis K.O. !', valeur: 0 },
  { id: 6, type: 'ko', acteur: 'Salamèche', texte: 'Salamèche est mis K.O. !', valeur: 0 },
  { id: 6, type: 'ko', acteur: 'Salamèche', texte: 'Salamèche est mis K.O. !', valeur: 0 },
  { id: 6, type: 'ko', acteur: 'Salamèche', texte: 'Salamèche est mis K.O. !', valeur: 0 },
  { id: 6, type: 'ko', acteur: 'Salamèche', texte: 'Salamèche est mis K.O. !', valeur: 0 },
  { id: 6, type: 'ko', acteur: 'Salamèche', texte: 'Salamèche est mis K.O. !', valeur: 0 },
  { id: 6, type: 'ko', acteur: 'Salamèche', texte: 'Salamèche est mis K.O. !', valeur: 0 },
  { id: 6, type: 'ko', acteur: 'Salamèche', texte: 'Salamèche est mis K.O. !', valeur: 0 },
  { id: 6, type: 'ko', acteur: 'Salamèche', texte: 'Salamèche est mis K.O. !', valeur: 0 },
  { id: 6, type: 'ko', acteur: 'Salamèche', texte: 'Salamèche est mis K.O. !', valeur: 0 },
  { id: 6, type: 'ko', acteur: 'Salamèche', texte: 'Salamèche est mis K.O. !', valeur: 0 },
  { id: 6, type: 'ko', acteur: 'Salamèche', texte: 'Salamèche est mis K.O. !', valeur: 0 },
  { id: 6, type: 'ko', acteur: 'Salamèche', texte: 'Salamèche est mis K.O. !', valeur: 0 },
  { id: 6, type: 'ko', acteur: 'Salamèche', texte: 'Salamèche est mis K.O. !', valeur: 0 },
  { id: 6, type: 'ko', acteur: 'Salamèche', texte: 'Salamèche est mis K.O. !', valeur: 0 },
  { id: 6, type: 'ko', acteur: 'Salamèche', texte: 'Salamèche est mis K.O. !', valeur: 0 },
  { id: 6, type: 'ko', acteur: 'Salamèche', texte: 'Salamèche est mis K.O. !', valeur: 0 },
  { id: 6, type: 'ko', acteur: 'Salamèche', texte: 'Salamèche est mis K.O. !', valeur: 0 },
  { id: 6, type: 'ko', acteur: 'Salamèche', texte: 'Salamèche est mis K.O. !', valeur: 0 },
])


</script>

<style scoped lang="css">
.battleLog {
  overflow-y: scroll;
  height: 400px;
}
</style>