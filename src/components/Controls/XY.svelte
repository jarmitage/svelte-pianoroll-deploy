<script>
    import { onMount } from 'svelte'
    import { ControlsStore as Controls } from '../../stores/controlsStore.js'
    import { ThemeStore as Theme } from '../../stores/themeStore'

    export let x
    export let y
    export let width
    export let height
    export let indexes

    let state = {
        radius: 5,
        rect: {},
        inset: 20,
        didMount: false,
        prevMetrics: {},
    }

    $: labels = {
        x: $Controls.labels[indexes.x],
        y: $Controls.labels[indexes.y]
    }
    $: xStep = (width-state.inset*2) / 9 // 0-indexed
    $: yStep = (height-state.inset*2) / 9 // 0-indexed

    const methods = {
        init: () => {
            // point = methods.metricsToPoint({
            //     x: $Controls.metrics[indexes.x],
            //     y: $Controls.metrics[indexes.y],
            // })
            state.didMount = true
        },
        mousemove: e => {
            if (!(e.buttons & 1)) return // mouse not down
            let newPoint = methods.svgPxToPoint(e)
            let metrics = methods.pointToMetrics(newPoint)
            if (!objEq(metrics, state.prevMetrics)) {
                let tmp = $Controls.metrics
                tmp[indexes.x] = metrics.x
                tmp[indexes.y] = metrics.y
                Controls.updateMetrics(tmp)
                // console.log('[XY]', tmp)
            }
            state.prevMetrics = metrics
        },
        svgPxToPoint: e => {
            let rectBounds = state.rect.getBoundingClientRect()
            return {
                x: e.clientX - rectBounds.left,
                y: height -state.inset*2 - (e.clientY - rectBounds.top)
            }
        },
        pointToMetrics: p => {
            return {
                x: Math.min(Math.max(Math.round(p.x / xStep) + 1,1),10),
                y: Math.min(Math.max(Math.round(p.y / yStep) + 1,1),10)
            }
        },
        metricsToPoint: m => {return {x: (m.x-1) * xStep, y: (m.y-1) * yStep}},
        mXToPX: x => (x-1) * xStep,
        mYToPY: y => (y-1) * yStep,
    }

    onMount(async () => methods.init())

    const objEq = (a,b) => {
        return JSON.stringify(a) === JSON.stringify(b)
    }

    const sty = {
        rect: {
            fill: $Theme.theme.key_w,
            stroke: 'black',
        },
        grid: {
            stroke: $Theme.theme.beat_b,
        },
        ellipse: {
            fill: `rgb(180,75,0)`,
            stroke: `#0A0A0A`,
            strokeWidth: 1,
        },
        stroke: 'black',
        text: {
            fill: 'white'
        }
    }

</script>

<style>
    #label {
        font-family: 'Arial';
        font-size: 1em;
        fill:#fff;
        font-weight: bold;
    }
</style>

{#if state.didMount}
    <div style="width: {width}px; height: {height}px">
        <svg viewBox="0 0 {width} {height}" bind:this={state.svg}>
            <g transform="translate({state.inset} {state.inset})">
                <rect
                    width="{width-state.inset*2}" 
                    height="{height-state.inset*2}" 
                    rx="{state.radius}" 
                    bind:this={state.rect}
                    style="
                        fill: {sty.rect.fill};
                        stroke: {sty.rect.stroke};"
                    on:mousemove|preventDefault={methods.mousemove}
                        />
                {#each Array(8) as row, i}
                    <line
                        x1="{(i+1)*width/11.25}" y1="{1}"
                        x2="{(i+1)*width/11.25}" y2="{height-41}"
                        stroke={sty.grid.stroke}/>
                    <line
                        x1="{1}" y1="{(i+1)*height/11.25}"
                        x2="{width-41}" y2="{(i+1)*height/11.25}"
                        stroke={sty.grid.stroke}/>
                {/each}
                <text id="label" 
                    x="{width/2-(state.inset)}" y="{height-state.inset*1.35}" 
                    text-anchor="middle" dominant-baseline="middle">{labels.x}</text>
                <text id="label" 
                    x="{-(width/2+(state.inset*1.5))}" y="{-state.inset/2.5}" 
                    transform="rotate(-90)">{labels.y}</text>
                <ellipse 
                    cx="{methods.mXToPX($Controls.metrics[indexes.x])}"
                    cy="{height-state.inset*2-methods.mYToPY($Controls.metrics[indexes.y])}" rx="{10}"
                    style="
                        fill: {sty.ellipse.fill};
                        stroke: {sty.ellipse.stroke};
                        stroke-width: {sty.ellipse.strokeWidth}"
                    on:mousemove|preventDefault={methods.mousemove}
                    />
            </g>
        </svg>
    </div>
{/if}
