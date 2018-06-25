#!/usr/bin/env node
import { init } from '..';

const program = init();
program.parse(process.argv);
