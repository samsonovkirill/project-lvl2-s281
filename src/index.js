import { version } from '../package.json';

const program = require('commander');

const init = () => {
  program
    .version(version)
    .arguments('gendiff <firstConfig> <secondConfig>')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'output format');
  return program;
};

export default init;
