import path from 'path';
import fs from 'fs';
import waterfall from '../src/waterfall';

const getFixturePath = (filepath) => path.join('__fixtures__', filepath);

const filename1 = 'number1.txt';
const filename2 = 'number2.txt';

const successfulCallChain = [
  (cb) => {
    const filepath = getFixturePath(filename1);
    fs.readFile(filepath, (err, data) => {
      const num = Number(data.trim());
      cb(err, num);
    });
  },
  (num1, cb) => {
    const filepath = getFixturePath(filename2);
    fs.readFile(filepath, (err, data) => {
      const num2 = Number(data.trim());
      cb(err, num1, num2);
    });
  },
  (num1, num2, cb) => {
    const sum = num1 + num2;
    cb(null, sum);
  },
];

const failedСallСhain = [
  (cb) => {
    const filepath = getFixturePath('not-exist-file');
    fs.readFile(filepath, (err, data) => {
      const num = Number(data.trim());
      cb(err, num);
    });
  },
  (num, cb) => {
    console.log(num);
    cb(null);
  },
];

const expected = 444;

test('waterfall with successful сall сhain', () => {
  waterfall(successfulCallChain, (err, result) => {
    expect(err).toBe(null);
    expect(result).toBe(expected);
  });
});

test('waterfall with failed сall сhain', () => {
  waterfall(failedСallСhain, (err) => {
    expect(err).not.toBe(null);
  });
});
