import { writable } from "svelte/store"

const pianoRollStore = () => {

	let state = {
		hZoom: {t1: 0, t2: 4},  // bars
        vZoom: {n1: 0, n2: 36}, // notes
        barSubdiv: 4, // 4/4
        beatSubdiv: 4, // 16ths
        lastVelocity: 90,

	}

	const { subscribe, set, update } = writable(state)

	const methods = {
		init: () => { /*  */ },
		hZoom: (notes, tpb) => {
			if (notes.length === 0) return // HACK
			let fstTick = notes[0].ticks
			let lstTick = notes[notes.length-1].ticks 
				+ notes[notes.length-1].durationTicks
			let h = {
				t1: Math.floor(fstTick / tpb),
				t2: Math.ceil(lstTick / tpb)
			}
			update(s=>{ s.hZoom = h; return s })
		},
		vZoom: (notes) => {
			if (notes.length === 0) return // HACK
			let low = 128
			let high = 0
			notes.map(n => {
				if (n.midi < low)  low  = n.midi
				if (n.midi > high) high = n.midi
			})
			let v = {
				n1: (Math.floor(low/12)-1)*12,
				n2: Math.ceil(high/12)*12
			}
			update(s=>{ s.vZoom = v; return s })
		},
		zoom: (midi) => {
			let notes = midi.tracks[0].notes
			let ppq = midi.header.ppq
			let barSubdiv = 0
			update(s=>{barSubdiv = s.barSubdiv; return s})
			let ticksPerBar = ppq * barSubdiv
			
			methods.hZoom(notes, ticksPerBar)
			methods.vZoom(notes)
		},
		reset: () => { return set(state) }
	}
	
	return { subscribe, set, update, ...methods }

}

export const PianoRollStore = pianoRollStore()
