// https://github.com/mariom100o/Advent-of-Code-Solutions/blob/main/2022/day16/part1.js
const path = require("path");
const fs = require("fs");

const tunnelMap = new Map();
fs
.readFileSync(path.join(__dirname, "/../data.txt"), "utf8")
.toString()
.trim()
.split("\n")
.map((line) => {
  let neighbors = line.split(", ");
  neighbors[0] = neighbors[0].slice(-2);

  let valve = line.split(" ")[1];

  let flowRate = parseInt(line.split("=")[1].split(";")[0]);

  tunnelMap.set(valve, { neighbors, flowRate });
});
console.time("ExecutionTime");

const distanceMemo = new Map();

const distanceMemoKey = (currValve, targetValve) => {
  return currValve < targetValve
    ? currValve + targetValve
    : targetValve + currValve;
};

const nextOptimalValve = (currValve, timeLeft, contesters) => {
  let optimalValve = null;
  let value = 0;

  for (let contester of contesters) {
    let newContesters = [...contesters].filter((v) => v !== contester);
    const dist = distanceTo(currValve, contester)
    let newTime = timeLeft - dist - 1;
    if (newTime <= 0) continue;
    let score = newTime * tunnelMap.get(contester).flowRate;
    if (currValve == 'AA' && contester == 'DD') {
      console.log('AA', 'DD', newTime, dist, score)
    }
    if (currValve == 'AA' && contester == 'JJ') {
      console.log('AA', 'JJ', newTime, dist, score)
    }
    let optimal = nextOptimalValve(contester, newTime, newContesters);
    score += optimal.value;

    if (score > value) {
      optimalValve = contester;
      value = score;
    }
  }

  return { optimalValve, value };
};

const distanceTo = (currValve, targetValve) => {
  let key = distanceMemoKey(currValve, targetValve);
  if (distanceMemo.has(key)) return distanceMemo.get(key);
  let visisted = new Set();
  let queue = [currValve];
  let traveled = 0;

  while (queue.length > 0) {
    let nextQueue = [];
    for (let valve of queue) {
      if (visisted.has(valve)) continue;
      visisted.add(valve);
      if (valve === targetValve) {
        distanceMemo.set(key, traveled);
        return traveled;
      }
      for (let neighbor of tunnelMap.get(valve).neighbors) {
        nextQueue.push(neighbor);
      }
    }
    queue = nextQueue;
    traveled++;
  }
};

let contesters = [...tunnelMap.keys()].filter(
  (valve) => tunnelMap.get(valve).flowRate > 0
);

console.log(nextOptimalValve("AA", 30, contesters).value);

console.timeEnd("ExecutionTime");