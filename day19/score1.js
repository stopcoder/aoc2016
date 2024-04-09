import fs from 'fs';
import readline from 'readline';
import jsSdsl from 'js-sdsl';
import {List, Item} from "linked-list";
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
	// const amount = 5;
	const amount = 3004953;

	const left = new List();
	const right = new List();

	for (let i = 0; i < amount; i++) {
		const item = new Item();
		item.p = i;
		if (i <= Math.floor(amount / 2)) {
			left.append(item);
		} else {
			right.append(item);
		}
	}

	while (left.size > 0 && right.size > 0) {
		if (left.size > right.size) {
			left.tail.detach();
		} else {
			right.head.detach();
		}

		let tmp = left.head;
		tmp.detach();
		right.append(tmp);

		tmp = right.head;
		tmp.detach();
		left.append(tmp);

		const total = left.size + right.size;
		if (total % 10000 === 0) {
			console.log(total);
		}
	}

	if (left.size > 0) {
		console.log(left.head.p + 1);
	} else {
		console.log(right.head.p + 1);
	}

}

processLineByLine();
