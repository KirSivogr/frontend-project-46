import genDiff from "../src/formatters/index.js";
import { expect, test } from '@jest/globals';
import fs from "fs";
import path from "path";

test('stylish', () => {
    const res = fs.readFileSync(path.resolve(process.cwd(), '__fixtures__', 'resStylish.txt'), "utf-8");
    expect(genDiff('file1.json', 'file2.json')).toEqual(res);
    expect(genDiff('file3.yml', 'file4.yml')).toEqual(res);
});

test('plain', () => {
    fs.writeFileSync('C:\\Users\\sivog\\Hexlet\\2ndProject\\__fixtures__\\resPlain.txt', genDiff('file1.json', 'file2.json'));
    const res = fs.readFileSync(path.resolve(process.cwd(), '__fixtures__', 'resPlain.txt'), "utf-8");
    expect(genDiff('file1.json', 'file2.json', 'plain')).toEqual(res);
    expect(genDiff('file3.yml', 'file4.yml', 'plain')).toEqual(res);
});

test('json', () => {
    const res = fs.readFileSync(path.resolve(process.cwd(), '__fixtures__', 'resJson.txt'), "utf-8");
    expect(genDiff('file1.json', 'file2.json', 'json')).toEqual(res);
    expect(genDiff('file3.yml', 'file4.yml', 'json')).toEqual(res);
});



