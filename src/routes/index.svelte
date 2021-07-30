<script>

    import PianoRoll from '../layouts/PianoRoll.svelte'
    import Controls from '../layouts/Controls.svelte'
    import Transport from '../components/Transport/Transport.svelte'
    import { TransportStore as TP } from '../stores/transportStore'

    let pianoRollWidth = 640
    let pianoRollHeight = 640

    let controlsWidth = 640
    let controlsHeight = 640

</script>

<style>
    #container {
        width: 100%;
        height:100%;
    }
    #title{
        margin-top: 20px;
    }
    h1 {
        font-family: Helvetica;
        text-align: center;
        color: #fff;
        font-weight: bold;
    }
    #row {
        /* width: 100%; */
        padding-top:20px;
        display: grid;
        grid-template-columns: repeat(2, 5fr);
    }
    #transport{
        margin-top: 50px;
        /* height: 50px; */
    }
</style>

<div id="container">
    <div id="title">
        <h1>Musical Regularisation of Latent Space</h1>
    </div>
    <div id="row">
        <Controls width={controlsWidth} height={controlsHeight}/>
        <PianoRoll width={pianoRollWidth} height={pianoRollHeight}/>
    </div>
    <div id="transport">
        <Transport/>
    </div>
</div>
