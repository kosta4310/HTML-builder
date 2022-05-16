const fs = require('fs/promises');
const path = require('path');
const { stdin, stdout} = require('process');
const { readdir } = require('fs/promises');



fs.mkdir(path.join(__dirname, 'files-copy'), {recursive: true}, (err) => {
    if (err) throw err;
});



(async function (track) {
    try {
        const dirents = await readdir(track, { withFileTypes: true });
        for (const dirent of dirents) {
            fs.unlink(path.join(`${track}`, `${dirent.name}`));
        }
    } catch (error) {
        console.log(error);
    }
})(path.join(__dirname, 'files-copy'));




async function readDirectory(track) {
    try {
        const dirents = await readdir(track, { withFileTypes: true });
        if (dirents.length !== 0) {
            for (const dirent of dirents) {
                if (dirent.isFile()) {
                    
                    let strPath = path.join(track, dirent.name);
                    fs.copyFile(strPath, strPath.replace('files', 'files-copy'));
                } else {
                    fs.mkdir(path.join(track, dirent.name), {recursive: true}, (err) => {
                        if (err) throw err;
                    });
                }
            }
        } else return;
        
    } catch (error) {
        console.log(error);
    }
}
readDirectory(path.join(__dirname, 'files'));