<script>
    import { onMount } from 'svelte'
    import { TransportStore as Transport } from '../../stores/transportStore'
    import { NotesStore as Notes } from '../../stores/notesStore'

    // import { Layer, t } from "svelte-canvas"

    // $: render = ({ context, width, height }) => {

    // }

    let didMount = false
    onMount(async () => {
        didMount = true
    })

    $: volume = 5

    const methods = {
        onStart: async (e) => await Transport.start($Notes.midi),
        onStop: async (e) => await Transport.stop(),
        onToggle: async (e) => {
            await Transport.toggle()
        },
        onPause: async (e) => await Transport.pause(),
        onVolume: async (e) => {
            console.log(e)
            await Transport.volume($Transport.volume)
        },
    }

</script>

<style>
    #container {
        /* width:80%; */
        display: grid;
        /* margin-left:35%; */
        /* margin-right:35%; */
        /* height:30px; */
        /* grid-gap: 50px; */
        /* grid-template-columns: repeat(1, 10fr); */
        justify-content: center;
    }
    #toggle {
        width: 100px;
        height: 60px;
        font-size: 3em;
        color: #fff;
        font-weight: bold;
        background-color: #2d2d2d;
        text-align: center;
        padding: 10px;
        justify-content: center;
        align-content: center;
        border-radius: 10px;
        border: solid black 1px;
    }
</style>

{#if didMount}
    <div id="container">
    <!-- Transport -->
    <!-- <input
        type="button"
        name="toggle"
        id="toggle"
        value=
        > -->
    <p id="toggle" on:click={methods.onToggle}>
        {($Transport.state === 'stopped') ? '▶' : '||'}
    </p>
    <!-- <input type="range"
        id="volume"
        min=0
        max=10
        bind:value={$Transport.volume}
        step=1
        on:input={methods.onVolume}
    /> -->
    <!-- <input
        type="button"
        name="stop"
        id="stop"
        value="Stop"
        on:click={methods.onStop}> -->
    <!-- <input
        type="button"
        name="pause"
        id="pause"
        value="Pause"
        on:click={methods.onPause}> -->
    <!-- <input
        type="button"
        name="now"
        id="now"
        value="Now"
        on:click={methods.onNow}> -->
    <!-- <input
        type="button"
        name="test"
        id="test"
        value="Test"
        on:click={methods.onTest}> -->
    <!-- <Layer {render}/> -->
    </div>
{/if}
