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

/*
10  9  8  7  6  5  4  3  2  1  0
                                  3
                  tc              2
               tg    rg rc cg cc  1
ee sg sc pg pc                    0
*/

/**
 * var amount = 5;
 * var emask = 1 << 10;
 *
 * for (let i = 0; i < amount; i++) {
 * 		var cmask = 1 << (2 * i);
 * 		var gmask = 1 << (2 * i + 1);
 * }
 * shift 1 to the left even times (chip), odd times ()
 */

var famount = 4;
var gamount = 5;
var emask = 1 << 10;

function serial(floors) {
	var base = 1 << 11;
	var res = 0;

	for (let i = 0; i < floors.length; i++) {
		res += (floors[floors.length - 1 - i] * Math.pow(base, i));
	}

	return res;
}

function analyse(floor) {
	var g = [];
	var c = [];
	for (let i = 0; i < gamount; i++) {
		var cmask = 1 << (2 * i);
		var gmask = 1 << (2 * i + 1);

		if (floor & cmask !== 0) {
			c.push(i);
		}

		if (floor & gmask !== 0) {
			g.push(i);
		}
	}

	return {
		g: g,
		c: c
	};
}

function nextSteps(floors) {
	var epos = floors.findIndex(function(f) {
		return f & emask !== 0
	});

	var res = [];

	[1, -1].forEach(function(delta) {
		let tpos = epos + delta;
		if (tpos >= 0 && tpos < famount) {
			let status = analyse(floors[tpos]);
			let cStatus = analyse(floors[epos]);

			// move single object
			for (let i = 0; i < gamount; i++) {
				let cmask = 1 << (2 * i);
				let gmask = 1 << (2 * i + 1);

				if (cmask & floors[epos] !== 0) {
					if (status.g.length === 0 || status.g.includes(i)) {
						let newCurrentFloor = floors[epos] - cmask;
						let newTargetFloor = floors[tpos] + cmask;

						let steps = floors.map(function(f, i) {
							if (i === epos) {
								return newCurrentFloor;
							} else if (i === tpos) {
								return newTargetFloor;
							} else {
								return f;
							}
						});

						res.push(steps);
					}
				}

				if (gmask & floors[epos] !== 0) {
					if (!cStatus.c.includes(i) || cStatus.g.length === 1) {
						let allpaired = status.c.every(function(n) {
							return n === i || status.g.includes(n);
						});

						if (allpaired) {
							let newCurrentFloor = floors[epos] - gmask;
							let newTargetFloor = floors[tpos] + gmask;

							let steps = floors.map(function(f, i) {
								if (i === epos) {
									return newCurrentFloor;
								} else if (i === tpos) {
									return newTargetFloor;
								} else {
									return f;
								}
							});

							res.push(steps);
						}
					}
				}
			}

			// move both object
			for (let i = 0; i < gamount * 2; i++) {
				for (let j = 0; j < gamount * 2; j++) {
					if (i === j) {
						continue;
					}

					let qualified = false;

					let imask = 1 << i;
					let jmask = 1 << j;

					if (imask & floors[epos] !== 0 && jmask & floors[epos] !== 0) {
						// 1 generator and 1 chip
						if ((i % 2 + j % 2) % 2 === 1) {
							if (Math.floor(i / 2) !== Math.floor(j / 2)) {
								continue;
							} else {
								// must be the same kind
								qualified = status.c.every(function(n) {
									return status.g.includes(n);
								});
							}
						} else if (i % 2 === 0) {
							// both chip
							if (status.g.length === 0 || (status.g.includes(i / 2) && status.g.includes(j / 2))) {
								qualified = true;
							}

						} else {
							// both generator
							qualified = status.c.every(function(n) {
								return n === Math.floor(i / 2) || n === Math.floor(j / 2) || status.g.includes(n);
							});
						}

						if (qualified) {
							var newCurrentFloor = floors[epos] - imask - jmask;
							var newTargetFloor = floors[tpos] + imask + jmask;

							var steps = floors.map(function(f, i) {
								if (i === epos) {
									return newCurrentFloor;
								} else if (i === tpos) {
									return newTargetFloor;
								} else {
									return f;
								}
							});

							res.push(steps);
						}

					}
				}
			}
		}
	});

	return res;
}
async function processLineByLine() {
	const floors = [0b11111000000, 0b00000101111, 0b00000010000, 0b00000000000];

	const queue = [floors, 0];
	const visited = new Set();
	let answer;

	while (queue.length) {
		const [fs, dist] = queue.shift();
		const index = serial(fs);

		if (visited.has(index)) {
			continue;
		}

		visited.add(index);
		if (fs[0] === 0b11111111111) {
			answer = dist;
			break;
		}

		const steps = nextSteps(fs);
		steps.forEach(function(newFloors) {
			queue.push([newFloors, dist + 1]);
		});
	}

	console.log(answer);
}

processLineByLine();
