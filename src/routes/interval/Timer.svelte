<script>
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

	const backPressed = () => {
		stopTimer();
		resetTimer();
		$editing = !$editing;
	};
</script>

<div class="container">
	<svg viewBox="0 0 350 350" xmlns="http://www.w3.org/2000/svg">
		<circle
			r="150"
			cx="175"
			cy="175"
			stroke="#ddeeff"
			stroke-width="5"
			fill="none"
			stroke-dasharray={943}
			stroke-dashoffset={943 * (1 - time / max)}
		/>
	</svg>
	<h2>LAP {currentLap} / {$laps}</h2>
	<h1>{formatTime(time)}</h1>
</div>

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
	.container {
		position: relative;
		width: 350px;
		height: 350px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	svg {
		position: absolute;
		width: 100%;
		height: 100%;
		transform: rotate(90deg) scaleX(-1);
	}
	h1 {
		color: #ddeeff;
		font-size: 3em;
		font-family: sans-serif;
		margin: 0;
	}
	h2 {
		color: #aabbcc;
		font-size: 2em;
		font-family: sans-serif;
		margin: 0;
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
