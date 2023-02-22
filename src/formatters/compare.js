import _ from 'lodash'

export default function compare(obj1, obj2) {
    const keysFromObj1 = Object.keys(obj1);
    const keysFromObj2 = Object.keys(obj2);

    const mergeKeys = _.sortBy(_.uniq(keysFromObj1.concat(keysFromObj2)));
    return mergeKeys.map((item) => {
        if (_.isObject(obj1[item]) && _.isObject(obj2[item])) {
            return {
                sign: 'o',
                key: item,
                value: compare(obj1[item], obj2[item])
            }
        }
        if (!keysFromObj1.includes(item)) {
            return {
                sign: '+',
                key: item,
                value: obj2[item]
            }
        }
        if (!keysFromObj2.includes(item)) {
            return {
                sign: '-',
                key: item,
                value: obj1[item]
            }
        }
        if (keysFromObj1.includes(item) && keysFromObj2.includes(item)) {
            if (_.isEqual(obj1[item], obj2[item])) {
                return {
                    sign: 'same',
                    key: item,
                    value: obj1[item]
                }
            }
            else {
                return {
                    sign: 'not same',
                    key: item,
                    value: [obj1[item], obj2[item]]
                }
            }
        }

    })
}