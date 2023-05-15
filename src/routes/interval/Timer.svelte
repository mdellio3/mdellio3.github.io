<script>
	import { editing, laps, work, rest } from './store';
	let time = 0;
	let counting = false;
	let working = true;
	let max = $work * 100;
	let currentLap = 1;
	let interval;
	const startTimer = () => {
		time = max;
		interval = setInterval(() => {
			const sec = Math.floor((time % 6000) / 100);
			if (working) {
				if (sec === 0) {
					working = false;
					time = max = $rest * 100;
				} else {
					time -= 1;
				}
			} else {
				if (sec === 0) {
					if (currentLap === $laps) {
						stopTimer();
						return;
					}
					working = true;
					time = max = $work * 100;
					currentLap++;
				} else {
					time -= 1;
				}
			}

			if (time === 405) {
				const sound = new Audio('./countdown.wav');
				sound.play();
			}
		}, 10);
		counting = true;
	};

	const stopTimer = () => {
		clearInterval(interval);
		counting = false;
	};

	const resetTimer = () => {
		time = 0;
		currentLap = 1;
	};

	const formatTime = (time) => {
		const minutes = Math.floor(time / 6000)
			.toString()
			.padStart(2, '0');
		const seconds = Math.floor((time % 6000) / 100)
			.toString()
			.padStart(2, '0');
		const centis = (time % 100).toString().padStart(2, '0');
		return `${minutes}:${seconds}.${centis}`;
	};
</script>

<h2>LAP {currentLap} / {$laps}</h2>
<h1>{formatTime(time)}</h1>

<span>
	{#if !counting}
		<button on:click={startTimer}>START</button>
	{:else}
		<button on:click={stopTimer}>STOP</button>
	{/if}

	<button on:click={resetTimer}>RESET</button>
</span>

<button on:click={() => ($editing = !$editing)}>BACK</button>

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
	h1 {
		color: #ddeeff;
		font-size: 5em;
		font-family: sans-serif;
	}
	h2 {
		color: #aabbcc;
		font-size: 2em;
		font-family: sans-serif;
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
