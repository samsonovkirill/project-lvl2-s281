import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import getParser from './parsers';
import render from './renders';


const compareValues = (key, before, after) => {
  if (!_.has(before, key)) {
    return { key, value: after[key], type: 'new' };
  }
  if (!_.has(after, key)) {
    return { key, value: before[key], type: 'deleted' };
  }
  if (before[key] !== after[key]) {
    return {
      key,
      oldValue: before[key],
      newValue: after[key],
      type: 'modified',
    };
  }
  return { key, value: before[key], type: 'unmodified' };
};

const bothAreObjects = (obj1, obj2) => typeof obj1 === 'object' && typeof obj2 === 'object';

const getDiffs = (before, after) => {
  const resultKeys = _.union(Object.keys(before), Object.keys(after));
  return resultKeys.reduce((acc, key) => {
    if (bothAreObjects(before[key], after[key])) {
      const diffs = getDiffs(before[key], after[key]);
      return [...acc, { key, children: diffs, type: 'node' }];
    }
    return [...acc, compareValues(key, before, after)];
  }, []);
};


const genDiffs = (beforeFilePath, afterFilePath) => {
  const beforeFileRaw = fs.readFileSync(beforeFilePath, 'utf8');
  const afterFileRaw = fs.readFileSync(afterFilePath, 'utf8');
  const format = path.extname(beforeFilePath).slice(1);
  const parse = getParser(format);
  const beforeFileData = parse(beforeFileRaw);
  const afterFileData = parse(afterFileRaw);
  const diffs = getDiffs(beforeFileData, afterFileData);
  const renderedDiffs = render(diffs);
  return renderedDiffs;
};

export default genDiffs;
