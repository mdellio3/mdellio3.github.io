<script>
	import { laps } from './store';
	export let radius;
	export let centerX;
	export let centerY;
	export let lineWidth;
	export let vbWidth;
	export let vbHeight;
	export let remainingTime;
	export let maxTime;
	export let currentLap;

	const circumference = 2 * Math.PI * radius;

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

<div class="container">
	<svg viewBox="0 0 ${vbWidth} ${vbHeight}" xmlns="http://www.w3.org/2000/svg">
		<circle
			r={radius}
			cx={centerX}
			cy={centerY}
			stroke="#ddeeff"
			stroke-width={lineWidth}
			fill="none"
			stroke-dasharray={circumference}
			stroke-dashoffset={circumference * (1 - remainingTime / maxTime)}
		/>
	</svg>
	<h2>LAP {currentLap} / {$laps}</h2>
	<h1>{formatTime(remainingTime)}</h1>
</div>

<style>
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
</style>
