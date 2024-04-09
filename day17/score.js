import fs from 'fs';
import readline from 'readline';
import jsSdsl from 'js-sdsl';
import permutation from "./permutation.js";
import md5 from "md5";

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
	const code = "rrrbmfta";

	const getOpenDoors = (code) => {
		const hash = md5(code);

		return hash.substring(0, 4).split("").map((c) => {
			return c.charCodeAt(0) >= 'b'.charCodeAt(0);
		});
	}

	const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
	const cs = ["U", "D", "L", "R"];


	// [node, step, code, path]
	const queue = [[0, 0, code, []]];
	let result;

	while(queue.length > 0) {
		const entry = queue.shift();
		const node = entry[0];
		const step = entry[1];
		const code = entry[2];
		const path = entry[3];
		const x = Math.floor(node / 4);
		const y = node % 4;

		console.log(`checking (${x}, ${y}), visited nodes are ${path}`);

		if (node === 15) {
			result = code;
			break;
		}

		const doors = getOpenDoors(code);
		console.log(`code: ${code}, doors: ${doors}`);
		doors.forEach((open, i) => {
			if (open) {
				const nx = x + dirs[i][0];
				const ny = y + dirs[i][1];
				const nNode = nx * 4 + ny;

				if (nx >= 0 && nx < 4 && ny >= 0 && ny < 4 /*&& path.indexOf(nNode) === -1*/) {
					console.log(`adding (${nx}, ${ny})`);
					const nPath = path.slice();
					nPath.push(node);
					queue.push([nNode, step + 1, code + cs[i], nPath]);
				}
			}
		});
	}

	console.log(result.substring(code.length));
}

processLineByLine();
