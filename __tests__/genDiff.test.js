import genDiff from "../src/parser.js";
import { expect, test } from '@jest/globals';
import fs from "fs";
import path from "path";

test('gendiff', () => {
    const res = fs.readFileSync(path.resolve(process.cwd(), '__fixtures__', 'res.txt'), "utf-8");
    expect(genDiff('file1.json', 'file2.json')).toEqual(res);
});