import fs from 'fs';
import _ from 'lodash';

const getDiffObject = (beforeFile, afterFile) => {
  const resultKeys = _.union(Object.keys(beforeFile), Object.keys(afterFile));
  return resultKeys.reduce((acc, key) => {
    if (!_.has(beforeFile, key)) {
      return [...acc, { key, value: afterFile[key], type: 'new' }];
    }
    if (!_.has(afterFile, key)) {
      return [...acc, { key, value: beforeFile[key], type: 'deleted' }];
    }
    if (beforeFile[key] !== afterFile[key]) {
      return [...acc, {
        key,
        value: beforeFile[key],
        newValue: afterFile[key],
        type: 'modified',
      }];
    }
    return [...acc, { key, value: beforeFile[key], type: 'unmodified' }];
  }, []);
};

const constructString = {
  new: ({ key, value }) => ` + ${key}: ${value}\n`,
  deleted: ({ key, value }) => ` - ${key}: ${value}\n`,
  modified: ({ key, value, newValue }) => ` + ${key}: ${newValue}\n - ${key}: ${value}\n`,
  unmodified: ({ key, value }) => `   ${key}: ${value}\n`,
};

const genDiffs = (beforeFilePath, afterFilePath) => {
  const beforeFileRaw = fs.readFileSync(beforeFilePath, 'utf8');
  const afterFileRaw = fs.readFileSync(afterFilePath, 'utf8');
  const beforeFileData = JSON.parse(beforeFileRaw);
  const afterFileData = JSON.parse(afterFileRaw);
  const diffs = getDiffObject(beforeFileData, afterFileData);
  const resultDiffsString = diffs.reduce((acc, line) => {
    const currentLine = constructString[line.type](line);
    return `${acc}${currentLine}`;
  }, '');
  return `{\n${resultDiffsString}}\n`;
};

export default genDiffs;
