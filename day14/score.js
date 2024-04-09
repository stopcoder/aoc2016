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

	const input = "cuanljph";
	// const input = "abc";
	let index = 0;

	const findRepeatChar = (s, times) => {
		for (let i = 0; i < s.length - times; i++) {
			let pass = true;
			for (let j = 1; j < times; j++) {
				if (s[i + j] !== s[i]) {
					pass = false;
					break;
				}
			}

			if (pass) {
				return s[i];
			}
		}
	};

	const checkRepeat = (s, char, times) => {
		for (let i = 0; i < s.length - times; i++) {
			let pass = true;
			for (let j = 0; j < times; j++) {
				if (s[i + j] !== char) {
					pass = false;
					break;
				}
			}

			if (pass) {
				return true;
			}
		}

		return false;
	};

	const checks = [];

	const getMD5 = (index) => {
		if (checks[index]) {
			return checks[index];
		}

		const s = input + index;
		const check = md5(s);
		checks[index] = check;

		return check;
	}

	const keys = [];

	while (keys.length < 64) {
		const check = getMD5(index);

		const char = findRepeatChar(check, 3);
		if (char !== undefined) {
			console.log(`char: ${char}, index: ${index}`);
			for (let i = 0; i < 1000; i++) {
				const otherIndex = index + 1 + i;
				if (checkRepeat(getMD5(otherIndex), char, 5)) {
					console.log(`key: ${index}`);
					keys.push(index);
					break;
				}
			}
		}

		index++;
	}

	console.log(keys[63]);
}

processLineByLine();
