const load = require('./progressbarstucture');
const fs = require('fs');

// file size
let stats = fs.statSync('./input');
let sizeinby = stats.size;
let chars = sizeinby;

const progress = new load(chars, 0);
let sum = 0;
const read = () => {
   const readStream = fs.createReadStream('input', {highWaterMark : 16});

    readStream.on('data', (chunk) => {
        sum += chunk.length;
        progress.update(sum);
    })

    readStream.on('end', () => {
        progress.stop();
    })
}

read();