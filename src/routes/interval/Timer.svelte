<script>
	import RingTimer from './RingTimer.svelte';
	import { editing, laps, work, rest } from './store';
	let counting = false;
	let working = true;
	let max = $work * 100;
	let currentLap = 1;
	let interval;
	let time = max;
	const sound = new Audio('./countdown.wav');
	sound.load();
	const soundReset = () => {
		sound.pause();
		sound.currentTime = 0;
	};
	const startTimer = () => {
		time = max;
		interval = setInterval(() => {
			time -= 1;
			const sec = Math.floor((time % 6000) / 100);
			if (working) {
				if (time === 0) {
					working = false;
					time = max = $rest * 100;
				}
			} else {
				if (time === 0) {
					if (currentLap === $laps) {
						stopTimer();
						return;
					}
					working = true;
					time = max = $work * 100;
					currentLap++;
				}
			}

			if (time === 305) {
				sound.play();
			}
		}, 10);
		counting = true;
	};

	const stopTimer = () => {
		clearInterval(interval);
		counting = false;
		soundReset();
	};

	const resetTimer = () => {
		time = max;
		currentLap = 1;
		soundReset();
	};

	const backPressed = () => {
		stopTimer();
		resetTimer();
		$editing = !$editing;
	};
</script>

<RingTimer
	vbWidth={350}
	vbHeight={350}
	radius={150}
	centerX={175}
	centerY={175}
	lineWidth={5}
	bind:remainingTime={time}
	bind:maxTime={max}
	bind:currentLap
/>

<span>
	{#if !counting}
		<button on:click={startTimer}>START</button>
	{:else}
		<button on:click={stopTimer}>STOP</button>
	{/if}

	<button on:click={resetTimer}>RESET</button>
</span>

<button on:click={backPressed}>BACK</button>

<style>
	:global(body) {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100vh;
		margin: 0;
		background-color: #223344;
	}
	@media screen and (max-width: 480px) {
		span {
			display: flex;
			flex-direction: column;
		}
	}
	span {
		margin-bottom: 50px;
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
