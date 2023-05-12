<script>
	export let number;
	export let name;
	export let onIncrement;
	export let onDecrement;
</script>

<div class="container">
	<h2>{name}</h2>
	<div class="up-button" on:click={onIncrement} />
	<h1>{number}</h1>
	<div class="down-button" on:click={onDecrement} />
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
	}
	h1,
	h2 {
		font-family: sans-serif;
	}
	h2 {
		color: #aabbcc;
		font-size: 2em;
	}
	h1 {
		color: #ddeeff;
		font-size: 5em;
	}
	.up-button {
		width: 0;
		height: 0;
		border-bottom: 20px solid #aabbcc;
		border-left: 20px solid transparent;
		border-right: 20px solid transparent;
	}
	.up-button:hover {
		border-bottom: 20px solid #ddeeff;
	}
	.up-button:active {
		border-bottom: 20px solid white;
	}
	.down-button {
		width: 0;
		height: 0;
		border-top: 20px solid #aabbcc;
		border-left: 20px solid transparent;
		border-right: 20px solid transparent;
	}
	.down-button:hover {
		border-top: 20px solid #ddeeff;
	}
	.down-button:active {
		border-top: 20px solid white;
	}
</style>
