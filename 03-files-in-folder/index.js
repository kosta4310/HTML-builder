const fs = require('fs');
const path = require('path');
const {stat} = require('fs');
const { stdin: input, stdout: output, stdout, stdin, exit } = require('process');
const { readdir } = require('fs/promises');

function getParamsFiles(track) {
    let basename = path.basename(track);
    stat(track, (err, stats) => {
        console.log(basename.replace('.', ' - ') + " - " + stats.size);
    
    })
}
async function getFiles (track) {
  try {
      const dirents = await readdir(track, { withFileTypes: true });
      if (dirents.length != 0) {
          for (const dirent of dirents) {
            if (dirent.isFile()) {
                if (dirent.name !== '.gitkeep') {
                    getParamsFiles(path.join(track, `${dirent.name}`));
                }
                
            } else getFiles(path.join(track, `${dirent.name}`));
          
        }
    }
      return; 
    
} catch (err) {
  console.error(err);
}
}
 getFiles(path.join(__dirname, 'secret-folder'));   
    