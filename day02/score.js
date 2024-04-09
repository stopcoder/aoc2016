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

	let x = 1;
	let y = 1;

	let result = "";

	let keypad = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

	for await (const line of rl) {
		const steps = line.split("");

		for (let i = 0; i < steps.length; i++) {
			const char = steps[i];

			if (char === "U") {
				x--;
			} else if (char === "D") {
				x++;
			} else if (char === "L") {
				y--;
			} else if (char === "R") {
				y++;
			}

			if (x < 0)  {
				x = 0;
			} else if (x > 2) {
				x = 2;
			}

			if (y < 0)  {
				y = 0;
			} else if (y > 2) {
				y = 2;
			}
		}

		result += (keypad[x][y]);
	}

	console.log(result);
}

processLineByLine();

/*
		for (let i = 0; i < TEMP.length; i++) {
		}
 */
