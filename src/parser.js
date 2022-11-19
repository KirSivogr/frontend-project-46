import fs from 'fs';
import _ from 'lodash';
import path from 'path';

export default function genDiff(firstFile, secondFile) {
    const firstJSONFileData = fs.readFileSync(path.resolve(process.cwd(), '__fixtures__', firstFile), "utf-8");
    const secondJSONFileData = fs.readFileSync(path.resolve(process.cwd(), '__fixtures__', secondFile), "utf-8");
    const firstDataObj = JSON.parse(firstJSONFileData);
    const secondDataObj = JSON.parse(secondJSONFileData);
    const mergeObj = _.extend({}, firstDataObj, secondDataObj);
    const mergeArr = Object.entries(mergeObj);
    mergeArr.sort();
    let resultDiff = mergeArr.reduce((acum, property) => {
        if (secondDataObj[property[0]] && firstDataObj[property[0]]) {
            if (secondDataObj[property[0]] == firstDataObj[property[0]]) {
                acum += `   ${property[0]}: ${property[1]}\n`;
            }
            else {
                acum += ` - ${property[0]}: ${firstDataObj[property[0]]}\n`;
                acum += ` + ${property[0]}: ${secondDataObj[property[0]]}\n`;
            }
        }
        else if (secondDataObj[property[0]]) {
            acum += ` + ${property[0]}: ${secondDataObj[property[0]]}\n`;
        }
        else {
            acum += ` - ${property[0]}: ${firstDataObj[property[0]]}\n`;
        }
        return acum;
    }, '{\n');
    resultDiff += '}';
    return resultDiff;
}

