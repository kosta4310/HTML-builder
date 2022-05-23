const fs = require('fs');
const path = require('path');

const input = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf-8');
input.on('data', (data) => {
    process.stdout.write(data);
})
input.on('error', (err) => {
    console.log(`произошла ошибка ${err}`);
})
