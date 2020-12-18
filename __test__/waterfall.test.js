import path from 'path';
import fs from 'fs';
import waterfall from '../src/waterfall';

const getFixturePath = (filepath) => path.join('__fixtures__', filepath);

const filename1 = 'one.txt';
const filename2 = 'two.txt';

const successfulCallChain = [
  (cb) => {
    const filepath = getFixturePath(filename1);
    fs.readFile(filepath, (err, data) => {
      const num = Number(data);
      cb(err, num);
    });
  },
  (num1, cb) => {
    const filepath = getFixturePath(filename2);
    fs.readFile(filepath, (err, data) => {
      const num2 = Number(data);
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
      const num = Number(data);
      cb(err, num);
    });
  },
  (num, cb) => {
    console.log(num);
    cb(null);
  },
];

const expected = 444;

// eslint-disable-next-line jest/no-test-callback
test('waterfall with successful сall сhain', (done) => {
  waterfall(successfulCallChain, (err, data) => {
    const [actual] = data;
    expect(err).toBe(null);
    expect(actual).toBe(expected);
    done();
  });
});

// eslint-disable-next-line jest/no-test-callback
test('waterfall with failed сall сhain', (done) => {
  waterfall(failedСallСhain, (err, data) => {
    const [actual] = data;
    expect(err).not.toBe(null);
    expect(actual).not.toBe(expected);
    done();
  });
});
