<script>

    export let min
    export let max
    export let val
    export let label
    export let step
    export let onChange

</script>

<style>
  .range {
    display: flex;
    /* justify-content: space-between; */
    width: 60%;
    margin: .5rem;
  }
  label {
    width: 150px;
  }
</style>

<div class="range">
  <label for={label.toLowerCase()}>{label}</label>
  <input
    type="range" 
    id={label.toLowerCase()} 
    min={min} 
    max={max}
    bind:value={val}
    step={step}
    on:input
  >
  {val}
</div>
