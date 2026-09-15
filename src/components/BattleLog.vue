<script setup lang="ts">
import { ref, watch, nextTick } from "vue"

export interface LogEntry {
  id: number
  type: "attaque" | "soin" | "rate" | "ko" | "fuite"
  acteur: string
  texte: string
  valeur: number
}

const props = defineProps<{
  log: LogEntry[]
}>()

const container = ref<HTMLElement | null>(null)
watch(
    () => props.log.length,
    async () => {
      await nextTick()
      if (container.value) {
        container.value.scrollTop = container.value.scrollHeight
      }
    }
)

const badgeClass: Record<LogEntry["type"], string> = {
  attaque: "badge-primary",
  soin: "badge-success",
  rate: "badge-warning",
  ko: "badge-error",
  fuite: "badge-neutral",
}
</script>

<template>
  <h1>Battle log</h1>
  <figure ref="container" class="battleLog">
    <p v-if="log.length === 0" class="text-sm opacity-60">Le combat commence…</p>
    <div v-for="entry in log" :key="entry.id" class="mb-1">
      <p class="badge" :class="badgeClass[entry.type]">
        {{ entry.acteur }} : {{ entry.texte }}
        <span v-if="entry.valeur > 0">({{ entry.valeur }} PV)</span>
      </p>
    </div>
  </figure>
</template>

<style scoped lang="css">
.battleLog {
  overflow-y: auto;
  height: 400px;
}
</style>