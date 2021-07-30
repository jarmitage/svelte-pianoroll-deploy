<script>
    import Note from './Note.svelte'
    import { onMount } from 'svelte'
    import { NotesStore as Notes } from '../../stores/notesStore'
    import { PianoRollStore as PR } from '../../stores/pianoRollStore'

    $: midi = $Notes.midi
    $: ppq = 0
    $: bpm = 0

    $: hZoom = $PR.hZoom
    $: vZoom = $PR.vZoom

    let didMount = false

    onMount(async () => {
        await Notes.init()
        ppq = $Notes.midi.header.ppq
        bpm = $Notes.midi.header.tempos[0].bpm
        didMount = true
    })

</script>

{#if didMount}
    {#each midi.tracks[0].notes as note}
        <Note 
            bind:note={note} 
            bind:ppq={ppq}
            bind:bpm={bpm}
            bind:hZoom={hZoom}
            bind:vZoom={vZoom}/>
    {/each}
{/if}
