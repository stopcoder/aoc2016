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

	const f = [];

	for await (const line of rl) {
		const chars = line.split("");

		chars.forEach((c, i) => {
			f[i] = f[i] || [];
			const j = c.charCodeAt(0) - 'a'.charCodeAt(0);
			f[i][j] = f[i][j] || 0;
			f[i][j]++;
		});
	}

	const answer = f.reduce((acc, a) => {
		let minIndex = 0;
		for (let i = 1; i < a.length; i++) {
			if (!a[minIndex]) {
				minIndex = i;
			} else if (a[i] && a[i] < a[minIndex]) {
				minIndex = i;
			}
		}
		return acc + String.fromCharCode('a'.charCodeAt(0) + minIndex);
	}, "");

	console.log(answer);
}

processLineByLine();
