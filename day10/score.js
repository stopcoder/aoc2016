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

	const bots = [];
	const buffers = [];
	const output = [];
	const startPoints = [];

	for await (const line of rl) {
		const parts = line.split(" ");
		if (line.startsWith("value")) {
			const index = parseInt(parts[5]);
			const value = parseInt(parts[1]);

			bots[index] = bots[index] || [];
			bots[index].push(value);

			if (bots[index].length === 2) {
				startPoints.push(index);
			}

		} else {
			const index = parseInt(parts[1]);
			const low_where = parts[5]; //either "bot" or "output"
			const low_value = parseInt(parts[6]);

			const high_where = parts[10];
			const high_value = parseInt(parts[11]);

			buffers[index] = buffers[index] || [];
			buffers[index].push([low_where, low_value, high_where, high_value]);
		}
	}

	console.log(startPoints);

	
	const queue = startPoints;

	while (queue.length > 0) {
		const cur = queue.shift();

		if (bots[cur].length > 2) {
			console.log("error " + cur);
		}

		if (bots[cur].length === 2) {
			if (Math.min.apply(null, bots[cur]) === 17 && Math.max.apply(null, bots[cur]) === 61) {
				console.log("answer = " + cur);
			}

			const give = buffers[cur] && buffers[cur].shift();
			if (give) {
				if (give[0] === "bot") {
					bots[give[1]] = bots[give[1]] || [];
					bots[give[1]].push(Math.min.apply(null, bots[cur]));
					queue.push(give[1]);
				} else {
					output[give[1]] = Math.min.apply(null, bots[cur]);
				}

				if (give[2] === "bot") {
					bots[give[3]] = bots[give[3]] || [];
					bots[give[3]].push(Math.max.apply(null, bots[cur]));
					queue.push(give[3]);
				} else {
					output[give[3]] = Math.max.apply(null, bots[cur]);
				}
				bots[cur] = [];
			}
		}
	}

	console.log(bots);
}

processLineByLine();
