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

	const shiftWords = (words, offset) => {
		const res = [];
		offset = offset % 26;
		const charCodeA = 'a'.charCodeAt(0);
		for (let i = 0; i < words.length; i++) {
			let s = "";
			for (let j = 0; j < words[i].length; j++) {
				const char = words[i][j];
				s += (String.fromCharCode((char.charCodeAt(0) - charCodeA + offset) % 26 + charCodeA));
			}
			res.push(s);
		}
		return res;
	};

	for await (const line of rl) {
		const parts = line.split("-");
		const last = parts[parts.length - 1];

		const index = last.indexOf("[");
		const num = parseInt(last.substring(0, index));
		const veri = last.substring(index + 1, last.length - 1);


		const f = Array.from({length: 26}, (value, index) => {
			return {
				index: index,
				count: 0
			};
		});
		for (let i = 0; i < parts.length - 1; i++) {
			for (let j = 0; j < parts[i].length; j++) {
				const c = parts[i][j];
				const pos = c.charCodeAt(0) - 'a'.charCodeAt(0);
				f[pos].count++;
			}
		}

		f.sort((a, b) => {
			if (a.count !== b.count) {
				return b.count - a.count;
			} else {
				return a.index - b.index;
			}
		});

		let checksum = "";
		for (let i = 0; i < 5; i++) {
			checksum += (String.fromCharCode('a'.charCodeAt(0) + f[i].index));
		}

		if (checksum === veri) {
			const words = shiftWords(parts.slice(0, parts.length - 1), num);
			const sentence = words.join(" ");

			if (sentence === "northpole object storage") {
				console.log(num);
			}
		}
	}

	// console.log(answer);
}

processLineByLine();
