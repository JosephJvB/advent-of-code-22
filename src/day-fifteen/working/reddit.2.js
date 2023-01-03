const fs = require('fs')
const data = fs.readFileSync(__dirname + '/../data.txt', 'utf8').toString().split('\n')
// data.pop();
let sensors = [];
let beacons = [];

for (const input of data) {
    const coordinates = input.match(/[+-]?\d+/g).map(Number);
    sensors.push([coordinates[0], coordinates[1]]);
    beacons.push([coordinates[2], coordinates[3]]);
}

let y = 4000000;
for (let row = 0; row <= y; row++) {
    let ranges = [];
    for (let j = 0; j < sensors.length; j++) {
        const s = sensors[j]
        const b = beacons[j]
        let radius = Math.abs(b[0] - s[0]) + Math.abs(b[1] - s[1]);
        let distance = Math.abs(s[1] - row);
        if (distance > radius) {
            continue
        }
        // if sensor range intersects current row (y)
        // find x intercect range (not sure exactly how it works but I assume)
        let minX = Math.max(0, s[0] - (radius - distance));
        let maxX = Math.min(y, s[0] + (radius - distance));
        // range logic is confusing
        // if ranges empty, add range of this sensor and this row
        if (ranges.length == 0) {
            ranges.push([minX, maxX]);
        }
        else {
            let currentRange = [minX, maxX];
            // loop backwards on ranges
            for (let i = ranges.length - 1; i >= 0; i--) {
                const r = ranges[i]
                // 0 index min, 1 index max
                // if these x ranges don't intersect
                // update currentRange with smallest / largest (increase currentRange search left and right)
                // and delete that range - because currentRange now includes it.
                // idk man it's hard
                if (currentRange[0] <= r[1] && r[0] <= currentRange[1]) {
                    currentRange[0] = Math.min(currentRange[0], r[0]);
                    currentRange[1] = Math.max(currentRange[1], r[1]);
                    ranges.splice(i, 1);
                }
            }
            ranges.push(currentRange);
        }
    }
    if (!(ranges[0][0] === 0 && ranges[0][1] === y)) {
        let result = (ranges[1][1] + 1) * 4000000 + row;
        console.log("The tuning frequency is " + result);  
        break;
    }
}