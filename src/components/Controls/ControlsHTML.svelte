<script>

    import { onMount } from 'svelte'
    import { ControlsStore as Controls } from '../../stores/controlsStore.js'
    import Range from './Range.svelte'

    let r = { min: 1, max: 10, step: 1 }
    let smp_id = 'midi_'

    let metrics = [
        { val: $Controls.metrics[0], label: "Rhythmic Complexity" },
        { val: $Controls.metrics[1], label: "Note Range" },
        { val: $Controls.metrics[2], label: "Note Density" },
        { val: $Controls.metrics[3], label: "Average Interval" }
    ]

    onMount (async () => Controls.init())

    const methods = {
        onChange: async (e) => await Controls.update(metrics.map(m => m.val))
    }

</script>

<p>{smp_id+$Controls.id}:
    [{metrics[0].val}, 
    {metrics[1].val}, 
    {metrics[2].val}, 
    {metrics[3].val}]
</p>

{#each metrics as m}
    <Range
        min={r.min}
        max={r.max}
        step={r.step}
        bind:val={m.val}
        bind:label={m.label}
        on:input={methods.onChange}
    />
{/each}
