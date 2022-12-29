// https://www.reddit.com/r/adventofcode/comments/zkpt0j/2022_day_13_part_1javascripttypescript_code_works/

import { readFileSync } from 'node:fs';

const chunks = readFileSync('test.txt', 'utf-8').trim().split('\n\n');

const packets = chunks.map((chunk) => chunk.split('\n').map((l) => JSON.parse(l)));

const compare = (left: any, right: any): any => {
  if (typeof left === 'number' && typeof right === 'number') {
    if (left < right) return 1;
    if (left > right) return -1;
    return 0;
  }
  if (Array.isArray(left) && Array.isArray(right)) {
    for (let i = 0; i < left.length; i++) {
      if (!right[i]) return -1;
      const result: any = compare(left[i], right[i]);
      if (result) return result;
    }
    if (left.length < right.length) return 1;
    else return 0;
  }
  if (typeof left === 'number') return compare([left], right);
  if (typeof right === 'number') return compare(left, [right]);
};

let sum = 0;

for (const packet of packets) {
  const left = packet[0];
  const right = packet[1];
  const result = compare(left, right);
  if (result === 1) sum += packets.findIndex((p) => p === packet) + 1;
}

console.log(sum);
