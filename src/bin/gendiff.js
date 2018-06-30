#!/usr/bin/env node
import program from 'commander';
import genDiffs from '..';
import { version } from '../../package.json';

program
  .version(version)
  .arguments('gendiff <firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .action((firstConfig, secondConfig) => {
    const diffs = genDiffs(firstConfig, secondConfig, program.format);
    console.log(diffs);
  });
program.parse(process.argv);
