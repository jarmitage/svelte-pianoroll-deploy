import { writable } from "svelte/store"
import * as Tone from 'tone'
import { NotesStore as Notes } from './notesStore'

const transportStore = () => {

    let ctxState = false

    let state = {
        state: 'stopped',
        loop: true,
        bpm: 120,
        ppq: 640,
        first: false,
    }

    let toneState = {
        synth: {},
        part: {},
        volume: {}
    }


	const { subscribe, set, update } = writable(state)

	const methods = {
		init: async () => {
            await methods.resume()
            Tone.Transport.PPQ = 640
            Tone.Transport.bpm.value = 120
            update(s=>{s.state = Tone.Transport.state;return s})
        },
        resume: async () => {
            if (!ctxState) {
                await Tone.start()
                toneState.synth = new Tone.PolySynth(Tone.Synth, {
                    oscillator: {
                        type: "fatsawtooth",
                        count: 3,
                        spread: 30
                    },
                    envelope: {
                        attack: 0.0001,
                        decay: 0.5,
                        sustain: 0.5,
                        release: 0.4,
                        attackCurve: "exponential"
                    },
                }).toDestination()
                toneState.part = new Tone.Part (function (time, value) {
                    toneState.synth.triggerAttackRelease(
                        value.name,
                        value.duration, 
                        time,
                        value.velocity
                    )
                },[]).start()
                toneState.part.loop = true
                toneState.part.loopStart = "0"
                toneState.part.loopEnd = "1:0"
                ctxState = true
            }
        },
        start: async midi => { 
            await methods.resume()
            Tone.Transport.stop()
            toneState.part.clear()
            midi.tracks[0].notes.map(n=>toneState.part.add(n.time, n))
            Tone.Transport.start()
            update(s=>{s.state = Tone.Transport.state;return s})
        },
        stop: async () => {
            await methods.resume()
            Tone.Transport.stop()
            update(s=>{s.state = Tone.Transport.state;return s})
        },
        pause: async () => {
            await methods.resume()
            Tone.Transport.pause()
        },
        toggle: async () => {
            await methods.resume()
            let first = false
            update(s=>{first = s.first;return s})
            if (first === false) {
                await methods.start(Notes.getMidi())
                first = true
            } else {
                Tone.Transport.toggle()
            }
            update(s=>{
                s.state = Tone.Transport.state;
                s.first = true
                return s
            })
        },
        volume: async val => {
            await methods.resume()
            // Tone.Transport.volume(val)
        },
		reset: () => { return set(state) }
	}

	return { subscribe, set, update, ...methods }

}

export const TransportStore = transportStore()