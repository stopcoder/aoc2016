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

	const folders = [];

	for await (const line of rl) {
		if (!line.includes("dev")) {
			continue;
		}

		let parts = line.split(" ");

		parts = parts.filter((p) => {
			return p;
		});

		for (let i = 1; i < 4; i++) {
			parts[i] = parseInt(parts[i]);
		}

		folders.push(parts);
	}

	let count = 0;

	for (let i = 0; i < folders.length; i++) {
		for (let j = i + 1; j < folders.length; j++) {
			if (folders[i][2] !== 0 && (folders[i][2] <= folders[j][3])) {
				count++;
			}

			if (folders[j][2] !== 0 && (folders[j][2] <= folders[i][3])) {
				count++;
			}
		}
	}

	console.log(count);
}

processLineByLine();
