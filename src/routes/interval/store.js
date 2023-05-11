import { writable } from 'svelte/store';

export let editing = writable(true);
export let laps = writable(0);
export let work = writable(0);
export let rest = writable(0);
