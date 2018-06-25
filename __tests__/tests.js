import genDiffs from '../dist';

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

test('File 1 not exists #2', () => {
  const path1 = `undefined1`;
  const path2 = `${fixPath}/test1__after.json`;
  expect(() => {
    genDiffs(path1, path2);
  }).toThrowError("ENOENT: no such file or directory, open 'undefined1'");
});

test('File 2 not exists #3', () => {
  const path1 = `${fixPath}/test1__before.json`;
  const path2 = 'undefined2';
  expect(() => {
    genDiffs(path1, path2);
  }).toThrowError("ENOENT: no such file or directory, open 'undefined2'");
});
