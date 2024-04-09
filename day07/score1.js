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

	let count = 0;

	const extract = function(s) {
		const res = [];
		for (let i = 0; i < s.length - 2; i++) {
			if (s[i] === s[i+2] && s[i] !== s[i+1]) {
				res.push([s[i], s[i+1]]);
			}
		}

		return res;
	};
	const r = /\[([a-z]+)\]/g;
	for await (const line of rl) {
		let match;
		const hypernets = [];
		do {
			match = r.exec(line);
			if (match) {
				hypernets.push(match[1]);
			}
		} while (match);


		const s = line.replace(r, " ");
		const aba = extract(s);

		const found = aba.some((chars) => {
			const pattern = chars[1] + chars[0] + chars[1];
			return hypernets.some((s) => {
				return s.includes(pattern);
			});
		});

		if (found) {
			count++;
		}
	}

	console.log(count);
}

processLineByLine();
