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
		if (!line.includes("dev")) {
			continue;
		}

		let parts = line.split(" ");

		parts = parts.filter((p) => {
			return p;
		});

		const split = parts[0].split("/")[3].split("-");
		const x = parseInt(split[1].substring(1));
		const y = parseInt(split[2].substring(1));
		grid[y] = grid[y] || [];

		for (let i = 1; i < 4; i++) {
			parts[i] = parseInt(parts[i]);
		}

		grid[y][x] = {
			size: parts[1],
			used: parts[2],
			avail: parts[3]
		};
	}

	let minColumn = 100;
	let emptyRow, emptyColumn;
	let blockRow;

	for (let row = 0; row < grid.length; row++) {
		let s = ""
		for (let column = 0; column < grid[row].length; column++) {
			let mark;
			let disk = grid[row][column];
			if (disk.used > 200) {
				mark = "#";
				minColumn = Math.min(minColumn, column);
				blockRow = row;
			} else if (disk.used === 0) {
				mark = "_";
				emptyRow = row;
				emptyColumn = column;
			} else {
				mark = ".";
			}
			s += (mark + " ");
		}
		console.log(s);
	}

	console.log(`empty: (${emptyRow}, ${emptyColumn}), block: (${blockRow}, ${minColumn}), target: (0, ${grid[0].length - 1})`);

	// block row = 15
	let step = emptyRow + (emptyColumn - (minColumn - 1)) + (grid[0].length - 2 - (minColumn - 1));
	step = step + 1 + (grid[0].length - 2) * 5;
	console.log(step);
}

processLineByLine();
