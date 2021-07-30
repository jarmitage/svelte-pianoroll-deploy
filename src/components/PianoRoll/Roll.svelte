<script>
    import {onMount} from 'svelte'

    import { Layer, t } from "svelte-canvas"
    import { PianoRollStore as PR } from '../../stores/pianoRollStore'
    import { ThemeStore as Theme } from '../../stores/themeStore'

    // style
    let s = {
        roll: {
            maj: { lW: 1 },
            min: { lW: 1 },
        },
    }

    let piano = [0,1,0,1,0,0,1,0,1,0,1,0]

    $: bars  = $PR.hZoom.t2 - $PR.hZoom.t1
    $: range = $PR.vZoom.n2 - $PR.vZoom.n1

    $: render = ({ context, width, height }) => {
        let ctx = context

        // background
        ctx.fillStyle = $Theme.theme.key_w
        ctx.fillRect(0,0, width, height)

        // piano lines
        for (let i = 0; i < range; i++) {
            ctx.fillStyle = $Theme.theme.key_b
            let h = height / range
            if (piano[(i-1) % 12] === 1) {
                let y = height - (i * h)
                ctx.fillRect(0, y, width, h)
            }
            
        }

        // bar lines
        for (let i = 0; i < bars + 1; i++) {
            let bar = i * (width / bars)
            ctx.lineWidth = s.roll.maj.lW
            ctx.beginPath()
            ctx.moveTo(bar, 0)
            ctx.lineTo(bar, height)
            ctx.strokeStyle = $Theme.theme.bar_b
            ctx.stroke()

            // bar subdivision
            for (let j = 0; j < $PR.barSubdiv; j++) {
                let beat = bar + j * (width / bars / $PR.barSubdiv)
                if (j !== 0) { // don't draw over bar lines
                    ctx.lineWidth = s.roll.min.lW
                    ctx.beginPath()
                    ctx.moveTo(beat, 0)
                    ctx.lineTo(beat, height)
                    ctx.strokeStyle = $Theme.theme.beat_b
                    ctx.stroke()
                }

                // beat subdivision
                for (let k = 0; k < $PR.beatSubdiv; k++) {
                    let sub = beat + k * (width / bars / $PR.barSubdiv / $PR.beatSubdiv)
                    if (k !== 0) { // don't draw over beat lines
                        ctx.lineWidth = s.roll.min.lW
                        ctx.beginPath()
                        ctx.moveTo(sub, 0)
                        ctx.lineTo(sub, height)
                        ctx.strokeStyle = $Theme.theme.sub_b
                        ctx.stroke()
                    }
                }
            }
        }

    }

    let didMount = false
    
    onMount(async () => {
        // bars = $PR.hZoom.t2 - $PR.hZoom.t1
        // range = $PR.vZoom.n2 - $PR.vZoom.n1
        // console.log($PR.hZoom, $PR.vZoom, bars, range)
        didMount = true
    })

</script>

<!-- {#if didMount} -->
    <Layer {render}/>
<!-- {/if} -->
