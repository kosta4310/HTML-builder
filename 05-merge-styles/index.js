const fs = require('fs/promises');
const fss = require('fs');
const path = require('path');
const { stdin, stdout} = require('process');
const { readdir } = require('fs/promises');

async function merge() {
   try {
       await fs.rm(path.join(__dirname, 'project-dist', 'bundle.css'), { force: true });
       const dirents = await fs.readdir(path.join(__dirname, 'styles'), { withFileTypes: true });
       for (const dirent of dirents) {
           if (dirent.isFile && (path.extname(dirent.name) === '.css')) {
               const data = await fs.readFile(path.join(__dirname, 'styles', dirent.name), { encoding: 'utf-8' });
               fs.appendFile(path.join(__dirname, 'project-dist', 'bundle.css'), data);
           }
       }
   } catch (error) {
       console.log(error);
   }
}
merge();