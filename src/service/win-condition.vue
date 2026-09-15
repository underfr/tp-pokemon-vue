<template>
    <div>
        <canvas ref="canvasConfettis" class="fixed inset-0 pointer-events-none z-[9999]"></canvas>

        <div class="modal" :class="{ 'modal-open': etatCombat === 'VICTOIRE' }">
            <div class="relative z-[2] w-[90%] max-w-[420px] mx-auto p-6 px-5 text-center
                        bg-[#d4f0c8] border-4 border-[#202020]
                        shadow-[0_0_0_4px_#6b6b4a,8px_8px_0_0_rgba(0,0,0,0.5)]
                        [image-rendering:pixelated] font-['Press_Start_2P',_monospace]">
                <p class="text-sm leading-relaxed text-[#202020] mb-3.5 tracking-wide">FÉLICITATIONS !</p>
                <p class="text-[0.65rem] leading-loose text-[#303030] mb-5">Ta copine te quittera pas aujourd'hui.</p>
                <button @click="reinitialiser" class="font-['Press_Start_2P',_monospace] text-[0.65rem] px-4.5 py-2.5 bg-[#202020] text-[#f8f8e0] border-none cursor-pointer shadow-[4px_4px_0_0_#6b6b4a] transition-transform duration-100 active:translate-x-1 active:translate-y-1 active:shadow-none">▶ CONTINUER</button>
            </div>
            <div class="modal-backdrop bg-black/60"></div>
        </div>

        <div class="modal" :class="{ 'modal-open': etatCombat === 'DEFAITE' }">
            <div class="relative z-[2] w-[90%] max-w-[420px] mx-auto p-6 px-5 text-center
                        bg-[#f0d0d0] border-4 border-[#202020]
                        shadow-[0_0_0_4px_#6b6b4a,8px_8px_0_0_rgba(0,0,0,0.5)]
                        [image-rendering:pixelated] font-['Press_Start_2P',_monospace]">
                <p class="text-sm leading-relaxed text-[#202020] mb-3.5 tracking-wide">TU AS PERDU...</p>
                <p class="text-[0.65rem] leading-loose text-[#303030] mb-5">Tu deçois même ta grand-mère...</p>
                <button @click="reinitialiser" class="font-['Press_Start_2P',_monospace] text-[0.65rem] px-4.5 py-2.5 bg-[#202020] text-[#f8f8e0] border-none cursor-pointer shadow-[4px_4px_0_0_#6b6b4a] transition-transform duration-100 active:translate-x-1 active:translate-y-1 active:shadow-none">▶ RÉESSAYER</button>
            </div>
            <div class="modal-backdrop bg-black/60"></div>
        </div>
    </div>
</template>

<script setup>


import { ref, watch, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
    hpJoueur: { type: Number, required: true },
    hpAdversaire: { type: Number, required: true },
    abandon: { type: Boolean, default: false }
})

const emit = defineEmits(['continuer', 'rejouer'])

//fonction
const etatCombat = ref('EN_COURS')

function verifierFinCombat() {
    if (props.hpAdversaire <= 0) {
        etatCombat.value = 'VICTOIRE'
    } else if (props.hpJoueur <= 0 || props.abandon === true) {
        etatCombat.value = 'DEFAITE'
    } else {
        etatCombat.value = 'EN_COURS'
    }
}

function reinitialiser() {
    etatCombat.value = 'EN_COURS'
    emit(etatCombat.value === 'VICTOIRE' ? 'continuer' : 'rejouer')
}

// Vérifie les conditions
watch(() => [props.hpJoueur, props.hpAdversaire, props.abandon], verifierFinCombat)

watch(etatCombat, (nouvelEtat) => {
    if (nouvelEtat === 'VICTOIRE') {
        lancerConfettis()
        jouerMusique('victoire')
    } else if (nouvelEtat === 'DEFAITE') {
        jouerMusique('defaite')
    }
})

// confettis 
const canvasConfettis = ref(null)
let ctx = null
let particules = []
let animationEnCours = false
const couleursConfettis = ['#ffd166', '#2ec4b6', '#ef476f', '#06d6a0', '#118ab2']

function redimensionnerCanvas() {
    if (!canvasConfettis.value) return
    canvasConfettis.value.width = window.innerWidth
    canvasConfettis.value.height = window.innerHeight
}

function creerParticule() {
    return {
        x: Math.random() * canvasConfettis.value.width,
        y: -20,
        taille: 6 + Math.random() * 6,
        vitesseY: 2 + Math.random() * 3,
        vitesseX: -1.5 + Math.random() * 3,
        rotation: Math.random() * 360,
        vitesseRotation: -6 + Math.random() * 12,
        couleur: couleursConfettis[Math.floor(Math.random() * couleursConfettis.length)]
    }
}

function lancerConfettis() {
    if (!canvasConfettis.value) return
    particules = []
    for (let i = 0; i < 400; i++) particules.push(creerParticule())
    if (!animationEnCours) {
        animationEnCours = true
        requestAnimationFrame(animerConfettis)
    }
}

function animerConfettis() {
    ctx.clearRect(0, 0, canvasConfettis.value.width, canvasConfettis.value.height)
    particules.forEach(p => {
        p.y += p.vitesseY
        p.x += p.vitesseX
        p.rotation += p.vitesseRotation
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate((p.rotation * Math.PI) / 180)
        ctx.fillStyle = p.couleur
        ctx.fillRect(-p.taille / 2, -p.taille / 2, p.taille, p.taille * 0.6)
        ctx.restore()
    })
    particules = particules.filter(p => p.y < canvasConfettis.value.height + 20)
    if (particules.length > 0) {
        requestAnimationFrame(animerConfettis)
    } else {
        animationEnCours = false
    }
}

// effet sonore
function jouerMusique(nom) {
    if (nom === 'victoire') jouerFanfareVictoire()
    else jouerThemeDefaite()
}

function jouerFanfareVictoire() {
    const ctxAudio = new (window.AudioContext || window.webkitAudioContext)()
    const notes = [523.25, 659.25, 783.99, 1046.50]
    notes.forEach((frequence, i) => {
        const osc = ctxAudio.createOscillator()
        const gain = ctxAudio.createGain()
        osc.type = 'triangle'
        osc.frequency.value = frequence
        osc.connect(gain)
        gain.connect(ctxAudio.destination)
        const debut = ctxAudio.currentTime + i * 0.15
        gain.gain.setValueAtTime(0.0001, debut)
        gain.gain.exponentialRampToValueAtTime(0.3, debut + 0.02)
        gain.gain.exponentialRampToValueAtTime(0.0001, debut + 0.4)
        osc.start(debut)
        osc.stop(debut + 0.45)
    })
}

function jouerThemeDefaite() {
    const ctxAudio = new (window.AudioContext || window.webkitAudioContext)()
    const notes = [392.00, 349.23, 293.66, 220.00]
    notes.forEach((frequence, i) => {
        const osc = ctxAudio.createOscillator()
        const gain = ctxAudio.createGain()
        osc.type = 'sawtooth'
        osc.frequency.value = frequence
        osc.connect(gain)
        gain.connect(ctxAudio.destination)
        const debut = ctxAudio.currentTime + i * 0.35
        gain.gain.setValueAtTime(0.0001, debut)
        gain.gain.exponentialRampToValueAtTime(0.25, debut + 0.05)
        gain.gain.exponentialRampToValueAtTime(0.0001, debut + 0.6)
        osc.start(debut)
        osc.stop(debut + 0.65)
    })
}

onMounted(() => {
    ctx = canvasConfettis.value.getContext('2d')
    redimensionnerCanvas()
    window.addEventListener('resize', redimensionnerCanvas)
    verifierFinCombat()
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', redimensionnerCanvas)
})
</script>