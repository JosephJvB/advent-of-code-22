const data = $0.innerText.split('\n');
data.pop();
let sensors = [];
let beacons = [];

for (const input of data) {
    const coordinates = input.match(/[+-]?\d+/g).map(Number);
    sensors.push([coordinates[0], coordinates[1]]);
    beacons.push([coordinates[2], coordinates[3]]);
}

let b = 0;
let y = 4000000;
for (let row = 0; row <= y; row++) {
    let ranges = [];
    for (s of sensors) {
        let radius = Math.abs(beacons[b][0] - s[0]) + Math.abs(beacons[b][1] - s[1]);
        let distance = Math.abs(s[1] - row);
        if (distance <= radius) {
            let minX = Math.max(0, s[0] - (radius - distance));
            let maxX = Math.min(y, s[0] + (radius - distance));
            if (ranges.length == 0) {
              ranges.push([minX, maxX]);
            }
            else {
                let currentRange = [minX, maxX];
                for (let i = ranges.length - 1; i >= 0; i--) {
                        if (currentRange[0] <= ranges[i][1] && ranges[i][0] <= currentRange[1]) {
                            currentRange[0] = Math.min(currentRange[0], ranges[i][0]);
                            currentRange[1] = Math.max(currentRange[1], ranges[i][1]);
                            ranges.splice(i, 1);
                        }
                    }
                    ranges.push(currentRange);
            }
        }
        b++;
    }
    b = 0;
    if (!(ranges[0][0] === 0 && ranges[0][1] === y)) {
        let result = (ranges[1][1] + 1) * 4000000 + row;
        console.log("The tuning frequency is " + result);  
        break;
    }
}