import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import getParser from './parsers';
import getRenderer from './renderers';

const keyTypes = [
  {
    type: 'nested',
    check: (before, after, key) => (_.isObject(before[key]) && _.isObject(after[key])
      && !_.isArray(before[key]) && !_.isArray(after[key])),
    proccess: (beforeValue, afterValue, fn) => ({
      children: fn(beforeValue, afterValue),
    }),
  },
  {
    type: 'new',
    check: (before, after, key) => (!_.has(before, key) && _.has(after, key)),
    proccess: (beforeValue, afterValue) => ({
      value: afterValue,
    }),
  },
  {
    type: 'deleted',
    check: (before, after, key) => (_.has(before, key) && !_.has(after, key)),
    proccess: beforeValue => ({
      value: beforeValue,
    }),
  },
  {
    type: 'modified',
    check: (before, after, key) => (_.has(before, key) && _.has(after, key)
        && before[key] !== after[key]),
    proccess: (beforeValue, afterValue) => ({
      oldValue: beforeValue,
      newValue: afterValue,
    }),
  },
  {
    type: 'unmodified',
    check: (before, after, key) => (_.has(before, key) && _.has(after, key)
      && before[key] === after[key]),
    proccess: beforeValue => ({
      value: beforeValue,
    }),
  },
];

const getDiffsTree = (before, after) => {
  const keysCombination = _.union(Object.keys(before), Object.keys(after));
  return keysCombination.map((key) => {
    const { type, proccess } = _.find(keyTypes, item => item.check(before, after, key));
    const params = proccess(before[key], after[key], getDiffsTree);
    return {
      key,
      type,
      ...params,
    };
  });
};

const genDiffs = (beforeFilePath, afterFilePath, format = 'tree') => {
  const beforeFileRaw = fs.readFileSync(beforeFilePath, 'utf8');
  const afterFileRaw = fs.readFileSync(afterFilePath, 'utf8');
  const extension = path.extname(beforeFilePath).slice(1);
  const parse = getParser(extension);
  const beforeFileData = parse(beforeFileRaw);
  const afterFileData = parse(afterFileRaw);
  const diffs = getDiffsTree(beforeFileData, afterFileData);
  const render = getRenderer(format);
  return render(diffs);
};

export default genDiffs;
