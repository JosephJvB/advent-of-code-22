// https://www.reddit.com/r/adventofcode/comments/zmcn64/comment/j253zhu/
const fs = require('fs')
const data = fs.readFileSync(__dirname + '/../data.txt', 'utf8').toString().split('\n')
let sensors = [];
let beacons = [];
let allBeacons = new Set();
let notBeacons = new Set();
for (const input of data) {
const coordinates = input.match(/[+-]?\d+/g).map(Number);
sensors.push([coordinates[0], coordinates[1]]);
beacons.push([coordinates[2], coordinates[3]]);
allBeacons.add(`${coordinates[2]},${coordinates[3]}`);
}
let b = 0;
let y = 2000000;
for (s of sensors) {
    let radius = Math.abs(beacons[b][0] - s[0]) + Math.abs(beacons[b][1] - s[1]);
    let distance = Math.abs(s[1] - y);
    if (distance <= radius) {
        for (let i = s[0] - (radius - distance); i <= s[0] + (radius - distance); i++) {
            if (!allBeacons.has(`${i},${y}`)) notBeacons.add(`${i},${y}`);
        }
    }
    b++;
}
console.log(notBeacons.size+" positions cannot contain a beacon.");