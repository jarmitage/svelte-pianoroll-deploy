import { writable } from "svelte/store"
import { Midi } from '@tonejs/midi'
import { PianoRollStore as PR } from './pianoRollStore'

const notesStore = () => {

	let state = {
		midi: {},
		id: "3_8_6_10",
	}

	const { subscribe, set, update } = writable(state)

	const methods = {
		init: async () => {
			let id
			update(s => {
				id = s.id
				return s 
			})
			await methods.load(id)
		},
		load: async (id) => {
			const midi = await Midi.fromUrl('./midi_LSR/midi_'+id+'.mid')
			// console.log('load',id, midi.tracks[0].notes)
			update(s=>{
				s.midi = midi;
				s.id = id;
				return s
			})
			PR.zoom(midi)
			return midi
		},
		getMidi: () => {
            let midi
            update(s=>{midi=s.midi;return s;})
            return midi
        },
		reset: () => { return set(state) }
	}

	return { subscribe, set, update, ...methods }

}

export const NotesStore = notesStore()
