const fs = require('fs');
const path = require('path');
const { stdout, stdin, exit } = require('process');

const write = fs.createWriteStream(path.join(__dirname, 'out.txt'));
write.on('error', (err) => { console.log(`Поймали ошибку ${err}`)});
stdin.on('data', data => {
    let str = data.toString().trim();
    if (str === 'exit') {
        exit();
    }
    write.write(`${str}\n`);
})
stdout.write('Hello my friend\n');
process.on('SIGINT', exit);
process.on('exit', () => {
    stdout.write('Goodbye my friend')
})

