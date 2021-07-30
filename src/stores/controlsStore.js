import { writable } from "svelte/store"
import { NotesStore as Notes } from './notesStore'
import { TransportStore as Transport } from './transportStore'

const controlsStore = () => {

	let state = {
		metrics: [3,8,6,10],
        labels: [
            "Rhythmic Complexity",
            "Note Range",
            "Note Density",
            "Average Interval"
        ],
        id: ""
	}

	const { subscribe, set, update } = writable(state)

	const methods = {
		init: () => { /* */ },
        updateMetrics: async (metrics) => {
            let id = metrics.join("_")      
            update(s=>{
                s.id = id
                s.metrics = metrics
                return s
            })
            methods.updateStores(id)
        },
        updateMetric: async (index, metric) => {
            let id
            update(s=>{
                s.metrics[index] = metric
                s.id = s.metrics.join("_")
                id = s.id
                return s
            })
            methods.updateStores(id)
        },
        updateStores: async id => {
            let midi = await Notes.load(id)
            Transport.start(midi)
        },
		reset: () => { return set(state) }
	}

	return { subscribe, set, update, ...methods }

}

export const ControlsStore = controlsStore()
