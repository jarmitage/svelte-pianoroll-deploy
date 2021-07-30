<script>
    import { Canvas } from "svelte-canvas"
    import Roll from '../components/PianoRoll/Roll.svelte'
    import Notes from '../components/PianoRoll/Notes.svelte'
    import Playhead from '../components/PianoRoll/Playhead.svelte'

    export let width
    export let height

</script>

<style>
    #container {
        display:grid;
        justify-content: center;
    }
</style>

<div id="container">
    <Canvas width={width} height={height}>
        <Roll/>
        <Notes/>
        <Playhead/>
    </Canvas>
</div>
