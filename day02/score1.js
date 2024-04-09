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

	let x = 2;
	let y = 0;

	let result = "";

	let keypad = [["", "", 1, "", ""], ["", 2, 3, 4, ""], [5, 6, 7, 8, 9], ["", "A", "B", "C", ""], ["", "", "D", "", ""]];

	for await (const line of rl) {
		const steps = line.split("");

		for (let i = 0; i < steps.length; i++) {
			const char = steps[i];
			let nx = x;
			let ny = y;

			if (char === "U") {
				nx--;
			} else if (char === "D") {
				nx++;
			} else if (char === "L") {
				ny--;
			} else if (char === "R") {
				ny++;
			}

			if (nx < 0)  {
				nx = 0;
			} else if (nx > 4) {
				nx = 4;
			}

			if (ny < 0)  {
				ny = 0;
			} else if (ny > 4) {
				ny = 4;
			}

			if (keypad[nx][ny]) {
				x = nx;
				y = ny;
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
