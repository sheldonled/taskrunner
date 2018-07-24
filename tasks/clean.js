import fs from 'fs';

const deleteFolderRecursive = path => {
  if(!fs.existsSync(path)) return;
  
  fs.readdirSync(path).forEach(file => {
    const curPath = path + "/" + file;
    
    if (fs.lstatSync(curPath).isDirectory())
      deleteFolderRecursive(curPath);
    else
      fs.unlinkSync(curPath);
  });
  fs.rmdirSync(path);
};

export default (pathArray) => pathArray.forEach(path => deleteFolderRecursive(path));