<script>
    import { Layer, t } from "svelte-canvas"
    import { TransportStore as Transport } from '../../stores/transportStore'
// import Transport from "../Transport/Transport.svelte";

    $: now = 0//await Transport.now()

    $: render = ({ context, width, height }) => {
        let ctx = context

        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(0, height)
        ctx.strokeStyle = '#000'
        ctx.stroke()
    }

</script>

<Layer {render}/>
