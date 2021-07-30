import { writable } from "svelte/store"

const midiStore = () => {

	let state = {
	}

	const { subscribe, set, update } = writable(state)

	const methods = {
		init:  () => {},
		reset: () => { return set(state) }
	}

	return { subscribe, set, update, ...methods }

}

export const MidiStore = midiStore()
