<script>
	import Timer from './Timer.svelte';
	import Options from './Options.svelte';
	import { editing } from './store.js';
</script>

{#if $editing}
	<Options />
{:else}
	<Timer />
{/if}

<style>
</style>
