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
	const input = [
		[17, 1],
		[7, 0],
		[19, 2],
		[5, 0],
		[3, 0],
		[13, 5]
	];
	let start = 0;
	while (true) {
		const match = input.every((data, index) => {
			return (data[1] + start + index + 1) % data[0] === 0;
		});
		if (match) {
			console.log(start);
			break;
		}
		start++;
	}
}

processLineByLine();
