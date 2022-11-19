import genDiff from "../src/parser.js";
import { expect, test } from '@jest/globals';

test('gendiff', () => {
    const res = '{\n' +
        ' - follow: false\n' +
        '   host: hexlet.io\n' +
        ' - proxy: 123.234.53.22\n' +
        ' - timeout: 50\n' +
        ' + timeout: 20\n' +
        ' + verbose: true\n' +
        '}';
    expect(genDiff('file1.json', 'file2.json')).toEqual(res);
});