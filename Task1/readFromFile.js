const fs = require('fs');

const read = (filename, callback) => {
    let data = '';

    const readStream = fs.createReadStream(filename, 'utf-8');
    readStream.on('error', () => {console.log(error)});
    readStream.on('data', (chunk) => {
        data += chunk;
    })

    callback(data);
}

const ans = read('input.txt', (data) => {
    console.log(data);
})
