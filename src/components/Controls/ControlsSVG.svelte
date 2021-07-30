<script>

    import { onMount } from 'svelte'
    import { ControlsStore as Controls } from '../../stores/controlsStore.js'
    import XY from './XY.svelte'

    export let width
    export let height

    let state = {
        r: { min: 1, max: 10, step: 1 },
        svg: {},
        smp_id: 'midi_',
        metrics: [
            { val: $Controls.metrics[0], label: "Rhythmic Complexity" },
            { val: $Controls.metrics[1], label: "Note Range" },
            { val: $Controls.metrics[2], label: "Note Density" },
            { val: $Controls.metrics[3], label: "Average Interval" }
        ],
        xy: {
            size: 200,
            metricIndexes: [
                { x: 0, y: 1 },
                { x: 0, y: 2 },
                { x: 0, y: 3 },
                { x: 1, y: 2 },
                { x: 1, y: 3 },
                { x: 2, y: 3 },
            ],
        },
    }

    const methods = {
        init: () => {
            Controls.init()
        },
        metricLabelsFromIndexes: i => {
            return {
                x: state.metrics[i.x].label,
                y: state.metrics[i.y].label,
            }
        },
    }

    const sty = {
        bounds: {
            fill: 'white',
            stroke: 'black'
        },
        stroke: 'black'
    }

    onMount (async () => methods.init())

</script>

<style>
    #summary {
        display: flex;
        flex-direction: row;
        grid-gap:40px;
        text-align: center;
        justify-content: center;
        background-color: #2D2D2D;
        margin-left: 15%;
        margin-right: 15%;
        padding: 10px;
        border-radius: 10px;
        border: solid black 1px;
    }
    #metric {
        width: 15%;
        height: 140px;
        font-family: Helvetica;
        font-weight: bold;
        color: #fff;
    }
    #metric-label {
        line-height: 1.5;
    }
    #metric-val {
        padding: 0;
        margin: 0;
        font-size: 3em;
        font-weight: bold;
        color: rgb(180,75,0);
    }
    #xy {
        /* width: 100%; */
        display: grid;
        grid-gap: 20px;
        grid-template-columns: 200px 200px 200px;
        grid-template-rows: 200px;
        justify-content: center;
        /* align-items: center; */
        padding-top: 5%;
        /* padding-left: 10%; */
    }
</style>

<div id="container">
    <div id="summary">
        {#each state.metrics as metric, i}
            <div id="metric">
                <p id="metric-label">{metric.label}</p>
                <p id="metric-val">{$Controls.metrics[i]}</p>
            </div>
        {/each}
    </div>
    <div id="xy">
        {#each state.xy.metricIndexes as indexes, i}
            <XY
                x={0}
                y={0}
                bind:width={state.xy.size}
                bind:height={state.xy.size}
                bind:indexes={indexes}
                />
        {/each}
    </div>
</div>
