<script setup lang="ts">
import { ref, computed } from "vue"
import ChoosePokemonComponent from "./components/ChoosePokemonComponent.vue"
import PlayerComponent from "./components/PlayerComponent.vue"
import BattleLog, { type LogEntry } from "./components/BattleLog.vue"
import OpponentComponent from "./components/OpponentComponent.vue"
import WinCondition from "./service/win-condition.vue"
import randomAtk from "./services/RandomAtk.ts"

// --- Constantes du combat ---
const MAX_HP = 150
const DAMAGE = 18
const SPECIAL_DAMAGE = 45
const HEAL = 30
const OPP_MIN_DAMAGE = 10
const OPP_MAX_DAMAGE = 25
const RIPOSTE_DELAY = 700 // ms, laisse le temps au cri du joueur
const SPECIAL_COOLDOWN = 3
const specialCooldown = ref(0)   // 0 = disponible
const specialReady = computed(() => specialCooldown.value === 0)

// --- Refs vers les composants (pour playCry) ---
const playerRef = ref<InstanceType<typeof PlayerComponent> | null>(null)
const opponentRef = ref<InstanceType<typeof OpponentComponent> | null>(null)

// --- État global du combat ---
const playerPokemon = ref<string | null>(null)
const opponentName = ref<string>("")
const playerHp = ref<number>(MAX_HP)
const opponentHp = ref<number>(MAX_HP)
const turns = ref<number>(0)
const abandon = ref<boolean>(false)
const waitingRiposte = ref<boolean>(false)
const battleId = ref<number>(0)

const gameOver = computed(
    () => playerHp.value <= 0 || opponentHp.value <= 0 || abandon.value
)

// Boutons bloqués si combat fini, adversaire pas chargé, ou riposte en cours
const actionsDisabled = computed(
    () => gameOver.value || !opponentName.value || waitingRiposte.value
)

// --- Journal de combat ---
const battleLog = ref<LogEntry[]>([])
let nextLogId = 1

function addLog(type: LogEntry["type"], acteur: string, texte: string, valeur = 0) {
  battleLog.value.push({ id: nextLogId++, type, acteur, texte, valeur })
}

function pokemonName(name: string) {
  playerPokemon.value = name
  resetBattle()
}

function resetBattle() {
  playerHp.value = MAX_HP
  opponentHp.value = MAX_HP
  turns.value = 0
  abandon.value = false
  waitingRiposte.value = false
  opponentName.value = ""
  battleLog.value = []
  nextLogId = 1
  battleId.value++
}

function clamp(value: number) {
  return Math.min(MAX_HP, Math.max(0, value))
}

// Riposte de l'adversaire (avec cri) si le combat n'est pas terminé
function endTurn() {
  turns.value++
  if (specialCooldown.value > 0) specialCooldown.value--
  if (opponentHp.value <= 0) {
    addLog("ko", opponentName.value, "est mis K.O. !")
    return
  }

  waitingRiposte.value = true
  setTimeout(() => {
    opponentRef.value?.playCry()

    const dmg = randomAtk(OPP_MIN_DAMAGE, OPP_MAX_DAMAGE)
    playerHp.value = clamp(playerHp.value - dmg)
    addLog("attaque", opponentName.value, "riposte !", dmg)

    if (playerHp.value <= 0) {
      addLog("ko", playerPokemon.value!, "est mis K.O. !")
    }
    waitingRiposte.value = false
  }, RIPOSTE_DELAY)
}

// --- Actions du joueur ---
function onAttack() {
  if (actionsDisabled.value) return
  playerRef.value?.playCry()
  opponentHp.value = clamp(opponentHp.value - DAMAGE)
  addLog("attaque", playerPokemon.value!, "utilise Charge !", DAMAGE)
  endTurn()
}

function onSpecialAttack() {
  if (actionsDisabled.value || !specialReady.value) return

  playerRef.value?.playCry()
  opponentHp.value = clamp(opponentHp.value - SPECIAL_DAMAGE)
  addLog("attaque", playerPokemon.value!, "utilise une attaque spéciale !", SPECIAL_DAMAGE)

  specialCooldown.value = SPECIAL_COOLDOWN
  endTurn()
}

function onHeal() {
  if (actionsDisabled.value) return
  const before = playerHp.value
  playerHp.value = clamp(playerHp.value + HEAL)
  const healed = playerHp.value - before

  if (healed > 0) {
    addLog("soin", playerPokemon.value!, "récupère des PV avec Soin !", healed)
  } else {
    addLog("rate", playerPokemon.value!, "utilise Soin… mais ses PV sont déjà au max !")
  }

  endTurn()
}

function onFlee() {
  if (actionsDisabled.value) return
  addLog("fuite", playerPokemon.value!, "prend la fuite !")
  abandon.value = true
}

// --- Événements de WinCondition ---
function onContinue() {
  resetBattle()
}

function onReplay() {
  resetBattle()
  playerPokemon.value = null
}
</script>

<template>
  <ChoosePokemonComponent @pokemon-name="pokemonName" />

  <div v-if="playerPokemon !== null">
    <OpponentComponent
        ref="opponentRef"
        :key="battleId"
        :hp="opponentHp"
        :max-hp="MAX_HP"
        @loaded="opponentName = $event"
    />

    <PlayerComponent
        ref="playerRef"
        :pokemon="playerPokemon"
        :hp="playerHp"
        :max-hp="MAX_HP"
        :disabled="actionsDisabled"
        @attack="onAttack"
        @special-attack="onSpecialAttack"
        @heal="onHeal"
        @flee="onFlee"
    />

    <p class="text-sm">Tour : {{ turns }}</p>

    <BattleLog :log="battleLog" />

    <WinCondition
        :hp-joueur="playerHp"
        :hp-adversaire="opponentHp"
        :abandon="abandon"
        @continuer="onContinue"
        @rejouer="onReplay"
    />
  </div>

  <div v-else>
    Saisir un nom de pokémon
  </div>
</template>