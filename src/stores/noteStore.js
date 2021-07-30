import { writable } from "svelte/store"

const noteStore = () => {

    let state = {
        start: 0,
        duration: 0,
        velocity: 90,
        selected: false
    }

	const { subscribe, set, update } = writable(state)

	const methods = {
		init:  () => { /*  */ },
		reset: () => { return set(state) }
	}

	return { subscribe, set, update, ...methods }

}

export const NoteStore = noteStore()