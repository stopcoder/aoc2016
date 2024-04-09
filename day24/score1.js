import fs from 'fs';
import readline from 'readline';
import permutation from "./permutation.js";
import jsSdsl from 'js-sdsl';


const {PriorityQueue} = jsSdsl;
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

function connectivity(x, y, g) {
	const edges = new Map();
	const queue = [[x, y, 0]];
	const visited = new Set();

	while (queue.length !== 0) {
		const [nx, ny, s] = queue.shift();
		const key = nx + "," + ny;
		if (visited.has(key)) {
			continue;
		}
		visited.add(key);
		console.log(`(${nx}, ${ny}) = ${s}`);
		const char = g[nx][ny];

		if (!"#.".includes(char) && s !== 0) {
			const index = parseInt(char);

			if (!edges.has(index)) {
				edges.set(index, s);
			}
		} else {
			const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];

			dirs.forEach((delta) => {
				const dx = nx + delta[0];
				const dy = ny + delta[1];

				if (dx >= 0 && dx < g.length && dy >= 0 && dy < g[dx].length) {
					if (g[dx][dy] !== "#") {
						queue.push([dx, dy, s + 1]);
					}
				}
			});
		}
	}

	return edges;
}

async function processLineByLine() {
	const fileStream = fs.createReadStream('input');

	const rl = readline.createInterface({
		input: fileStream,
		crlfDelay: Infinity
	});

	const g = [];
	const vs = [];

	let row = 0;

	for await (const line of rl) {
		const parts = line.split("");

		parts.forEach((char, column) => {
			if (!"#.".includes(char)) {
				const index = parseInt(char);
				vs[index] = [row, column];
			}
		});

		g.push(parts);
		row++;
	}

	console.log(vs);

	const edges = [];

	vs.forEach((v) => {
		edges.push(connectivity(v[0], v[1], g));
	});

	console.log(edges);

	//dijkstra
	const arr = [];

	// current node index, steps, bitmask, back
	arr.push([0, 0, 1, false]);

	const que = new PriorityQueue(
		// initialize the incoming arr, the complexity of doing so is O(n)
		arr,
		// this will create a small root heap, the default is a large root heap
		(x, y) => x[1] - y[1]
	);

	let answer;
	let back_visited = new Set();

	while (que.length) {
		let [index, steps, bitmask, back] = que.pop();

		if (back) {
			if (index === 0) {
				answer = steps;
				break;
			}

			if (back_visited.has(index)) {
				continue;
			}

			back_visited.add(index);
		} else {
			if (bitmask === ((1 << vs.length) - 1)) {
				back = true;
			}
		}

		const es = edges[index];

		for (const [toIndex, value] of es) {
			const new_steps = steps + value;
			let new_bitmask;
			if (back) {
				new_bitmask = bitmask;
			} else if ((bitmask & (1 << toIndex)) === 0) {
				new_bitmask = bitmask | (1 << toIndex);
			}

			if (new_bitmask !== undefined) {
				que.push([toIndex, new_steps, new_bitmask, back]);
				console.log(`${back ? 'backing' : 'visiting'} from ${index} to ${toIndex}, bitmask ${new_bitmask.toString(2)}`);
			}
		}
	}

	console.log(answer);
}

processLineByLine();
