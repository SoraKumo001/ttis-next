import fs from 'fs';
import path from 'path';

export const getFiles = (dir: string) => {
  return new Promise<string[]>((resolve, reject) => {
    fs.readdir(dir, (err, files) => {
      if (err) reject(err);
      else {
        const allFiles: string[] = [];
        Promise.all(
          files.map(async (file) => {
            const pathName = path.join(dir, file);
            if (fs.statSync(pathName).isFile()) {
              allFiles.push(pathName);
            } else {
              allFiles.push(...(await getFiles(pathName)));
            }
          })
        ).then(() => resolve(allFiles));
      }
    });
  });
};
