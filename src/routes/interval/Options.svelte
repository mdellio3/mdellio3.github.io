<script>
	import NumberSelector from './NumberSelector.svelte';
	import { editing, laps, work, rest } from './store.js';
	let totalTime;
	let timeString;
	$: {
		totalTime = ($work + $rest) * $laps;
		timeString = totalWorkout();
	}

	const totalWorkout = () => {
		const minutes = Math.floor(totalTime / 60)
			.toString()
			.padStart(2, '0');
		const seconds = (totalTime % 60).toString().padStart(2, '0');
		return `${minutes}:${seconds}`;
	};

	const incrementLaps = () => ($laps += 1);
	const decrementLaps = () => ($laps -= 1);
	const incrementWork = () => ($work += 5);
	const decrementWork = () => ($work -= 5);
	const incrementRest = () => ($rest += 5);
	const decrementRest = () => ($rest -= 5);
</script>

<h1>{timeString}</h1>
<span>
	<NumberSelector
		name="LAPS"
		number={$laps}
		onIncrement={incrementLaps}
		onDecrement={decrementLaps}
	/>
	<NumberSelector
		name="WORK"
		number={$work}
		onIncrement={incrementWork}
		onDecrement={decrementWork}
	/>
	<NumberSelector
		name="REST"
		number={$rest}
		onIncrement={incrementRest}
		onDecrement={decrementRest}
	/>
</span>
{#if totalTime > 0}
	<button on:click={() => ($editing = !$editing)}>DONE</button>
{/if}

<style>
	span {
		display: flex;
		width: 80%;
		justify-content: space-between;
		margin-bottom: 50px;
	}
	h1 {
		font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode',
			Geneva, Verdana, sans-serif;
	}
	h1 {
		color: #ddeeff;
		font-size: 7em;
	}
	button {
		width: 7em;
		height: 3em;
		font-size: 2em;
		background-color: #223344;
		border: 2px solid #ddeeff;
		color: #ddeeff;
	}
	button:hover {
		background-color: #aabbcc;
		color: #223344;
		border: 2px solid #aabbcc;
	}
	button:active {
		background-color: white;
		color: #223344;
		border: 4px solid white;
	}
</style>
