import program from 'commander';
import fs from 'fs';
import _ from 'lodash';
import { version } from '../package.json';

const constructString = {
  new: ({ key, value }) => ` + ${key}: ${value}\n`,
  deleted: ({ key, value }) => ` - ${key}: ${value}\n`,
  modified: ({ key, value, newValue }) => ` + ${key}: ${newValue}\n - ${key}: ${value}\n`,
  unmodified: ({ key, value }) => `   ${key}: ${value}\n`,
};

const genDiffs = (filePathBefore, filePathAfter) => {
  try {
    const beforeFileRaw = fs.readFileSync(filePathBefore, 'utf8');
    const afterFileRaw = fs.readFileSync(filePathAfter, 'utf8');
    const beforeFile = JSON.parse(beforeFileRaw);
    const afterFile = JSON.parse(afterFileRaw);
    const resultKeys = _.union(Object.keys(beforeFile), Object.keys(afterFile));
    const diffs = resultKeys.reduce((acc, key) => {
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

    const resultString = diffs.reduce((acc, item) => {
      const curString = constructString[item.type](item);
      return `${acc}${curString}`;
    }, '');
    return `\n{\n${resultString}}`;
  } catch (e) {
    throw e;
  }
};

const init = () => {
  program
    .version(version)
    .arguments('gendiff <firstConfig> <secondConfig>')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'output format')
    .action((firstConfig, secondConfig) => {
      const diff = genDiffs(firstConfig, secondConfig);
      console.log(diff);
    });
  return program;
};

export default genDiffs;
export { init };
