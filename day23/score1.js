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
	let a = 12;
	let b = a;
	b--;
	let c;
	let d;
	do {
		d = a;
		a = 0;

		do {
			c = b;

			a = a + c;
			c = 0;

			d--;
		} while (d !== 0);

		b--;
		c = b;
		d = c;

		c = c + d;
		d = 0;

		console.log(c);
	} while (c !== 2);

	c = 95;
	do {
		d = 95;
		a = a + d;
		d = 0;
		c--;
	} while (c !== 0);

	console.log(a);

}

processLineByLine();
