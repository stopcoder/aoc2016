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

	const pixels = Array.from({length: 6}, () => {
		return Array(50);
	});


	for await (const line of rl) {
		if (line.includes("rect")) {
			const parts = line.split(" ");
			const numbers = parts[1].split("x");
			const wide = parseInt(numbers[0]);
			const tall = parseInt(numbers[1]);

			for (let row = 0; row < tall; row++) {
				for (let column = 0; column < wide; column++) {
					pixels[row][column] = 1;
				}
			}
		} else {
			const parts = line.split(" ");
			const index = parseInt(parts[2].split("=")[1]);
			const offset = parseInt(parts[4]);
			let tmp = [];
			let ni;

			if (parts[1] === "row") {
				for (let i = 0; i < 50; i++) {
					ni = (i + offset) % 50;
					tmp[ni] = pixels[index][i];
				}
				pixels[index] = tmp;
			} else {
				for (let i = 0; i < 6; i++) {
					ni = (i + offset) % 6;
					tmp[ni] = pixels[i][index];
				}
				for (let i = 0; i < 6; i++) {
					pixels[i][index] = tmp[i];
				}
			}
		}
	}

	let count = 0;

	for (let i = 0; i < 6; i++) {
		for (let j = 0; j < 50; j++) {
			if (pixels[i][j] === 1) {
				count++;
			}
		}
	}

	console.log(count);
}

processLineByLine();
