// https://tranzystorek-io.github.io/paste/#XQAAAQDpDAAAAAAAAAA9iImGVD/UQZfk+oJTfwg2/VsJ0DpNkr2zGUvTQlsh3wS86ErCiIs+8hruVNP959haYO3PyEx/fKf11+lj2uPBdBP0I7u4UdmpmmgqvG6pdZvvT6YkslZQId+jSK+wPh82OLGw9ci8TL/+wtOdBVbrg0a1cN8tkmqlHoc9La1C18KAZ8L0frKQrms/rPMA0vbC0lrc5dEzSU1RtC3kK5szYYJYHFokXcpMyvh6FjEJOJFZGZ7uKkVlYJZ6YRpMCWhs7fPLrYEeMfZ6cm2PzS5uYZK6FO4vaQYs8KGKkWyUxHEoVBAeYlKJfmZGZ70wc5fC//4qF7sehik+m5m44Aomn5e57M6I6C5kQL3yq9yf8NIMtfaF9GHKAGzAmSw8yZLjyXb6S+0v7F04ILQgO0BegVOc8mT3MInkgeP41WskfvW4j6mjJViySJtLezX4Fj6VG14Z4TApzzDxozBCHdeNIy4fe9VyYowpH9axvXWqyLJR89CWgSvAGJ0nmHbtXzo7CVuXdAxxIzp6ZouDffH2UlxF4p4n5ws5h1f/zCSoEB/Xss2fnbZMcSrQK1r4xfxQaLfHn0woqFibXsqbOMkoJI964js/v6I1mnddH0aDBgcHe+fCBEKJTn37+9LcPZw5FX9PsmaBe7TZc8qVHG+Yo/LQZHBmEzXY7vWVi23IEtOPgJcalZklFccboKOfqbWj1y6pO28McA9/lVe314nKsdfoADrr4dvhIS2DYDUhoQsi4E5YSNaaEWhZ5PoLiR7heQDUqWgKrFmyIImzV7OH4xnsXYmfJGwshHwlsmLqXtfgabdqB6UDDZkX9nPEJ2rPkxywOr7HvZ0mP//pItKd5UxuHMJSf5+P/0LAknCS5WlNoyiJgnvKJO9rT7tzIwvhnS6+SDoHGuNLNFBquTB5OmeaZXlcmHo/RWCRU1/Y0aR0vzE+FPKipT0NMDsXySPE24jTKpYs0QSypJV9lYk39vIz/QyiOxS1FCxzHmzvehkWAAkbkqkSl8vnQfMh9eTEC6JZcgWxuWIU0sM1eXsOSKglbkswC/H3lm8VaNN9b7X3/GFungzPmAjQAQodVPT3s5B5wpW0M/3ANqNuu3TfCzf/HOwJdA3UEvvmx0eT9Gz0L9pNyvjCHbyRJ2+Heptfy3YtfwwcNTbIq41wouZY5cbh2NSfTPKeL5nSzV1akBq1e03Ehhg5cTFP4MQYFu5RFZ4cKhEabhmyrbLD8X41uM18qJ97xorrK7eHW8RkyJ2eg/dd2QAvFKNvnjt2+/KDnEiL5b+JliSKo/gYvN7Ztbo7PsKUzcYp9Vj1AlIJO76cvwa5R57z4AVr9XicuQGFIv+95Ls0VrmYpsVYYj8kA3fxtlJQveRdgDqOiduOV5BsgPrGEEffZ7nIZoVaFVfwvoVGv49znNy8YwceCfgLEPggvoM/yaw3b5p5zoIYp4ZpCBzOHrvQyiDngqYln4AnKFcDJBsmFdQlv1aUZZIUG1jyTBj6P+Kj13UT98H/Wr+cd4mhzyU8GXDAEexk94NO03rc4Ja55rODybEYdR5JbUVuqtyT7wc4zfXXe+9hh71EAYDw6aOUwyid/vH6y7n3mVklTw2zpi6O9f8pk+fNlayHMGELx/4PGIQ=

const pathModule = require('path');
const fs = require('fs');

const input = fs
    .readFileSync(pathModule.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n')
    .map((line) => line.split(''));

let starts = [];
let S;
let E;
for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
        if (input[y][x] === 'S') {
            S = { x, y };

            // Your current position (`S`) has elevation `a`
            input[y][x] = 'a';
        } else if (input[y][x] === 'E') {
            E = { x, y };

            // And the location that should get the best signal (`E`) has elevation `z`
            input[y][x] = 'z';
        }

        const cell = input[y][x];

        if (cell === 'a') {
            // Part two
            starts.push({ x, y });
        }

        // While we are looping, re-encode chars to ints, to make our elevation comparisons easier
        input[y][x] = cell.charCodeAt(0);
    }
}

const toId = (x, y) => `${x},${y}`;

function getNeighbors(x, y) {
    return [
        { x: x, y: y - 1 },
        { x: x - 1, y: y },
        { x: x + 1, y: y },
        { x: x, y: y + 1 },
    ].filter((coord) => typeof input[coord.y]?.[coord.x] !== 'undefined');
}

function buildFrontier(from_x, from_y) {
    const frontier = [];
    frontier.push({ x: from_x, y: from_y });

    const came_from = new Map();
    came_from.set(toId(from_x, from_y), null);
    while (frontier.length > 0) {
        const current = frontier.shift();
        const current_val = input[current.y][current.x];

        let neighbors = getNeighbors(current.x, current.y);
        for (let next of neighbors) {
            const next_cell = input[next.y][next.x];
            const next_id = toId(next.x, next.y);

            if (next_cell - current_val > 1 || came_from.has(next_id)) {
                continue;
            }

            // Coord is walkable
            const current_id = toId(current.x, current.y);
            frontier.push(next);
            came_from.set(next_id, current_id);
        }
    }

    return came_from;
}

function getShortestPath(from_x, from_y, to_x, to_y) {
    const from_id = toId(from_x, from_y);
    const to_id = toId(to_x, to_y);
    const came_from = buildFrontier(from_x, from_y);
    let current = to_id;

    let path = [];
    while (current !== undefined && current !== from_id) {
        path.push(current);
        current = came_from.get(current);
    }

    // An undefined `current` means it wasn't possible to have a path `from` -> `to`, return an empty path
    if (current === undefined) {
        return [];
    }

    // Finally, put `from` first, and `to` last
    path.reverse();

    // Note our path won't include the `from` position
    return path;
}

const path = getShortestPath(S.x, S.y, E.x, E.y);
console.log('Part one:', path.length);

let min_path_length = Number.MAX_VALUE;
for (let start of starts) {
    const path = getShortestPath(start.x, start.y, E.x, E.y);
    if (path.length) {
        min_path_length = Math.min(min_path_length, path.length);
    }
}

console.log('Part two:', min_path_length);
