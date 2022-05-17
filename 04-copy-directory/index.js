const fs = require('fs/promises');
const path = require('path');
const { stdin, stdout} = require('process');
const { readdir } = require('fs/promises');

const pathFrom = path.join(__dirname, 'files');
const pathTo = path.join(__dirname, 'files-copy');
async function copyDir(pathFrom, pathTo) {
    try {
        await fs.rm(pathTo, { force: true, recursive: true });
        await fs.mkdir(pathTo, { recursive: true });
        await copyFilesAndFolder(pathFrom, pathTo);
    } catch (error) {
        console.log(error);
    }
    async function copyFilesAndFolder(trackFrom, trackTo) {
            try {
                const dirents = await readdir(trackFrom, { withFileTypes: true });
                if (dirents.length !== 0) {
                    for (const dirent of dirents) {
                    let tempPathFrom = path.join(trackFrom, dirent.name);
                    let tempPathTo = path.join(trackTo, dirent.name);
                if (dirent.isFile()) {
                    fs.copyFile(tempPathFrom, tempPathTo);
                } else {
                    fs.mkdir(tempPathTo, {recursive: true}, (err) => {
                        if (err) throw err;
                    });
                    copyFilesAndFolder(tempPathFrom, tempPathTo);
                }
            }
            } else return;
            } catch (error) {
                console.log(error);
            }
    }
}
copyDir(pathFrom, pathTo);

