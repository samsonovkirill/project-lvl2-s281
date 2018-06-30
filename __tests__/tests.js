import fs from 'fs';
import genDiffs from '../src';

const fixPath = '__tests__/__fixtures__';

describe('JSON test suite #1', () => {
  test('Calculate difference between two files #1', () => {
    const path1 = `${fixPath}/1/test1-2__before.json`;
    const path2 = `${fixPath}/1/test1-2__after.json`;
    const result = fs.readFileSync(`${fixPath}/1/test1__expected.txt`, 'utf8');
    expect(genDiffs(path1, path2)).toBe(result);
  });

  test('Calculate difference between JSON files after to before 2', () => {
    const path1 = `${fixPath}/1/test1-2__after.json`;
    const path2 = `${fixPath}/1/test1-2__before.json`;
    const result = fs.readFileSync(`${fixPath}/1/test2__expected.txt`, 'utf8');
    expect(genDiffs(path1, path2)).toBe(result);
  });

  test('Calculate difference between two equal files #3', () => {
    const path1 = `${fixPath}/1/test3__before.json`;
    const path2 = `${fixPath}/1/test3__after.json`;
    const result = fs.readFileSync(`${fixPath}/1/test3__expected.txt`, 'utf8');
    expect(genDiffs(path1, path2)).toBe(result);
  });

  test('Calculate difference with empty file #4', () => {
    const path1 = `${fixPath}/1/test4__before.json`;
    const path2 = `${fixPath}/1/test4__after.json`;
    const result = fs.readFileSync(`${fixPath}/1/test4__expected.txt`, 'utf8');
    expect(genDiffs(path1, path2)).toBe(result);
  });
});

describe('YAML test suite #2', () => {
  test('Calculate difference between two files #1', () => {
    const path1 = `${fixPath}/2/test1__before.yml`;
    const path2 = `${fixPath}/2/test1__after.yml`;
    const result = fs.readFileSync(`${fixPath}/2/test1__expected.txt`, 'utf8');
    expect(genDiffs(path1, path2)).toBe(result);
  });

  test('Calculate difference between two files #2', () => {
    const path1 = `${fixPath}/2/test2__before.yml`;
    const path2 = `${fixPath}/2/test2__after.yml`;
    const result = fs.readFileSync(`${fixPath}/2/test2__expected.txt`, 'utf8');
    expect(genDiffs(path1, path2)).toBe(result);
  });
});

describe('INI test suite #3', () => {
  test('Calculate difference between two files #1', () => {
    const path1 = `${fixPath}/3/test1__before.ini`;
    const path2 = `${fixPath}/3/test1__after.ini`;
    const result = fs.readFileSync(`${fixPath}/3/test1__expected.txt`, 'utf8');
    expect(genDiffs(path1, path2)).toBe(result);
  });

  test('Calculate difference between two files #2', () => {
    const path1 = `${fixPath}/3/test2__before.ini`;
    const path2 = `${fixPath}/3/test2__after.ini`;
    const result = fs.readFileSync(`${fixPath}/3/test2__expected.txt`, 'utf8');
    expect(genDiffs(path1, path2)).toBe(result);
  });
});

describe('Nested structure files #4', () => {
  test('Calculate diffs between two JSON files #1', () => {
    const path1 = `${fixPath}/4/test1__before.json`;
    const path2 = `${fixPath}/4/test1__after.json`;
    const result = fs.readFileSync(`${fixPath}/4/test1__expected.txt`, 'utf8');
    expect(genDiffs(path1, path2)).toBe(result);
  });

  test('Calculate diffs between two JSON files #2', () => {
    const path1 = `${fixPath}/4/test2__before.json`;
    const path2 = `${fixPath}/4/test2__after.json`;
    const result = fs.readFileSync(`${fixPath}/4/test2__expected.txt`, 'utf8');
    expect(genDiffs(path1, path2)).toBe(result);
  });

  test('Calculate diffs between two JSON files add or del object #3', () => {
    const path1 = `${fixPath}/4/test3__before.json`;
    const path2 = `${fixPath}/4/test3__after.json`;
    const result = fs.readFileSync(`${fixPath}/4/test3__expected.txt`, 'utf8');
    expect(genDiffs(path1, path2)).toBe(result);
  });

  test('Calculate diffs between two JSON files add or del nested object #4', () => {
    const path1 = `${fixPath}/4/test4__before.json`;
    const path2 = `${fixPath}/4/test4__after.json`;
    const result = fs.readFileSync(`${fixPath}/4/test4__expected.txt`, 'utf8');
    expect(genDiffs(path1, path2)).toBe(result);
  });

  test('Calculate diffs between two YML files full test #5', () => {
    const path1 = `${fixPath}/4/test5__before.yml`;
    const path2 = `${fixPath}/4/test5__after.yml`;
    const result = fs.readFileSync(`${fixPath}/4/test5__expected.txt`, 'utf8');
    expect(genDiffs(path1, path2)).toBe(result);
  });

  test('Calculate diffs between two INI files full test #6', () => {
    const path1 = `${fixPath}/4/test6__before.ini`;
    const path2 = `${fixPath}/4/test6__after.ini`;
    const result = fs.readFileSync(`${fixPath}/4/test6__expected.txt`, 'utf8');
    expect(genDiffs(path1, path2)).toBe(result);
  });
});

describe('Plain output format #5', () => {
  const format = 'plain';
  test('Calculate diffs between two JSON files #1', () => {
    const path1 = `${fixPath}/5/test1__before.json`;
    const path2 = `${fixPath}/5/test1__after.json`;
    const result = fs.readFileSync(`${fixPath}/5/test1__expected.txt`, 'utf8');
    expect(genDiffs(path1, path2, format)).toBe(result);
  });

  test('Calculate diffs between two JSON files #2', () => {
    const path1 = `${fixPath}/5/test2__before.json`;
    const path2 = `${fixPath}/5/test2__after.json`;
    const result = fs.readFileSync(`${fixPath}/5/test2__expected.txt`, 'utf8');
    expect(genDiffs(path1, path2, format)).toBe(result);
  });

  test('Calculate diffs between two JSON files add or del object #3', () => {
    const path1 = `${fixPath}/5/test3__before.json`;
    const path2 = `${fixPath}/5/test3__after.json`;
    const result = fs.readFileSync(`${fixPath}/5/test3__expected.txt`, 'utf8');
    expect(genDiffs(path1, path2, format)).toBe(result);
  });
});

describe('Common error suites #6', () => {
  test('File not exists #1', () => {
    const path1 = 'undefined1';
    const path2 = 'undefined2';
    expect(() => {
      genDiffs(path1, path2);
    }).toThrowError('ENOENT');
  });

  test('File contains corrupted JSON #2', () => {
    const path1 = `${fixPath}/6/corrupted.json`;
    const path2 = `${fixPath}/1/test1-2__before.json`;
    expect(() => {
      genDiffs(path1, path2);
    }).toThrowError(SyntaxError);
  });

  test('File contains corrupted YAML #3', () => {
    const path1 = `${fixPath}/6/corrupted.yml`;
    const path2 = `${fixPath}/6/corrupted.yml`;
    expect(() => {
      genDiffs(path1, path2);
    }).toThrow();
  });
});
