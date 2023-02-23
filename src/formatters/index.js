import fs from 'fs';
import path from 'path';
import makeStylish from './stylish.js';
import makePlain from './plain.js';
import makeJson from './json.js';
import parse from '../parsers.js';

export default function genDiff(firstFile, secondFile, format = 'stylish') {
  const firstJSONFileData = fs.readFileSync(path.resolve(process.cwd(), '__fixtures__', firstFile), 'utf-8');
  const secondJSONFileData = fs.readFileSync(path.resolve(process.cwd(), '__fixtures__', secondFile), 'utf-8');
  const formatParse1 = parse(firstFile);
  const formatParse2 = parse(secondFile);
  const firstDataObj = formatParse1(firstJSONFileData);
  const secondDataObj = formatParse2(secondJSONFileData);

  if (format === 'stylish') {
    return makeStylish(firstDataObj, secondDataObj);
  }
  if (format === 'plain') {
    return makePlain(firstDataObj, secondDataObj);
  }

  return makeJson(firstDataObj, secondDataObj);
}
