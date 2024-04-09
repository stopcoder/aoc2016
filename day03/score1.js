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

	const lines = [];

	for await (const line of rl) {
		const parts = line.trim().split("  ").filter(s => s !== "").map(s => parseInt(s));
		lines.push(parts);
	}

	const groupCount = lines.length / 3;
	const tris = [];

	for (let i = 0; i < groupCount; i++) {
		for (let j = 0; j < 3; j++) {
			tris.push([lines[i*3][j], lines[i*3+1][j], lines[i*3+2][j]]);
		}
	}

	let count = 0;
	for (let i = 0; i < tris.length ; i++) {
		const edges = tris[i];
		edges.sort((a, b) => a - b);

		if (edges[0] + edges[1] > edges[2]) {
			count++;
		}
	}

	console.log(count);
}

processLineByLine();
