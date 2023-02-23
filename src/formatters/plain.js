import _ from 'lodash';
import compare from './compare.js';

const inType = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`;
  } if (_.isObject(value)) {
    return '[complex value]';
  } return value;
};

const stringify = (ind, key, data) => {
  switch (ind) {
    case 'plus': return `Property '${key}' was added with value: ${inType(data)}`;
    case 'minus': return `Property '${key}' was removed`;
    case 'not_same': return `Property '${key}' was updated. From ${inType(data[1])} to ${inType(data[2])}`;
    default:
  }
  return 0;
};

const compInPlain = (obj1, obj2) => {
  const mass = compare(obj1, obj2);
  const iter = (value, path) => value.filter((n) => n.ind !== 'same').map((item) => {
    const { ind, key, data } = item;
    const newPath = _.trim(`${path}.${key}`, '.');
    if (ind === 'obj') {
      return `${iter(data, newPath)}`;
    }
    return stringify(ind, `${newPath}`, data);
  }).join('\n');
  return iter(mass, '');
};

export default compInPlain;
