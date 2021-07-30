import { writable } from "svelte/store"
import { parse } from 'svg-parser'
// import { Themes } from '../themes/Themes.js'

const themeStore = () => {

	let state = {
        selected: 'coal',
        // themes: Object.keys(Themes),
        // theme: {
        //     background: '#EDEAEA',
        //     f_high: '#393B3F',
        //     f_med: '#808790',
        //     f_low: '#A3A3A4',
        //     f_inv: '#000000',
        //     b_high: '#333333',
        //     b_med: '#777777',
        //     b_low: '#DDDDDD',
        //     b_inv: '#ffffff'
        // }
        theme: {
            key_b:   '#232323',
            key_w:   '#2D2D2D',
            bar_b:   '#434343',
            bar_w:   '#4B4B4B',
            beat_b:  '#3B3B3B',
            beat_w:  '#434343',
            sub_b:   '#333333',
            sub_w:   '#3D3D3D',
            oct:     '#3A3A3A',
            oct_mid: '#333333',
        }
	}

	const { subscribe, set, update } = writable(state)

	const methods = {
		init:  () => { /*  */ },
        select: name => {
            let theme = extract(Themes[name])
            update (s => {
                s.selected = name
                s.theme = theme
                return s
            })
            console.log('[ThemeStore] Updated theme to', name)
        },
		reset: () => { return set(state) }
	}

    const extract = t => {
        const svg = parse(t)
        let theme = {}
        svg.children[0].children.map(c=>{
            theme[c.properties.id] = c.properties.fill
        })
        return theme
    }

	return { subscribe, set, update, ...methods }

}

export const ThemeStore = themeStore()
