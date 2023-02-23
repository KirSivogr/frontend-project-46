import compare from './compare.js';

export default function makeJson(obj1, obj2) {
  const resultObj = compare(obj1, obj2);
  return JSON.stringify(resultObj);
}
