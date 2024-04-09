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

const moves = [7, 7, 2, 6, 1, 5, 0, 4];

async function processLineByLine() {
	const fileStream = fs.createReadStream('input');

	const rl = readline.createInterface({
		input: fileStream,
		crlfDelay: Infinity
	});

	const input = "fbgdceah".split("");

	const rotate = function(input, offset) {
		const res = [];
		let newIndex;
		for (let i = 0; i < input.length; i++) {
			newIndex = ((i + offset) % input.length + input.length) % input.length;
			res[newIndex] = input[i];
		}
		return res;
	};

	const swapPos = function(input, x, y) {
		const tmp = input[y];
		input[y] = input[x];
		input[x] = tmp;
		return input;
	};

	const swapChar = function(input, x, y) {
		for (let i = 0; i < input.length; i++) {
			let char = input[i];
			if (char === x) {
				input[i] = y;
			} else if (char === y){
				input[i] = x;
			}
		}

		return input;
	};

	const reverse = function(input, from, to) {
		const end = Math.floor((from + to) / 2);

		for (let i = from; i <= end; i++) {
			const tmp = input[i];
			input[i] = input[from + to - i];
			input[from + to - i] = tmp;
		}

		return input;
	};

	let tmp = input;
	let steps = [];

	for await (const line of rl) {
		steps.push(line);
	}

	steps.reverse();

	for (let i = 0; i < steps.length; i++) {
		const line = steps[i];

		const parts = line.split(" ");
		if (line.includes("rotate")) {
			if (line.includes("based on")) {
				// rotate based on position of letter x
				// DONE
				const char = parts[6];
				let index = tmp.indexOf(char);
				tmp = rotate(tmp, moves[index]);
			} else {
				const offset = parseInt(parts[2]) * (parts[1] === "left" ? 1 : -1);
				tmp = rotate(tmp, offset);
				// Done
				// rotate left/right x steps
			}
		} else if (line.includes("swap")) {
			if (line.includes("position")) {
				// swap position x with position y
				// NO NEED
				const p1 = parseInt(parts[2]);
				const p2 = parseInt(parts[5]);
				tmp = swapPos(tmp, p1, p2);
			} else {
				// swap letter x with letter y
				// NO NEED
				const c1 = parts[2];
				const c2 = parts[5];
				tmp = swapChar(tmp, c1, c2);
			}
		} else if (line.includes("reverse")) {
			// reverse position x through y
			// NO NEED
			const p1 = parseInt(parts[2]);
			const p2 = parseInt(parts[4]);
			tmp = reverse(tmp, p1, p2);
		} else if (line.includes("move")) {
			// move position x to position y
			// DONE
			const p1 = parseInt(parts[2]);
			const p2 = parseInt(parts[5]);

			const deleted = tmp.splice(p2, 1);
			tmp.splice(p1, 0, deleted[0]);
		}
	}

	console.log(tmp.join(""));
}

processLineByLine();
