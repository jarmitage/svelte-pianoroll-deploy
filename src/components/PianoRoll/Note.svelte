<script>
    import { Layer, t } from "svelte-canvas"
    import { PianoRollStore as PR } from '../../stores/pianoRollStore'

    export let note
    export let ppq
    export let bpm
    export let hZoom
    export let vZoom

    $: v = note.velocity * 127

    const r = () => v * 2,
          g = () => (v < 64) ? v*4 : 255-(v*2),
          b = () => 100 - (v * 2),
          c = () => `rgb(${r()},${g()},${b()})`

    $: render = ({ context, width, height }) => {
        let ctx = context

        ctx.lineWidth = 1
        ctx.strokeStyle = '#000'
        ctx.fillStyle = c()

        let ticksPerBar = ppq * $PR.barSubdiv
        let bars = hZoom.t2 - hZoom.t1
        let ticksOffset = ticksPerBar * hZoom.t1
        let sub = (width / bars / $PR.barSubdiv)

        let range = vZoom.n2 - vZoom.n1
        let key = height / range

        let x = (note.ticks - ticksOffset)/ppq * sub
        let y = height - (note.midi - vZoom.n1) * key
        let w = (note.durationTicks)/ppq * sub
        let h = key

        ctx.fillRect(x, y, w, h)
        ctx.strokeRect(x, y, w, h)
    }

</script>

<Layer {render}/>
