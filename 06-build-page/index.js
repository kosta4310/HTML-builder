const fs = require('fs/promises');
const fss = require('fs');
const { stdin } = require('process');
const readline = require('readline');
const path = require('path');
const { resolve } = require('path');
const { readdir } = require('fs/promises');

const rs = fss.createReadStream(path.resolve(__dirname, './template.html'));
let template = fs.readFile(path.resolve(__dirname, './template.html'), {encoding: 'utf-8'});
let templateStr = '';
const footer = readComponents('footer');
const articles = readComponents('articles');
const header = readComponents('header');
let footerStr = '';
const articlesStr = '';
const headerStr = '';
Promise.all([template, footer, articles, header]).then(values => {
    
    template.then(temp => {
        templateStr = temp;
        
    }).then(temp => {
        
        footer.then(footer => {
            templateStr = rep('footer', footer);
            
        })
    }).then(temp => {
        articles.then(articles => {
            templateStr = rep('articles', articles);
                
        })
    }).then(temp => {
        header.then(header => {
            templateStr = rep('header', header);
            writeHtml(templateStr);
        })
    })
    
});
 function rep(string, str) {
    let c =  templateStr.replace(`{{${string}}}`, str);
    return c;
}
async function writeHtml(html) {
    try {
        await fs.mkdir(path.join(__dirname, 'project-dist'), {recursive: true});
        // await fs.rm(path.join(__dirname, 'project-dist', 'index.html'), { force: true });
        await fs.writeFile(path.resolve(__dirname, './project-dist/index.html'),html);
    } catch (error) {
        console.log(error);
    }
}

async function merge() {
    try {
       await fs.mkdir(path.join(__dirname, 'project-dist'), {recursive: true});
       await fs.rm(path.join(__dirname, 'project-dist', 'style.css'), { force: true });
       const dirents = await fs.readdir(path.join(__dirname, 'styles'), { withFileTypes: true });
       for (const dirent of dirents) {
           if (dirent.isFile && (path.extname(dirent.name) === '.css')) {
               const data = await fs.readFile(path.join(__dirname, 'styles', dirent.name), { encoding: 'utf-8' });
               fs.appendFile(path.join(__dirname, 'project-dist', 'style.css'), data);
           }
       }
   } catch (error) {
       console.log(error);
   }
}
const pathFrom = path.join(__dirname, 'assets');
const pathTo = path.join(__dirname, 'project-dist', 'assets');
async function copyDir(pathFrom, pathTo) {
    try {
        await fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true });
        
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
merge();




async function readComponents(fileName) {
    
    try {
        return fs.readFile(path.resolve(__dirname, `./components/${fileName}.html`), {encoding: 'utf-8'});
    } catch (error) {
        throw error;
    }
   
}

               
               
            





