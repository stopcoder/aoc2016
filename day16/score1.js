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
	const input = "11101000110010100";
	const limit = 35651584;

	let bits = input.split("");

	while (bits.length < limit) {
		const copy = bits.slice();
		copy.reverse();
		for (let i = 0; i < copy.length; i++) {
			copy[i] = copy[i] === "1" ? "0" : "1";
		}

		bits.push("0");
		bits = bits.concat(copy);
	}

	// checksum
	let sum = bits.slice(0, limit);

	while (sum.length % 2 === 0) {
		let i = 0;
		for (i = 0; i < sum.length / 2; i++) {
			if (sum[2*i] === sum[2*i + 1]) {
				sum[i] = 1;
			} else {
				sum[i] = 0;
			}
		}

		sum = sum.slice(0, i);
	}

	console.log(sum.join(""));
}

processLineByLine();
