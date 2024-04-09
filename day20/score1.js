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

	const ranges = [];

	for await (const line of rl) {
		const parts = line.split("-").map((part) => parseInt(part));
		ranges.push(parts);
	}

	ranges.sort((r1, r2) => r1[0] - r2[0]);

	let pos = 1;
	let p;
	let c;
	let count = 0;

	while (pos < ranges.length) {
		p = ranges[pos - 1];
		c = ranges[pos];

		if (c[0] <= p[1] + 1) {
			//overlap
			if (c[1] > p[1]) {
				p[1] = c[1];
			}
			// delete the current one
			ranges.splice(pos, 1);
		} else {
			pos++;
			count += (c[0] - p[1] - 1);
		}
	}

	console.log(ranges);

	count += (Math.pow(2, 32) - 1 - ranges[ranges.length - 1][1]);
	console.log(count);
}

processLineByLine();
