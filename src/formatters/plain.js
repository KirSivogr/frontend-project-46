import _ from "lodash";
import compare from "./compare.js";

const inType = (value) => {
    if (typeof value === 'string') {
        return `'${value}'`;
    } if (_.isObject(value)) {
        return '[complex value]';
    } return value;
};

const stringify = (obj, string) => {
    const iter = (obj1, string1) => {
        if (!Array.isArray(obj1)) {
            const {sign, key, value} = obj1;
            if (sign === '+') {
                return `.${key}' was added with value: ${inType(value)}`;
            }
            else if (sign === '-') {
                return `.${key}' was removed`;
            }
            else if (sign === 'not same') {
                return `.${key}' was updated. From ${inType(value[0])} to ${inType(value[1])}`;
            }
            else if (sign === 'o') {
                return `.${key}${iter(value, string1 + '.' + key)}`;
            }
        }
        return `${obj1.map((item) => { if (item['sign'] !== 'same') return `${iter(item, string1)}`})
            .filter(Boolean).
            join(`\nProperty '${string1}`)}`;
    }
    return iter(obj, string);
}

export default function makePlain (obj1, obj2) {
    const resultOfCompare = compare(obj1, obj2);
    const iter = (item) => {
        return item.map((obj) => {
            const {sign, key, value} = obj;
            if (sign === 'o') {
                return `Property '${key}${stringify(value, key)}\n`;
            }
            if (sign === '+') {
                return `Property '${key}' was added with value: ${inType(value)}\n`;
            }
            if (sign === '-') {
                return `Property '${key}' was removed\n`;
            }
            if (sign === 'not same') {
                return `Property '${key}' was updated. From '${inType(value[0])}' to '${inType(value[1])}'\n`;
            }
        }).join('');
    }
    return iter(resultOfCompare);
}
