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
	const input = 1364;

	const tx = 31;
	const ty = 39;

	const canGo = (x, y) => {
		let n = x*x + 3*x + 2*x*y + y + y*y;
		n += input;

		let result = 0;

		while (n > 0) {
			const left = n % 2;

			if (left === 1) {
				result++;
			}
			n = Math.floor(n / 2);
		}

		return (result % 2) === 0;
	};

	const key = (x, y) => `${x},${y}`;


	const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];

	const visited = new Set();
	const queue = [[1, 1, 0]];

	while (queue.length > 0) {
		const [x, y, step] = queue.shift();

		if (step > 50) {
			break;
		} else {
			visited.add(key(x, y));
			dirs.forEach(([dx, dy]) => {
				let nx = x + dx;
				let ny = y + dy;

				if (nx >= 0 && ny >= 0 && !visited.has(key(nx, ny)) && canGo(nx, ny)) {
					queue.push([nx, ny, step + 1]);
				}
			});
		}
	}

	console.log(visited.size);
	console.log(visited);
}

processLineByLine();
