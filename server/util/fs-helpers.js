import fs from 'fs';

export const createDir = (path)=> {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }
};
