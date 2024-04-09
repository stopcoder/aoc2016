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

	const grid = [];

	for await (const line of rl) {
		grid.push(line.split(""));
	}

	let count = grid[0].reduce((acc, c) => {
		if (c === ".") {
			return acc + 1;
		} else {
			return acc;
		}
	}, 0);

	const determine = (l, m, r) => {
		let res;
		if (l === "^" && m === "^" && r !== "^") {
			res = "^";
		} else if (l !== "^" && m === "^" && r === "^") {
			res = "^";
		} else if (l === "^" && m !== "^" && r !== "^") {
			res = "^";
		} else if (l !== "^" && m !== "^" && r === "^") {
			res = "^";
		} else {
			res = ".";
		}
		return res
	};

	for (let i = 1; i < 40; i++) {
		const cl = [];
		const pl = grid[i - 1];

		for (let j = 0; j < pl.length; j++) {
			cl[j] = determine(j === 0 ? "." : pl[j - 1], pl[j], j === pl.length - 1 ? "." : pl[j + 1]);
			if (cl[j] === ".") {
				count++;
			}
		}
		grid.push(cl);
	}

	console.log(count);
}

processLineByLine();