const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { stdin: input, stdout: output, stdout, stdin, exit } = require('process');
const rl = readline.Interface({ input, output });

fs.writeFile(path.join(__dirname, 'out.txt'), '',(err) => {
    if (err) throw err;
});
stdout.write('hello my friend\n');
rl.on('line', (data) => {
    if (data !== 'exit') {
        
        fs.appendFile(path.join(__dirname, 'out.txt'), `${data + '\n'}`, (err) => {
            if (err) throw err;
        });
    } else {
        stdout.write('Goodbye my friend');
        rl.close();
    };
});
rl.on('SIGINT', () => {
    stdout.write('goodbye my friend');
    exit();
})


