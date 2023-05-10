<script>
	let time = 0;
	let counting = false;
	let interval;

	const startTimer = () => {
		interval = setInterval(() => {
			time += 1;
		}, 10);
		counting = true;
	};

	const stopTimer = () => {
		clearInterval(interval);
		counting = false;
	};

	const resetTimer = () => {
		time = 0;
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

<h1>{formatTime(time)}</h1>

<span>
	{#if !counting}
		<button on:click={startTimer}>START</button>
	{:else}
		<button on:click={stopTimer}>STOP</button>
	{/if}

	<button on:click={resetTimer}>RESET</button>
</span>

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
		font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode',
			Geneva, Verdana, sans-serif;
	}
	@media screen and (max-width: 480px) {
		span {
			display: flex;
			flex-direction: column;
		}
	}
	button {
		width: 7em;
		height: 3em;
		font-size: 2em;
		background-color: #223344;
		border: 2px solid #ddeeff;
		color: #ddeeff;
	}
</style>
