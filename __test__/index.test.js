import path from 'path';
import fs from 'fs';
import message from '..';

const getFixturePath = (filename) => path.join('__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('', () => {
  expect(message).toEqual(readFile('expected.txt'));
});
