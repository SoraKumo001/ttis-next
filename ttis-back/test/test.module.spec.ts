import * as fs from 'fs';
import * as path from 'path';

const execTest = (dir: string = __dirname) => {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filePath = path.resolve(dir, file);
    const state = fs.statSync(filePath);
    if (state.isDirectory()) execTest(filePath);
    else /.*\.test\.ts$/.test(file) && require(filePath);
  });
};

execTest("src");
