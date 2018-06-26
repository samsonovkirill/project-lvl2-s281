import genDiffs from '../src';

const fixPath = '__tests__/__fixtures__';

test('Calculate difference between two files #1', () => {
  const path1 = `${fixPath}/test1__before.json`;
  const path2 = `${fixPath}/test1__after.json`;
  const result = `
{
   host: hexlet.io
 + timeout: 20
 - timeout: 50
 - proxy: 123.234.53.22
 - follow: false
 + verbose: true
}`;
  expect(genDiffs(path1, path2)).toBe(result);
});

test('Calculate difference between files after to before 2', () => {
  const path1 = `${fixPath}/test1__after.json`;
  const path2 = `${fixPath}/test1__before.json`;
  const result = `
{
 + timeout: 50
 - timeout: 20
 - verbose: true
   host: hexlet.io
 + proxy: 123.234.53.22
 + follow: false
}`;
  expect(genDiffs(path1, path2)).toBe(result);
});

test('Calculate difference between two equal files #3', () => {
  const path1 = `${fixPath}/test2__before.json`;
  const path2 = `${fixPath}/test2__after.json`;
  const result = `
{
   host: hexlet.io
   proxy: 123.234.53.22
   follow: false
   port: 80
}`;
  expect(genDiffs(path1, path2)).toBe(result);
});

test('Calculate difference with empty file #4', () => {
  const path1 = `${fixPath}/test3__before.json`;
  const path2 = `${fixPath}/test3__after.json`;
  const result = `
{
 + host: hexlet.io
 + proxy: 123.234.53.22
 + follow: false
 + port: 80
 + verbose: true
}`;
  expect(genDiffs(path1, path2)).toBe(result);
});


test('File not exists #5', () => {
  const path1 = `undefined1`;
  const path2 = `${fixPath}/test1__after.json`;
  expect(() => {
    genDiffs(path1, path2);
  }).toThrowError("ENOENT");
});


test('File contains corrupted JSON #6', () => {
  const path1 = `${fixPath}/test1__before.json`;
  const path2 = `${fixPath}/test4__corrupted.json`;
  expect(() => {
    genDiffs(path1, path2);
  }).toThrowError(SyntaxError);
});
