import fs from 'fs';
import readline from 'readline';
import jsSdsl from 'js-sdsl';
import permutation from "./permutation.js";
import md5 from 'md5';

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
	const id = "abbhdwsy";
	let index = 0;

	let password = new Map();

	do {
		let hash;
		do {
			hash = md5(id + index);
			index++;
		} while (hash.substring(0, 5) !== "00000");
		const code = hash.charCodeAt(5);
		if (code >= '0'.charCodeAt(0) && code <= '7'.charCodeAt(0)) {
			const key = code - '0'.charCodeAt(0);
			if (!password.has(key)) {
				password.set(code - '0'.charCodeAt(0), hash.charAt(6));
			}
		}
	} while (password.size < 8)


	const result = [...password].sort((a, b) => a[0] - b[0]).map(a => a[1]).join("");

	console.log(result);
}

processLineByLine();
