import fs from 'fs';
import readline from 'readline';
import jsSdsl from 'js-sdsl';
import permutation from "./permutation.js";

const { OrderedMap, PriorityQueue, LinkList, Deque } = jsSdsl;

/*
const arr = [1, 2, 3, 4, 5];
const que = new PriorityQueue(
    // initialize the incoming arr, the complexity of doing so is O(n)
    arr,
    // this will create a small root heap, the default is a large root heap
    (x, y) => x - y
);
console.log(que.pop());
*/

/*
const graph = {
	a: {b: 10, c: 100, d: 1},
	b: {c: 10},
	d: {b: 1, e: 1},
	e: {f: 1},
	f: {c: 1},
	g: {b: 1}
};
// All paths from 'a'
const paths = single_source_shortest_paths(graph, 'a');
console.log(paths);
*/

async function processLineByLine() {
	const fileStream = fs.createReadStream('input');

	const rl = readline.createInterface({
		input: fileStream,
		crlfDelay: Infinity
	});

	const delta = [[-1, 0], [0, 1], [1, 0], [0, -1]];
	const rotate = {
		R: 1,
		L: -1
	};

	let cur = 0;
	let x = 0;
	let y = 0;

	for await (const line of rl) {
		const parts = line.split(", ");
		for (let i = 0; i < parts.length; i++) {
			const ins = parts[i];
			const dir = ins[0];
			const steps = parseInt(ins.substring(1));

			cur += rotate[dir];
			cur = (cur % delta.length + delta.length) % delta.length;
			x += (delta[cur][0] * steps);
			y += (delta[cur][1] * steps);
		}
	}

	console.log(x + y);
}

processLineByLine();
