const fs = require('fs');


const read = () => {
    let data = '';

    const readStream = fs.createReadStream('input.txt', 'utf-8');
    readStream.on('error', () => {console.log(error)});
    readStream.on('data', (chunk) => {
        data += chunk;
    })
    readStream.on('end', () => {console.log('End of the file')});
}
