import _ from 'lodash';
import compare from './compare.js';

const spaces = (depth) => ' '.repeat(2 + depth * 4);

const stringify = (obj, depth) => {
  const iter = (value, depth1) => {
    // console.log(value);
    if (!_.isObject(value)) {
      return value;
    }
    const keys = Object.keys(value);
    // console.log(keys);
    return `{\n${keys.map((item) => `  ${spaces(depth1 + 1)}${item}: ${iter(value[item], depth1 + 1)}`).join('\n')}\n${spaces(depth1)}  }`;
  };
  return iter(obj, depth);
};

export default function makeStylish(obj1, obj2) {
  const resultOfCompare = compare(obj1, obj2);
  const iter = (item, depth) => item.map((obj) => {
    const { sign, key, value } = obj;
    if (sign === '+') {
      return `${spaces(depth)}+ ${key}: ${stringify(value, depth)}`;
    }
    if (sign === '-') {
      return `${spaces(depth)}- ${key}: ${stringify(value, depth)}`;
    }
    if (sign === 'o') {
      return `${spaces(depth)}  ${key}: {\n${iter(value, depth + 1)}\n${spaces(depth)}  }`;
    }
    if (sign === 'same') {
      return `${spaces(depth)}  ${key}: ${stringify(value, depth)}`;
    }
    if (sign === 'not same') {
      return `${spaces(depth)}- ${key}: ${stringify(value[0], depth)}\n${spaces(depth)}+ ${key}: ${stringify(value[1], depth)}`;
    }
  }).join('\n');
  return `{\n${iter(resultOfCompare, 0)}\n}`;
}
